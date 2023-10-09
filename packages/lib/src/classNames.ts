export const classNames = (...classes: string[]) => {
  return classes.filter((_class) => _class !== '').join(' ');
};
