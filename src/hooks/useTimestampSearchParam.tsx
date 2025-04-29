import { useSearchParams } from "react-router-dom";
import { Timestamps } from "../features/home/components/ChartFilter";
import { ToursChart } from "../features/home/api/types";
import { useEffect, useState } from "react";

const useTimestampSearchParam = (dataset: ToursChart | null) => {
  const [searchParams] = useSearchParams();
  const [filtered, setFiltered] = useState<number[] | []>([]);
  let timestamp = (searchParams.get("timestamp") as Timestamps) ?? "Weekly";
  timestamp = `${timestamp[0].toUpperCase()}${timestamp.slice(
    1
  )}` as Timestamps;

  useEffect(() => {
    if (dataset) {
      const res = dataset[timestamp];
      setFiltered(res);
    }
  }, [timestamp, dataset]);

  return filtered;
};

export default useTimestampSearchParam;
