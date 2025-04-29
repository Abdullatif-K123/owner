const useDateToIso = (val: string | null) => {
  let dateObject = "";
  if (val) {
    const date = new Date(val);
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
    dateObject = date.toISOString();
  }
  return dateObject;
};

export default useDateToIso;
