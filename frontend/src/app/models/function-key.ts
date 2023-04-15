export class FunctionKey {
  fktype: number;
  caption: string;
  msg1?: string;
  msg2?: string;
  msg3?: string;
  PC?: number;
  constructor(fktype:number, caption:string, msg1?: string, msg2?: string, msg3?: string, PC?: number) {
    this.fktype = fktype;
    this.caption = caption;
    if (msg1) {
      this.msg1 = msg1;
    }
    if (msg2) {
      this.msg2 = msg2;
    }
    if (msg3) {
      this.msg3 = msg3;
    }
    if (PC) {
      this.PC = PC;
    }
  }
}
