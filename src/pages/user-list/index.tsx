import * as React from 'react';
import classNames from 'classnames';
import { tap, filter } from 'rxjs';
import { container } from 'tsyringe';
import { JobService, UserService } from '../../services';
import useConstant from 'use-constant';
import { useParams, Link } from 'react-router-dom';
import {
  JobCompleteAction,
  JobRestartAction,
  JobStartAction,
} from '../../actions';
import { Table, message } from 'antd';
import { Job, JobStatus } from '../../models';
import { ContextMenu } from '../../components/context-menu';

type IUserListProps = {
  className?: string;
  style?: React.CSSProperties;
};

const JobActions = [
  container.resolve(JobStartAction).build<Job>({
    resolveParams: (job: Job) => ({ jobId: job.id }),
    isHidden: (job: Job) => job.status !== JobStatus.New,
    onSuccess: () => message.success('开始任务成功'),
  }),
  container.resolve(JobCompleteAction).build<Job>({
    resolveParams: (job: Job) => ({ jobId: job.id }),
    isHidden: (job: Job) => job.status !== JobStatus.Processing,
    onSuccess: () => message.success('完成任务成功'),
  }),
  container.resolve(JobRestartAction).build<Job>({
    resolveParams: (job: Job) => ({ jobId: job.id }),
    isHidden: (job: Job) => job.status !== JobStatus.Done,
    onSuccess: () => message.success('重新开始成功'),
  }),
];

export const UserList = ({ className, style }: IUserListProps) => {
  const userId = Number(useParams().userId);
  const jobService = useConstant(() => container.resolve(JobService));
  const userService = useConstant(() => container.resolve(UserService));
  const [jobs, setJobs] = React.useState([]);
  const [user, setUser] = React.useState();

  React.useEffect(() => {
    setUser(userService.getUser(userId));
  }, []);

  React.useEffect(() => {
    const subscription = jobService
      .getData$()
      .pipe(
        tap((jobs) => setJobs(jobs.filter((job) => job.assigner.id === userId)))
      )
      .subscribe();
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={classNames(className)} style={style}>
      <h1>{user?.name}</h1>
      <Table
        dataSource={jobs}
        columns={[
          {
            title: 'id',
            dataIndex: 'id',
          },
          {
            title: 'name',
            dataIndex: 'name',
          },
          {
            title: 'status',
            dataIndex: 'status',
          },
          {
            title: '操作',
            dataIndex: 'operations',
            render: (o) => {
              return <ContextMenu actor={o} actions={JobActions} />;
            },
          },
        ]}
      />
    </div>
  );
};
