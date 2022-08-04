import * as React from "react";
import { tap } from "rxjs";
import classNames from "classnames";
import { Table } from "antd";
import useConstant from "use-constant";
import { container } from "tsyringe";
import { JobService } from "../../services";
import { Job } from "../../models";

type IJobListProps = {
  className?: string;
  style?: React.CSSProperties;
};

export const JobList = ({ className, style }: IJobListProps) => {
  const jobService = useConstant(() => container.resolve(JobService));
  const [jobs, setJobs] = React.useState<Job[]>([]);
  const contextActions = useConstant(() => {});

  React.useEffect(() => {
    const subscription = jobService.data$
      .pipe(tap((jobs) => setJobs(jobs)))
      .subscribe();
    return () => subscription.unsubscribe();
  }, []);

  return (
    <div className={classNames(className)} style={style}>
      <Table
        dataSource={jobs}
        columns={[
          {
            title: "id",
            dataIndex: "id",
          },
          {
            title: "name",
            dataIndex: "name",
          },
          {
            title: "status",
            dataIndex: "status",
          },
          {
            title: "assigner",
            dataIndex: "assigner",
            render: (o) => o.name ?? "-",
          },
          { title: "操作" },
        ]}
      />
    </div>
  );
};
