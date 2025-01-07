import { Sequelize } from 'sequelize-typescript';
import { User } from './models/user.model';
import { Skill } from './models/skill.model';
import { Strength } from './models/strength.model';
import { UserSkillLink } from './models/user-skill-link';
import { UserStrengthlLink } from './models/user-strength-link';
import { Job } from './models/job.model';
import { JobSkillLink } from './models/job-skill-link';
import { JobStrengthlLink } from './models/job-strength-link';
import { Swipe } from './models/swipe.model';
import { CompletedJob } from './models/comleted-job.model';
import { UserConnection } from './models/user-connection.model';
import { Message } from './models/message.model';
import { Chat } from './models/chat.model';
import { ChatParticipant } from './models/chat-participant.model';

export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'mysql',
        host: process.env.DB_HOST,
        port: +process.env.PORT || 3306,
        username: process.env.MYSQL_USER,
        password: process.env.MYSQL_PASSWORD,
        database: process.env.MYSQL_DATABASE,
        logging: false,
        dialectOptions: {
          multipleStatements: true,
        },
        pool: {
          max: 5,
          min: 0,
        },
      });
      sequelize.addModels([
        User,
        Skill,
        Strength,
        UserSkillLink,
        CompletedJob,
        UserStrengthlLink,
        Job,
        JobSkillLink,
        JobStrengthlLink,
        Swipe,
        UserConnection,
        Message,
        Chat,
        ChatParticipant,
      ]);
      await sequelize.sync();
      return sequelize;
    },
  },
];
