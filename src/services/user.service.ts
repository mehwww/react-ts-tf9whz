import { BehaviorSubject } from "rxjs";
import { User } from "../models";

export class UserService {
  data: User[];
  data$: BehaviorSubject<UserService["data"]>;

  constructor() {
    this.data = [
      {
        id: 1,
        name: "jian.li",
      },
      {
        id: 2,
        name: "wutong.vito",
      },
      {
        id: 3,
        name: "zhouzhengwei.xavier",
      },
      {
        id: 4,
        name: "zhangxiaoping",
      },
    ];
    this.data$ = new BehaviorSubject(this.data);
  }

  fetchList() {
    return this.data;
  }

  getUser(userId: number) {
    return this.data.find((user) => user.id === userId);
  }
}
