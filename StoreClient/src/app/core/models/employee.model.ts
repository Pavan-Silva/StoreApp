import {designation} from "./designation.model";
import {employeeStatus} from "./employee-status.model";
import {gender} from "./gender.model";

export interface employee {
  id?: number;
  empNo: string;
  fullName: string;
  callingName: string;
  photo: string;
  doBirth: string;
  nic: string;
  address: string;
  mobile: string;
  land: string;
  doAssignment: string;
  gender: gender;
  designation: designation;
  employeeStatus :employeeStatus;
  description: string;
}
