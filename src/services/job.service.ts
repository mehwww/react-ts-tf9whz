import { map, BehaviorSubject, Observable } from "rxjs";

import { injectable } from "tsyringe";
import { Job, JobStatus, User } from "../models";
import { UserService } from "./user.service";

@injectable()
export class JobService {
  data: Job[];
  data$: BehaviorSubject<JobService["data"]>;

  constructor(private userService: UserService) {
    this.data = [
      {
        id: 1,
        name: "用户管理 - 群组管理",
        status: JobStatus.New,
      },
      {
        id: 2,
        name: "平台管理 - 任务卡管理",
        status: JobStatus.New,
      },
      {
        id: 3,
        name: "平台管理 - 字段管理",
        status: JobStatus.New,
      },
      {
        id: 4,
        name: "平台管理 - 产品管理",
        status: JobStatus.New,
      },
      {
        id: 5,
        name: "平台管理 - 服务卡管理",
        status: JobStatus.New,
      },
      {
        id: 6,
        name: "企业后台 - 员工管理",
        status: JobStatus.New,
      },
      {
        id: 7,
        name: "企业后台 - 任务查询",
        status: JobStatus.New,
      },
    ];
    this.data$ = new BehaviorSubject(this.data);
  }

  refresh() {
    this.data$.next(this.data);
  }

  getData$() {
    return this.data$.pipe(
      map((data) => {
        return data.map(({ assignerId, ...item }) => {
          const assigner = this.userService.getUser(assignerId);
          return { ...item, assigner };
        });
      })
    );
  }

  setStatus(jobId: number, status: JobStatus) {
    let index = this.data.findIndex((o) => o.id === jobId);
    if (index > -1) {
      this.data[index] = { ...this.data[index], status };
    }
    this.refresh();
  }

  setUser(jobId: number, userId: number) {
    let index = this.data.findIndex((o) => o.id === jobId);
    if (index > -1) {
      this.data[index] = { ...this.data[index], assignerId: userId };
    }
    this.refresh();
  }
}
