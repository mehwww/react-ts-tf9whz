import { ActionDefinition } from '../action-definition';
import { injectable } from 'tsyringe';
import { JobService } from '../../services';

export interface JobStartActionParams {
  jobId: number;
}

@injectable()
export class JobStartAction extends ActionDefinition<JobStartActionParams> {
  constructor(private jobService: JobService) {
    super();
  }

  invoke(params: JobStartActionParams): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
  getMenu(): { name: string } {
    return { name: '开始' };
  }
}
