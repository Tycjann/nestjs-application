const arrayToDate = (dateArray: number[]): Date => {
  return new Date(
    dateArray[0],
    dateArray[1],
    dateArray[2],
    dateArray[3],
    dateArray[4],
    dateArray[5],
  );
};

export default arrayToDate;
