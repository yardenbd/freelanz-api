import { Test, TestingModule } from '@nestjs/testing';
import { JobController } from './swipe.controller';
import { JobService } from './swipe.service';

describe('JobController', () => {
  let jobController: JobController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [JobController],
      providers: [JobService],
    }).compile();

    jobController = app.get<JobController>(JobController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(jobController.getHello()).toBe('Hello World!');
    });
  });
});
