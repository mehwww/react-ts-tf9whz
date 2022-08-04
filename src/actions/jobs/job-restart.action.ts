import { ActionDefinition } from '../action-definition';
import { injectable } from 'tsyringe';
import { JobService } from '../../services';

export interface JobRestartActionParams {
  jobId: string;
}

@injectable()
export class JobRestartAction extends ActionDefinition<JobRestartActionParams> {
  constructor(private jobService: JobService) {
    super();
  }

  invoke(params: JobRestartActionParams): void | Promise<void> {
    throw new Error('Method not implemented.');
  }
  getMenu(): { name: string } {
    return { name: '指定' };
  }
}
