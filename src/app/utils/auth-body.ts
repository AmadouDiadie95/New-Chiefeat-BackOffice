import {Injectable} from '@angular/core';
import {Deserializable} from '../models/wrapper/deserializable.wrapper';

@Injectable()
export class AuthBody {
  userId?: number;
  email?: string;
  username?: string;
  password?: string;
  oldPassword?: string;
  newPassword?: string;
  user?: any;
  token?: string;

  /*deserialize(input: any): this {
    return Object.assign(this, input);
  }

  equals(obj: this): boolean {
    return true;
  }*/

}
