import {UserLoginEvent} from './UserLoginEvent';

export class LogInfo {
  public numberOfOldFailureAttempts: number;
  public description: string;
  public userLoginEvents: UserLoginEvent[];
}
