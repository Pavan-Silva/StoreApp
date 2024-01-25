import {operation} from "./operation.model";
import {module} from "./module.model";
import {role} from "./role.model";

export interface authority {
  id?: number;
  module: module;
  operation: operation;
  role: role;
}
