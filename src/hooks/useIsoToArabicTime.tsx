import { format } from 'date-fns';
import useIsoToDate from './useIsoToDate';
import { ar } from 'date-fns/locale';

const useIsoToArabicTime = (value: string, formatString: string = 'hh:mm aa'): string => {
  const date = useIsoToDate(`${value}`);
  const res = date?.getTime()
    ? `${format(date, formatString, {
        locale: ar,
      })}`
    : '';
  return res;
};

export default useIsoToArabicTime;
