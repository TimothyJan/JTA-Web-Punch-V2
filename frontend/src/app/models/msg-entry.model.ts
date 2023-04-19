export class MsgEntry {
  msgEntry1: string;
  msgEntry2?: string;
  msgEntry3?: string;
  constructor(msgEntry1:string, msgEntry2?:string, msgEntry3?:string) {
    this.msgEntry1 = msgEntry1;
    this.msgEntry2 = msgEntry2;
    this.msgEntry3 = msgEntry3;
  }
}
