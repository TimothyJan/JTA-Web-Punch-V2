export class Punch {
  punchType: string;
  /**
   * IN
   * OUT
   * SWIPEANDGO
   * BREAKSTART
   * BREAKEND
   * LUNCHSTART
   * LUNCHEND
   */
  dateTime: Date;
  constructor(punchType:string, dateTime:Date) {
    this.punchType = punchType;
    this.dateTime = dateTime;
  }
}
