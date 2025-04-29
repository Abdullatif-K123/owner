import React, { FC, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ModelsGrid from "./ModelsGrid";

type Props = {
  onChange: (val: string) => void;
  value: string | undefined;
  defaultValue: string;
};

const ModalAccordion: FC<Props> = ({ onChange, value, defaultValue }) => {
  const [expanded, setExpanded] = useState<string | false>(false);
  const [selected, setSelected] = useState(defaultValue);

  useEffect(() => {
    setSelected(defaultValue);
  }, [defaultValue]);

  const handleChange =
    (panel: string) => (_event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded ? panel : false);
    };

  return (
    <Accordion
      expanded={expanded === "panel1"}
      onChange={handleChange("panel1")}
      sx={{ width: "100%" }}
    >
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1bh-content"
        id="panel1bh-header"
        sx={{ cursor: "pointer !important" }}
      >
        <Typography sx={{ width: "33%", flexShrink: 0 }}>
          أختر نموذج للحافلة
        </Typography>
        <Typography sx={{ width: "33%", flexShrink: 0 }} color="secondary.main">
          {selected}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <ModelsGrid
          onIdChange={onChange}
          onNameChange={setSelected}
          value={value}
        />
      </AccordionDetails>
    </Accordion>
  );
};

export default ModalAccordion;
