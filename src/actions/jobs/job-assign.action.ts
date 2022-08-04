import { ActionDefinition } from '../action-definition';
import { singleton } from 'tsyringe';
import { JobService } from '../../services';
import NiceModal from '@ebay/nice-modal-react';
import { PickUserModal } from '../../components/dialogs';

export interface JobAssignActionParams {
  jobId: number;
}

@singleton()
export class JobAssignAction extends ActionDefinition<JobAssignActionParams> {
  constructor(private jobService: JobService) {
    super();
  }

  async invoke(params: JobAssignActionParams): void | Promise<void> {
    const userId = await NiceModal.show(PickUserModal);
    this.jobService.setUser(params.jobId, userId);
  }

  getMenu(): { name: string } {
    return { name: '指定' };
  }
}
