import { Admin } from "./admin";

export class Role {

  id: number;
     name: string;
  admins: Array<Admin>;
}
