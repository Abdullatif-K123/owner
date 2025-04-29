import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { TourCity } from "../../../../API/tour/types";

type Props = {
  list: TourCity[];
};
const CitiesList = ({ list }: Props) => {
  const tableHeaders = ["المدينة", "مدة الاستراحة"];
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead
          sx={{
            backgroundColor: "white !important",
          }}
        >
          <TableRow>
            {tableHeaders.map((item, index) => (
              <TableCell key={index}>
                <Typography color="secondary"> {item}</Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((city, idx) => (
            <TableRow key={idx}>
              <TableCell>{city.cityName}</TableCell>
              <TableCell>{city.breakTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CitiesList;
