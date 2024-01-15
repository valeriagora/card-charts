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
import React, { useEffect, useRef, useState } from "react";
import { smOption, getMdOption, getLgOption } from "@/data/pie";
import { url } from "@/data/constants";
import { DndCard } from "@/components/DndCard";
import { CardSize } from "../../bar/types";
import { ECharts } from "echarts";

const imageOptions = [
  "https://images.unsplash.com/photo-1702744473287-4cc284e97206?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1702893576128-21feb60299d1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1703028408829-ba45aa14b782?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519925610903-381054cc2a1c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=2875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1703615318360-788893a586d8?q=80&w=2785&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682687982029-edb9aecf5f89?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1704192761191-757e0ccc5186?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1704587422648-43f456047a72?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682687220795-796d3f6f7000?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1704419278767-09bc3a98581c?q=80&w=2875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
const pieData = [
  {
    value: 10,
    name: "Search Engine Search Engine Search Engine Search Engine e Search Engine Search Engine Search Engine e Search Engine Search Engine Search Engine",
    imageKey: "image1",
  },
  {
    value: 20,
    name: "Search Engine",
    imageKey: "image2",
  },
  { value: 25, name: "Other", imageKey: "image3" },
  { value: 15, name: "Option 1", imageKey: "image4" },
  { value: 2, name: "Option 2", imageKey: "image5" },
  { value: 3, name: "Option 3", imageKey: "image6" },
  { value: 5, name: "Option 4", imageKey: "image7" },
  {
    value: 3,
    name: "Option 5 Engine Search Engine Search Engine Search Search Search Search Search",
    imageKey: "image8",
  },
  { value: 2, name: "Option 6", imageKey: "image9" },
  { value: 2, name: "Option 7", imageKey: "image10" },
  { value: 2, name: "Option 8", imageKey: "image11" },
  { value: 2, name: "Option 9", imageKey: "image12" },
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
export const PIE_L_OPTION_HEIGHT = 20 * 3 + 8;
export const PIE_L_OPTION_WITH_IMAGE_HEIGHT = 72 + 8;
function PieChart({
  cardSize = CardSize.large,
  imageOptionUrls = imageOptions,
}: // imageOptionUrls = undefined,
any) {
  const withImageOptions = imageOptionUrls ? !!imageOptionUrls?.length : false;
  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);
  const onChartInit = (chartInstance: ECharts) => {
    setChartInstance(chartInstance);
  };
  const [imageUrl, setImageUrl] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [size, setSize] = useState(cardSize);
  const toggleImg = () => {
    setImageUrl(imageUrl ? "" : url);
  };
  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value as CardSize);
  };
  useEffect(() => {
    if (chartInstance) {
      // console.log("chart instance", chartInstance.on);
      chartInstance.on("click", function (params) {
        console.log("legend event", params);
      });
    }
  }, [chartInstance]);

  const withImage = !!imageUrl;
  const small = smOption(pieData);
  const medium = getMdOption(pieData, withImage, imageOptionUrls);
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
          height={pieData.length * 60}
          // height={
          //   withImageOptions
          //     ? pieData.length * PIE_L_OPTION_WITH_IMAGE_HEIGHT
          //     : pieData.length * PIE_L_OPTION_HEIGHT
          // }
        >
          <ReactECharts
            onChartInit={onChartInit}
            containerRef={containerRef}
            option={options[size]}
          />
        </PieChartContainer>
      </DndCard>
    </>
  );
}

export default PieChart;
