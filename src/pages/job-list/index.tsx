import * as React from 'react';
import { tap } from 'rxjs';
import classNames from 'classnames';
import { Table, message } from 'antd';
import useConstant from 'use-constant';
import { container } from 'tsyringe';
import { Link } from 'react-router-dom';
import { JobService } from '../../services';
import { Job, JobStatus } from '../../models';
import { ContextMenu } from '../../components/context-menu';
import {
  JobAssignAction,
  JobCompleteAction,
  JobRestartAction,
  JobStartAction,
  JobUnassignAction,
} from '../../actions';

type IJobListProps = {
  className?: string;
  style?: React.CSSProperties;
};

const JobActions = [
  container.resolve(JobAssignAction).build<Job>({
    resolveParams: (job: Job) => ({ jobId: job.id }),
    isHidden: (job: Job) => !!job.assignerId,
    onSuccess: () => message.success('指定成功'),
  }),
  container.resolve(JobUnassignAction).build<Job>({
    resolveParams: (job: Job) => ({ jobId: job.id }),
    isHidden: (job: Job) => !job.assignerId,
    onSuccess: () => message.success('解除指定成功'),
  }),
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

export const JobList = ({ className, style }: IJobListProps) => {
  const jobService = useConstant(() => container.resolve(JobService));
  const [jobs, setJobs] = React.useState([]);

  React.useEffect(() => {
    const subscription = jobService
      .getData$()
      .pipe(
        tap((jobs) => {
          setJobs(jobs);
        })
      )
      .subscribe();
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={classNames(className)} style={style}>
      <Table
        dataSource={jobs}
        rowKey="id"
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
            title: 'assigner',
            dataIndex: 'assigner',
            render: (o) =>
              o?.name ? <Link to={`/users/${o.id}`}>{o.name}</Link> : '-',
          },
          {
            title: '操作',
            dataIndex: 'operations',
            render: (_, job) => {
              return <ContextMenu actor={job} actions={JobActions} />;
            },
          },
        ]}
      />
    </div>
  );
};
