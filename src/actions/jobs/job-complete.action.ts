import { ActionDefinition } from '../action-definition';
import { injectable } from 'tsyringe';
import { JobService } from '../../services';

export interface JobCompleteActionParams {
  jobId: string;
}

@injectable()
export class JobCompleteAction extends ActionDefinition<JobCompleteActionParams> {
  constructor(private jobService: JobService) {
    super();
  }

  invoke(params: JobCompleteActionParams): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
  getMenu(): { name: string } {
    return { name: '完成' };
  }
}
