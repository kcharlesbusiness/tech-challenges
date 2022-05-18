export function debounce(fn: any, delay: number = 300) {
  let timer: NodeJS.Timeout;
  return (...args: any) => {
    clearTimeout(timer);
    timer = setTimeout(() => { // @ts-ignore
      fn.apply(this, args); }, delay);
  }
}
