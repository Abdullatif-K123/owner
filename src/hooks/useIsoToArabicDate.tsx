import { format } from 'date-fns';
import useIsoToDate from './useIsoToDate';
import { ar } from 'date-fns/locale';

const useIsoToArabicDate = (value: string, formatString: string = 'dd/MM/yyyy , hh:mm aa'): string => {
  const date = useIsoToDate(`${value}`);
  const res = date?.getTime()
    ? `${format(date, formatString, {
        locale: ar,
      })}`
    : '';
  return res;
};

export default useIsoToArabicDate;
