import { ActionDefinition } from '../action-definition';
import { singleton } from 'tsyringe';
import { JobService } from '../../services';
import { JobStatus } from '../../models/job.model';

export interface JobCompleteActionParams {
  jobId: number;
}

@singleton()
export class JobCompleteAction extends ActionDefinition<JobCompleteActionParams> {
  constructor(private jobService: JobService) {
    super();
  }

  invoke(params: JobCompleteActionParams): void | Promise<void> {
    this.jobService.setStatus(params.jobId, JobStatus.Done)
  }
  getMenu(): { name: string } {
    return { name: '完成' };
  }
}
