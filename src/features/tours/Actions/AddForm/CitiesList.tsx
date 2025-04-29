import { useEffect, useRef, useState } from "react";
import { Box, Chip, Stack, Typography } from "@mui/material";
import { UniqueIdentifier } from "@dnd-kit/core";
import { cityObj, TourCitiesObj } from "../../../../API/tour/types";

type Props = {
  cities: cityObj[];
  value?: TourCitiesObj[];
  onChange?: (items: TourCitiesObj[]) => void;
};

const CitiesList = ({ cities, value, onChange }: Props) => {
  const selectedRef = useRef<TourCitiesObj[]>(value ? value : []);
  const [, setRefresh] = useState(true);
  const onChipClick = (id: UniqueIdentifier) => {
    if (selectedRef.current.findIndex((item) => item.cityId === id) === -1) {
      selectedRef.current = [
        ...selectedRef.current,
        { cityId: id, breakTime: 0 },
      ];
    } else {
      selectedRef.current = selectedRef.current.filter(
        (item) => item.cityId !== id
      );
    }
    onChange?.(selectedRef.current);
    setRefresh((prev) => !prev);
  };

  const useChipColor = (id: UniqueIdentifier) => {
    const index = selectedRef.current.findIndex((item) => item.cityId === id);
    if (index === -1) return "default";
    else return "primary";
  };

  useEffect(() => {
    selectedRef.current = value ? value : [];
  }, [value]);

  return (
    <Box sx={{ pb: 3 }}>
      <Typography
        component="h4"
        variant="subtitle1"
        color="primary"
        sx={{ my: 1 }}
      >
        أختر المدن التي تمر منها الرحلة
      </Typography>
      <Stack direction="row" flexWrap="wrap" spacing={2}>
        {cities &&
          cities.map((city, i) => (
            <Chip
              key={i}
              sx={{ cursor: "pointer", width: 100 }}
              color={useChipColor(city.id)}
              label={city.name}
              onClick={() => onChipClick(city.id)}
            />
          ))}
      </Stack>
    </Box>
  );
};

export default CitiesList;
