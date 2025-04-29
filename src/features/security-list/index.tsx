import { Button, Stack } from "@mui/material";
import { useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import FilterRow from "@/components/layout/FilterRow";
import { TourCustomer } from "@/API/tour/types";
import SecurityListAction from "@/features/security-list/Action";
import SecurityListTable from "@/features/security-list/Table";
import AddItemButton from "@/features/security-list/Action/AddItemButton";
import TextField from "@/components/inputs/TextField";
const SecurityListPage = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const branchId = searchParams.get("branchId");
  const date = searchParams.get("date");

  const busName = searchParams.get("bus");
  const [list, setList] = useState<TourCustomer[]>([]);
  const [departureLocation, setDepartureLocation] = useState("");
  const [tripDestination, setTripDestination] = useState("");
  const [driverName, setDriverName] = useState("");
  const [driverBro, setDriverBro] = useState("");
  const navigate = useNavigate();
  const handleExportClick = () => {
    let fullList = list;
    if (list.length < 45) {
      const n = 45 - list.length;
      fullList = [...list, ...new Array(n).fill(0)];
    }
    navigate(
      `/security-list/${id}/export?branchId=${branchId}&name=${
        departureLocation + "-" + tripDestination
      }&date=${date}&bus=${busName}&busDriver=${driverName}&busBro=${driverBro}`,
      { state: fullList }
    );
  };
  return (
    <Stack gap={2}>
      {id && (
        <FilterRow>
          <Button
            type="button"
            variant="contained"
            sx={{
              fontSize: { xs: 10, sm: 15 },
              width: 140,
            }}
            onClick={handleExportClick}
          >
            تصدير
          </Button>
          <TextField
            placeholder="الانطلاق"
            value={departureLocation}
            onChange={(e) => setDepartureLocation(e.target.value)}
          />
          <TextField
            placeholder="جهة الرحلة"
            value={tripDestination}
            onChange={(e) => setTripDestination(e.target.value)}
          />
          <TextField
            placeholder="اسم السائق"
            value={driverName}
            onChange={(e) => setDriverName(e.target.value)}
          />
          <TextField
            placeholder="اسم المرافق"
            value={driverBro}
            onChange={(e) => setDriverBro(e.target.value)}
          />
        </FilterRow>
      )}
      <SecurityListTable setList={setList} list={list} />
      <SecurityListAction setList={setList} />
      <AddItemButton list={list} setList={setList} />
    </Stack>
  );
};

export default SecurityListPage;
