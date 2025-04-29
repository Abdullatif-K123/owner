import { TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useSearchParams } from 'react-router-dom';

import PaginationTable from '../../../components/tables/PaginationTable';
import TableRowStriped from '../../../components/tables/PaginationTable/TableRowStriped';
import RowActions from './RowActions';
import useIsoToArabicTime from '@/hooks/useIsoToArabicTime';

import { getPage } from '../../../utils/apiHelpers';
import { BranchSelect } from '../../../API/branches/type';
import useObjectSearchParam from '../../../hooks/useObjectSearchParam';
import useQuerySearchParam from '../../../hooks/useQuerySearchParam';
import usePageNumberSearchParam from '../../../hooks/usePageNumberSearchParam';
import { virtualQueries } from '@/API/virtualTours/queries';

const TableHeaders = ['الاسم', 'الفرع', 'عدد الزبائن', 'تاريخ الانطلاق', 'تاريخ الوصول', 'خيارات'];

const ToursTable = () => {
  const [searchParams] = useSearchParams();
  const query = useQuerySearchParam();
  const pageNumber = usePageNumberSearchParam();

  const toursStatusnum = searchParams.get('tourStatus');
  const tourStatus = toursStatusnum ? Number(toursStatusnum) : null;

  const branchId = useObjectSearchParam<BranchSelect>('branch')?.id ?? '';

  const infiniteQuery = virtualQueries.useInfiniteQuery({ query, pageNumber, tourStatus }, branchId);

  const { data } = infiniteQuery;
  const page = getPage(data, pageNumber);

  return (
    <>
      <PaginationTable
        pageNumber={pageNumber}
        infiniteQuery={infiniteQuery}
        skeleton={true}
        cellCount={TableHeaders.length}
        tableHead={
          <TableHead>
            <TableRow>
              {TableHeaders.map((cellHeader) => (
                <TableCell key={cellHeader}>{cellHeader}</TableCell>
              ))}
            </TableRow>
          </TableHead>
        }
      >
        <TableBody>
          {page.map((row) => (
            <TableRowStriped key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.branchName}</TableCell>
              <TableCell>{`${row.chairsCount - row.chairsFreeCount}`}</TableCell>
              <TableCell>{`${useIsoToArabicTime(row.leaveDate)}`}</TableCell>
              <TableCell>{`${useIsoToArabicTime(row.arriveDate)}`}</TableCell>
              <TableCell>
                <RowActions name={row.name} id={row.id} canEdit={row.canEdit} />
              </TableCell>
            </TableRowStriped>
          ))}
        </TableBody>
      </PaginationTable>
    </>
  );
};

export default ToursTable;
