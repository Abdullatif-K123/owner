import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextFieldProps } from "@mui/material";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import DebouncedTextField from "./DebouncedTextField";

let isInitialRender = true;

const SearchInput = (props: TextFieldProps) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get("q") ?? "");
  useEffect(() => {
    if (isInitialRender) {
      isInitialRender = false;
      return;
    }
    setSearchParams((searchParams) => {
      if (query) {
        searchParams.set("q", query);
      } else {
        searchParams.delete("q");
      }
      return searchParams;
    });
  }, [query]);
  return (
    <DebouncedTextField
      initial={query}
      clearable
      setDebounced={setQuery}
      size={"small"}
      fullWidth
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
      }}
      {...props}
    />
  );
};
export default SearchInput;
