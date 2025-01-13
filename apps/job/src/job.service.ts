import { Injectable } from '@nestjs/common';
import { Job } from '@libs/database/models/job.model';
import { CreateJobDTO } from '@libs/dto/job/create-job.dto';
import { Op, QueryTypes } from 'sequelize';
import { JobSkillLink } from '@libs/database/models/job-skill-link';
import { JobStrengthlLink } from '@libs/database/models/job-strength-link';
import { UpdateJobDTO } from '@libs/dto/job/update-job.dto';
import { CompletedJob } from '@libs/database/models/comleted-job.model';
import { User } from '@libs/database/models/user.model';
import { CreateCompletedJobDTO } from '@libs/dto/completed-job/create-completed-job.dto';
import { Swipe } from '@libs/database/models/swipe.model';
import { RpcException } from '@nestjs/microservices';
import { status } from '@grpc/grpc-js';

@Injectable()
export class JobService {
  async handleJobRelation(
    ids: number[],
    jobId: number,
    relationTable,
    field: string,
  ) {
    const linkTable = await relationTable.findAll({
      where: {
        [field]: {
          [Op.in]: ids,
        },
        job_id: jobId,
      },
    });
    const remoteIds = linkTable.map((record) => record[field]);
    const idsToInsert = ids.filter((id) => !remoteIds.includes(id));
    const recordsToInsert = idsToInsert.map((id) => {
      return { [field]: id, job_id: jobId };
    });
    await relationTable.bulkCreate(recordsToInsert);
    await relationTable.destroy({
      where: {
        job_id: jobId,
        [field]: {
          [Op.notIn]: ids,
        },
      },
    });
  }

  async createJob(data: CreateJobDTO) {
    const {
      additionalInstructions,
      address,
      employeeAmount,
      endDate,
      jobDescription,
      jobImages,
      latitude,
      longitude,
      jobTitle,
      payment,
      skills,
      startDate,
      strengths,
      toolsRequired,
      userId,
      status,
    } = data;
    const job = Job.build();
    job.title = jobTitle;
    job.payment = payment;
    job.date_start = startDate;
    job.date_end = endDate;
    job.tools_required = toolsRequired;
    job.user_id = userId;
    job.description = jobDescription;
    job.instructions = additionalInstructions;
    job.address = address;
    job.employee_amount = employeeAmount;
    job.latitude = latitude;
    job.status = status;
    job.longitude = longitude;
    await job.save();
    await this.handleJobRelation(skills, job.id, JobSkillLink, 'skill_id');
    await this.handleJobRelation(
      strengths,
      job.id,
      JobStrengthlLink,
      'strength_id',
    );
    return job;
  }

  async updateJob(data: UpdateJobDTO) {
    const {
      additionalInstructions,
      address,
      employeeAmount,
      endDate,
      jobDescription,
      jobImages,
      jobTitle,
      payment,
      skills,
      startDate,
      strengths,
      toolsRequired,
      jobId,
    } = data;
    const job = await Job.findByPk(jobId);
    if (!job) return null;
    job.title = jobTitle;
    job.payment = payment;
    job.date_start = startDate;
    job.date_end = endDate;
    job.tools_required = toolsRequired;
    job.description = jobDescription;
    job.instructions = additionalInstructions;
    job.address = address;
    job.employee_amount = employeeAmount;
    await job.save();
    await this.handleJobRelation(skills, job.id, JobSkillLink, 'skill_id');
    await this.handleJobRelation(
      strengths,
      job.id,
      JobStrengthlLink,
      'strength_id',
    );
    return job;
  }

  async getCompletedJobHistory(userId: number): Promise<CompletedJob[]> {
    const user = await User.findByPk(userId);
    const isUserEmployee = user.type === 'Employee';
    const where = {
      [isUserEmployee ? 'employee_id' : 'business_id']: userId,
    };

    const comleted = await CompletedJob.findAll({
      where,
      include: [{ model: Job, as: 'job' }],
    });
    return comleted;
  }

  async createCompletedJob(data: CreateCompletedJobDTO) {
    const { businessId, emplyeeId, jobId } = data;
    const completedJob = CompletedJob.build();
    completedJob.business_id = businessId;
    completedJob.employee_id = emplyeeId;
    completedJob.job_id = jobId;
    await completedJob.save();
    return completedJob;
  }

