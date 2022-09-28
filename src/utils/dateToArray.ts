const dateToArray = (date: Date): number[] => {
  return [
    date.getFullYear(),
    date.getMonth() + 1, // getMonth() is zero-based
    date.getDate(),
    date.getHours(),
    date.getMinutes(),
    date.getSeconds(),
  ];
};

export default dateToArray;
