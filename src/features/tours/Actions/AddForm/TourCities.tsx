import { useEffect, useRef, useState } from "react";
import { Paper, Typography } from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import CitiesList from "./CitiesList";
import { cityObj, TourCitiesObj } from "../../../../API/tour/types";
import getCitiesId from "../../../../hooks/getCitiesId";
import { toursQueries } from "../../../../API/tour/queries";
import SortableTable from "../../cityTable/SortableTable";
import getSelectedCities from "../../../../hooks/getSelectedCitites";

type Props = {
  value: TourCitiesObj[];
  onChange: (val: TourCitiesObj[]) => void;
};

const TourCities = ({ onChange, value }: Props) => {
  const [, setRefresh] = useState(true);
  const sortedCitiesRef = useRef(value);

  useEffect(() => {
    sortedCitiesRef.current = getCitiesId(value ? value : []);
    setRefresh((prev) => !prev);
  }, [value]);

  const query = toursQueries.useCity();
  const cities: cityObj[] = query.data;
  const { isFetched } = query;

  const onCitiesChange = (val: TourCitiesObj[]) => {
    sortedCitiesRef.current = [...val];
    onChange(sortedCitiesRef.current);
    setRefresh((prev) => !prev);
  };

  return (
    <Paper elevation={2} sx={{ width: "90vw", p: 3, borderRadius: 3, mb: 2 }}>
      <Typography
        component="h3"
        variant="h5"
        color="primary.main"
        sx={{ display: "flex", alignItems: "center", mb: 2 }}
      >
        <PlaceIcon
          fontSize="medium"
          sx={{ color: "secondary.main", mx: 0.5 }}
        />
        تفاصيل الرحلة
      </Typography>
      <CitiesList
        cities={cities}
        value={sortedCitiesRef.current}
        onChange={(val) => onCitiesChange(val)}
      />
      {sortedCitiesRef.current && sortedCitiesRef.current.length > 0 ? (
        <SortableTable
          value={getSelectedCities(sortedCitiesRef.current, cities, isFetched)}
          onChange={(val) => {
            onChange(getCitiesId(val));
            sortedCitiesRef.current = getCitiesId(val);
            setRefresh((prev) => !prev);
          }}
        />
      ) : null}
    </Paper>
  );
};

export default TourCities;
