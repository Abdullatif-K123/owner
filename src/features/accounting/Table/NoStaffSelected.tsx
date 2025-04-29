import { Box, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"

import { tableHeaders } from "@/features/accounting/Table"
import TableRowStriped from "@/components/tables/PaginationTable/TableRowStriped"

const NoStaffSelected = () => {
  return (
    <Paper
      sx={{
        borderRadius: 2,
        mb: "48px !important",
        overflow: "hidden",
      }}
    >

      <TableContainer>

    <Table>
      <TableHead>
          <TableRow>
            {tableHeaders.map((cellHeader) => (
              <TableCell key={cellHeader}>{cellHeader}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRowStriped>
            <TableCell colSpan={6}>
            <Box sx={{ mx: "auto", my: 1,textAlign:'center', width: "min(90% ,300px)" }}>
              <Typography color='error' variant="h5">قم بتحديد موظف</Typography>
                </Box>
            </TableCell>
          </TableRowStriped>
        </TableBody>
    </Table>
      </TableContainer>
      </Paper>
  )
}

export default NoStaffSelected