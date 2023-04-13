import { Punch } from "./punch";

export class UserInfo {
  username!: string;
  punches!: Punch[];
  employeeNumber?: string;
  cardNumber?: string;

  constructor(username:string, punches:Array<Punch>, employeeNumber?:string, cardNumber?:string) {
    this.username = username;
    this.punches = punches;
    if (employeeNumber) {
      this.employeeNumber = employeeNumber;
    }
    if (cardNumber) {
      this.cardNumber = cardNumber;
    }
  }
}
