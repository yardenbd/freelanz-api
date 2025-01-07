import { Injectable } from '@nestjs/common';
import { CreateSwipeDTO } from '@libs/dto/swipes/create-swipe.dto';
import { Job } from '@libs/database/models/job.model';
import { Swipe } from '@libs/database/models/swipe.model';

@Injectable()
export class SwipeService {
  async createSwipe(data: CreateSwipeDTO) {
    const { jobId, swipeType, userId } = data;
    const job = await Job.findByPk(jobId);
    if (!job) throw new Error('job not found');
    const swipe = Swipe.build();
    swipe.user_id = userId;
    swipe.job_id = jobId;
    swipe.swipe_type = swipeType;
    await swipe.save();
    return swipe;
  }

  async sendToDLQ(message: CreateSwipeDTO) {
    const dlqTopic = 'swipes-dlq';

    // try {
    //   await this.producer.send({
    //     topic: dlqTopic,
    //     messages: [
    //       {
    //         value: message.value.toString(),
    //         headers: {
    //           originalTopic: 'swipes',
    //           timestamp: new Date().toISOString(),
    //         },
    //       },
    //     ],
    //   });

    //   console.log('Message sent to DLQ:', message.value.toString());
    // } catch (dlqError) {
    //   console.error('Error sending message to DLQ:', dlqError.message);
    // }
  }
}
