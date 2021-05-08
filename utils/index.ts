export const isEmpty = (x: any, mode?: {
    str: boolean
}) => {
  if (mode?.str) {
    return x === '';
  }
  return x === undefined || x === null;
};
export const cls = (...classNames: string[]) => classNames.filter((x) => !isEmpty(x)).join(' ');
