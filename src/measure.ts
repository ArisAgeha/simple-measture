import moment from "moment";

type MessureItem = {
  stepName: string;
  stepTime: number;
}

/**
 * default: 打印hh:mm:ss时间线
 * relativeToPrev：打印相对于上一个打点的时间线
 * relativeToFirst：打印相对于第一个打点的时间线
 */
type RecordFormat = 'default' | 'relativeToPrev' | 'relativeToFirst';

export class Measure {
  static lastTime: { [key: string]: MessureItem[] } = {
    default: []
  }

  /**
   * 重置指定分组的时间线
   * @param symbol 清空指定分组的时间线记录，不传则默认重置default分组
   */
  public static resetRecord(symbol: string = 'default') {
    this.lastTime[symbol] = [];
  }

  /**
   * 调用此方法进行时间记录
   * @param stepName 此步骤的标识符，用于打印时的标记
   * @param stepInfo 暂时无用，用于以后拓展
   * @param symbol 时间线标识符，用于record分组，默认为default
   */
  public static record(stepName: string, stepInfo?: any, symbol: string = 'default') {
    if (!Array.isArray(this.lastTime[symbol])) this.lastTime[symbol] = [];
    this.setRecordTime(stepName, stepInfo, symbol);
  }

  /**
   * 调用此方法打印时间线
   * @param format 打印格式，参见RecordFormat
   * @param symbol 时间线标识符，提取指定分组的时间线
   */
  public static printRecord(format: RecordFormat = 'default', symbol: string = 'default') {
    const record = this.getRecord(format, symbol);
    if (record) console.log(record);
  }

  private static getRecord(format: RecordFormat = 'default', symbol: string = 'default') {
    const targetTimeArr = this.lastTime[symbol];

    if (!Array.isArray(targetTimeArr)) {
      console.error(`找不到该标识符：${symbol}所对应的记录！`);
      return null;
    }

    switch (format) {
      case 'default': {
        return targetTimeArr.map(item => ({
          stepName: item.stepName,
          stepTime: moment(item.stepTime).format('hh:mm:ss')
        }))
      }
      case 'relativeToPrev': {
        let prevTime = 0;
        return targetTimeArr.map((item, index) => {
          const res = {
            stepName: item.stepName,
            stepTime: index === 0 ? 0 : (item.stepTime - prevTime) / 1000
          }
          prevTime = item.stepTime;
          return res;
        })
      }
      case 'relativeToFirst': {
        const firstTime = targetTimeArr[0].stepTime;

        return targetTimeArr.map(item => ({
          stepName: item.stepName,
          stepTime: (item.stepTime - firstTime) / 1000
        }));
      }
    }
  }

  private static setRecordTime(stepName: string, stepInfo?: any, symbol: string = 'default') {
    this.lastTime[symbol].push({
      stepName,
      stepTime: Number(Date.now())
    });
  }
}
