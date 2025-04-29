const useIsoToDate = (value: string | null) => {
  let date: Date | null;
  if (value && value.length > 0) {
    date = new Date(value);
    if (value.toLocaleLowerCase().includes("z")) {
      // utc, add offset
      date.setTime(date.getTime() + date.getTimezoneOffset() * 60000);
    }
  } else {
    date = null;
  }
  return date;
};

export default useIsoToDate;
