import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from "echarts";
import { pieColors } from "@/constants";
import { renderLgLegendItem, renderMdLegendItem } from "@/app/pie/renderItem";
import { renderSmLegendItem } from "@/renderItem";

const pieTooltip = {
  show: false,
};
const pieSeries = {
  type: "pie",
  color: pieColors,
  label: {
    show: false,
  },
  emptyCircleStyle: {
    color: "#6C7080",
  },
  center: ["25%", "50%"],
  radius: [51, 91],
  name: "pie-series",
};
const hiddenAxises = {
  xAxis: {
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
  },
  yAxis: {
    axisLabel: {
      show: false,
    },
    type: "value",
    splitLine: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
};
export const getSmOption = (pieData: any, pieLegendData: any) => {
  const hasOverflow = pieData.length > 4;
  const data = pieData;
  const legendData = hasOverflow ? pieLegendData.slice(0, 4) : pieLegendData;
  return {
    animation: false,
    tooltip: pieTooltip,
    backgroundColor: "#222430",
    ...hiddenAxises,
    grid: {
      right: 0,
      top: 0,
      bottom: 0,
      left: 132,
    },
    series: [
      {
        type: "custom",
        renderItem: (
          param: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) => renderSmLegendItem(param, api, legendData.length),
        data: legendData,
      },
      {
        ...pieSeries,
        center: ["60px", "50%"],
        radius: [40, 56],
        data,
      },
    ],
  };
};
export const getMdOption = (
  pieData: any,
  pieLegendData: any,
  questionImage: string
) => {
  const hasOverflow = pieData.length > 11;
  const data = hasOverflow ? pieData.slice(0, 11) : pieData;
  const legendData = hasOverflow ? pieLegendData.slice(0, 11) : pieLegendData;
  return {
    animation: false,
    tooltip: pieTooltip,
    backgroundColor: "#222430",
    ...hiddenAxises,
    series: [
      {
        type: "custom",
        renderItem: (
          param: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) => renderMdLegendItem(param, api, questionImage, data.length),
        data: legendData,
      },
      {
        data: pieData,
        ...pieSeries,
      },
    ],
    grid: {
      left: "50%",
      right: 1,
      top: 0,
      bottom: 0,
    },
  };
};
export const getLgOption = (
  pieData: any,
  pieLegendData: any,
  questionImage: string,
  optionHeights: number[],
  optionsWithImagesLines: number[],
  containerHeight: number
) => ({
  animation: false,
  tooltip: pieTooltip,
  backgroundColor: "#222430",
  ...hiddenAxises,
  series: [
    {
      type: "custom",
      renderItem: (
        param: CustomSeriesRenderItemParams,
        api: CustomSeriesRenderItemAPI
      ) =>
        renderLgLegendItem(
          param,
          api,
          questionImage,
          optionHeights,
          optionsWithImagesLines,
          containerHeight
        ),
      data: pieLegendData,
    },
    {
      data: pieData,
      ...pieSeries,
    },
  ],
  grid: {
    left: "50%",
    right: 1,
    top: 0,
    bottom: 0,
  },
});
