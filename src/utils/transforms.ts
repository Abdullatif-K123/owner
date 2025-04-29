import dayjs from "dayjs";

export const enumToStringArray = (_enum: any) => {
  return Object.values(_enum) as string[];
};
export const enumToNumberArray = (_enum: any) => {
  return Object.values(_enum).filter((e) => !isNaN(e as number)) as number[];
};
const intl = new Intl.DateTimeFormat("ar", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
});
const intlWithTime = new Intl.DateTimeFormat("ar", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});
export const DateFormatter = (
  date: string | Date | undefined,
  { withTime = false } = {}
) =>
  (withTime ? intlWithTime : intl).format(
    new Date(Date.parse((date ?? new Date()).toString()))
  );
export function creationDateFormat(date: string) {
  return dayjs(date).format("YYYY/MM/DD");
}

export const moneyFormatter = new Intl.NumberFormat("ar", {
  style: "currency",
  currency: "SYP",
});

export const isoToDate = (value: string | null) => {
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

export const dateToIso = (val: string | null) => {
  let dateObject = "";
  if (val) {
    const date = new Date(val);
    date.setTime(date.getTime() - date.getTimezoneOffset() * 60000);
    dateObject = date.toISOString();
  }
  return dateObject;
};