  async getJobList(data: { userId: number }) {
    const { userId } = data;
    //     const query = `
    //     WITH counts AS (
    //     SELECT
    //         job.id AS job_id,
    //         COUNT(DISTINCT us.skill_id) AS matching_skills,
    //         COUNT(DISTINCT js.skill_id) AS total_job_skills,
    //         COUNT(DISTINCT ust.strength_id) AS matching_strengths,
    //         COUNT(DISTINCT jst.strength_id) AS total_job_strengths
    //     FROM
    //         job
    //     LEFT JOIN job_skill_link js ON job.id = js.job_id
    //     LEFT JOIN user_skill_link us ON us.skill_id = js.skill_id AND us.user_id = :user_id
    //     LEFT JOIN job_strength_link jst ON job.id = jst.job_id
    //     LEFT JOIN user_strength_link ust ON ust.strength_id = jst.strength_id AND ust.user_id = :user_id
    //     WHERE job.status = 'valid'
    //     GROUP BY job.id
    // )
    // SELECT
    //     job.id,
    //     job.title,
    //     job.payment,
    //     job.address,
    //     (
    //         6371 * acos(
    //             cos(radians(:user_latitude)) *
    //             cos(radians(job.latitude)) *
    //             cos(radians(job.longitude) - radians(:user_longitude)) +
    //             sin(radians(:user_latitude)) * sin(radians(job.latitude))
    //         )
    //     ) AS distance,
    //     COALESCE(c.matching_skills, 0) AS matching_skills,
    //     COALESCE(c.total_job_skills, 0) AS total_job_skills,
    //     COALESCE(c.matching_strengths, 0) AS matching_strengths,
    //     COALESCE(c.total_job_strengths, 0) AS total_job_strengths
    // FROM
    //     job
    // LEFT JOIN counts c ON job.id = c.job_id
    // LEFT JOIN swipe ON swipe.job_id = job.id AND swipe.user_id = :user_id
    // WHERE
    //     job.status = 'valid'
    //     AND swipe.id IS NULL
    //     AND (
    //         c.total_job_skills = 0 OR
    //         (c.matching_skills / c.total_job_skills) >= 0
    //     )
    //     AND (
    //         c.total_job_strengths = 0 OR
    //         (c.matching_strengths / c.total_job_strengths) >= 0
    //     )
    //     AND job.latitude BETWEEN (:user_latitude - 0.45) AND (:user_latitude + 0.45)
    //     AND job.longitude BETWEEN (:user_longitude - 0.45) AND (:user_longitude + 0.45)
    //     AND (
    //         6371 * acos(
    //             cos(radians(:user_latitude)) *
    //             cos(radians(job.latitude)) *
    //             cos(radians(job.longitude) - radians(:user_longitude)) +
    //             sin(radians(:user_latitude)) * sin(radians(job.latitude))
    //         ) <= 50
    //     )
    // ORDER BY
    //     c.matching_skills DESC,
    //     c.matching_strengths DESC,
    //     distance ASC,
    //     job.payment DESC
    // LIMIT 20;
    // `;
    const query = `CALL GetJobRecommendations(:user_id, :user_latitude, :user_longitude, :distance_limit_km, :lang)`;
    const user = await User.findByPk(userId);
    const [rows] = await Job.sequelize.query(query, {
      replacements: {
        user_id: user.id,
        user_latitude: user.latitude,
        user_longitude: user.longitude,
        distance_limit_km: 100,
        lang: 'he',
      },
      type: QueryTypes.SELECT,
      raw: true,
    });
    console.log(Object.values(rows)[0]);
    return { jobs: Object.values(rows) };
  }

