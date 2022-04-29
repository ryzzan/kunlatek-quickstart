export class  MyPerformance {
  static debounce = (func: Function, timeout: number = 300) => {
    let timer: any;
    return (...args: any) => {
      clearTimeout(timer);
      timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
  }
}