import {employee} from "./employee.model";
import {role} from "./role.model";
import {userStatus} from "./user-status.model";

export interface user {
  id?: number;
  username: string;
  employee: employee;
  password: string;
  doCreated?: string;
  toCreated?: string;
  roles: role[];
  userStatus:userStatus;
}