  // ctt = {
  //   id: 92,
  //   title: 'Cook for Catering Event',
  //   payment: 4000,
  //   address: 'Rosh HaNikra, Israel',
  //   distance: 27.752170157099076,
  //   matching_skills: 1,
  //   total_job_skills: 2,
  //   matching_strengths: 0,
  //   total_job_strengths: 3,
  // };
  // b = {
  //   address: 'Rosh HaNikra, Israel',
  //   distance: 27.752170157099076,
  //   id: 92,
  //   payment: 4000,
  //   title: 'Cook for Catering Event',
  // };
  async getCandidates(jobId: number) {
    const swipes = await Swipe.findAll({
      where: {
        job_id: jobId,
        swipe_type: 'right',
      },
      include: [{ model: User, as: 'user' }],
    });
    if (!swipes.length) {
      return [];
    }
  }
}
[
  {
    '0': {
      id: 92,
      title: 'Cook for Catering Event',
      payment: 4000,
      address: 'Rosh HaNikra, Israel',
      distance: 27.752170157099076,
      matching_skills: 1,
      total_job_skills: 2,
      matching_strengths: 0,
      total_job_strengths: 3,
    },
    '1': {
      id: 56,
      title: 'Tour Guide for Nature Hikes',
      payment: 1500,
      address: 'Carmel Forest, Haifa, Israel',
      distance: 15.48428689980352,
      matching_skills: 0,
      total_job_skills: 2,
      matching_strengths: 2,
      total_job_strengths: 3,
    },
    '2': {
      id: 77,
      title: 'House Cleaner for One-Time Deep Clean',
      payment: 600,
      address: 'HaHistadrut Street 30, Haifa, Israel',
      distance: 8.758014629058152,
      matching_skills: 0,
      total_job_skills: 2,
      matching_strengths: 1,
      total_job_strengths: 2,
    },
    '3': {
      id: 90,
      title: 'Interior Designer',
      payment: 3500,
      address: 'Tiberias, Israel',
      distance: 42.04196105567827,
      matching_skills: 0,
      total_job_skills: 2,
      matching_strengths: 1,
      total_job_strengths: 3,
    },
    '4': {
      id: 59,
      title: 'Electrician for Appliance Installation',
      payment: 1500,
      address: 'Kiryat Ata, Israel',
      distance: 3.525144132985604,
      matching_skills: 0,
      total_job_skills: 2,
      matching_strengths: 0,
      total_job_strengths: 2,
    },
    '5': {
      id: 91,
      title: 'Freight Unloader',
      payment: 5000,
      address: 'Haifa Port, Israel',
      distance: 8.218998416621853,
      matching_skills: 0,
      total_job_skills: 1,
      matching_strengths: 0,
      total_job_strengths: 2,
    },
    '6': {
      id: 89,
      title: 'Handyman for Minor Repairs',
      payment: 800,
      address: 'Haifa, Israel',
      distance: 9.485432244196398,
      matching_skills: 0,
      total_job_skills: 2,
      matching_strengths: 0,
      total_job_strengths: 3,
    },
    '7': {
      id: 58,
      title: 'Plumber for Pipe Repair',
      payment: 900,
      address: 'Old City, Acre, Israel',
      distance: 9.585720411448358,
      matching_skills: 0,
      total_job_skills: 2,
      matching_strengths: 0,
      total_job_strengths: 3,
    },
    '8': {
      id: 84,
      title: 'Carpenter for Custom Furniture',
      payment: 3000,
      address: 'Kibbutz Yagur, Israel',
      distance: 9.836754521547348,
      matching_skills: 0,
      total_job_skills: 2,
      matching_strengths: 0,
      total_job_strengths: 3,
    },
    '9': {
      id: 51,
      title: 'Landscaping Assistant',
      payment: 1200,
      address: 'Kfar Vradim, Israel',
      distance: 23.746678174761115,
      matching_skills: 0,
      total_job_skills: 1,
      matching_strengths: 0,
      total_job_strengths: 3,
    },
    '10': {
      id: 53,
      title: 'House Painter',
      payment: 3500,
      address: 'Zichron Yaakov, Israel',
      distance: 32.44863207284563,
      matching_skills: 0,
      total_job_skills: 2,
      matching_strengths: 0,
      total_job_strengths: 3,
    },
    '11': {
      id: 66,
      title: 'Security Guard for Event',
      payment: 5000,
      address: 'Amphitheater, Caesarea, Israel',
      distance: 42.42916303971025,
      matching_skills: 0,
      total_job_skills: 2,
      matching_strengths: 0,
      total_job_strengths: 2,
    },
  },
  {
    fieldCount: 0,
    affectedRows: 0,
    insertId: 0,
    info: '',
    serverStatus: 2,
    warningStatus: 0,
    changedRows: 0,
  },
];
