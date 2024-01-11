"use client";
import { ReactECharts } from "@/components/ReactECharts";
import {
  Button,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  FormLabel,
  styled,
} from "@mui/material";
import React, { useRef, useState } from "react";
import { smOption, getMdOption, getLgOption } from "@/data/pie";
import { url } from "@/data/constants";
import { DndCard } from "@/components/DndCard";
import { CardSize } from "../bar/types";
const pieData = [
  {
    value: 10,
    name: "Search Engine Search Engine Search Engine Search Engine e Search Engine Search Engine Search Engine e Search Engine Search Engine Search Engine",
  },
  {
    value: 20,
    name: "Search Engine",
  },
  { value: 25, name: "Other" },
  { value: 15, name: "Option 1" },
  { value: 2, name: "Option 2" },
  { value: 3, name: "Option 3" },
  { value: 5, name: "Option 4" },
  { value: 3, name: "Option 5 Engine Search Engine Search Engine Search" },
  { value: 2, name: "Option 6" },
  { value: 2, name: "Option 7" },
  { value: 2, name: "Option 8" },
  { value: 2, name: "Option 9" },
  { value: 2, name: "Option 10" },
  { value: 2, name: "Option 11" },
  { value: 8, name: "Option 12" },
  { value: 2, name: "Option 13" },
];
const MIN_L_CHART_HEIGHT = 188;
const PieChartContainer = styled("div")<{
  size: CardSize;
  height: number;
}>(({ size, height }) => {
  return {
    position: "relative",
    width: "100%",
    height:
      size === CardSize.large
        ? height > MIN_L_CHART_HEIGHT
          ? height
          : MIN_L_CHART_HEIGHT
        : "100%",
  };
});

function Pie({ cardSize = CardSize.medium }) {
  const [imageUrl, setImageUrl] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [size, setSize] = useState(cardSize);
  const toggleImg = () => {
    setImageUrl(imageUrl ? "" : url);
  };
  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value as CardSize);
  };
  const withImage = !!imageUrl;
  const small = smOption(pieData);
  const medium = getMdOption(pieData, withImage);
  const large = getLgOption(pieData, withImage);
  const options = {
    small,
    medium,
    large,
  };

  return (
    <>
      <Button
        sx={{ marginBottom: 4, display: "block" }}
        variant="contained"
        onClick={toggleImg}
        disabled={size === CardSize.small}
      >
        Toggle image
      </Button>
      <FormControl>
        <FormLabel id="radio-buttons-group-label">Card size</FormLabel>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          value={size}
          onChange={handleSizeChange}
          name="radio-buttons-group"
        >
          <FormControlLabel
            value={CardSize.small}
            control={<Radio />}
            label="Small"
          />
          <FormControlLabel
            value={CardSize.medium}
            control={<Radio />}
            label="Medium"
          />
          <FormControlLabel
            value={CardSize.large}
            control={<Radio />}
            label="Large"
          />
        </RadioGroup>
      </FormControl>
      <DndCard size={size} imageUrl={imageUrl}>
        <PieChartContainer
          size={size}
          ref={containerRef}
          height={pieData.length * 24}
        >
          <ReactECharts containerRef={containerRef} option={options[size]} />
        </PieChartContainer>
      </DndCard>
    </>
  );
}

export default Pie;
