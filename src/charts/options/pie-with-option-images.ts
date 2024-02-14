import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from "echarts";
import {
  CHART_WIDTH_L,
  CHART_WIDTH_M,
  pieColors,
} from "@/charts/constants/shared";
import {
  renderLgLegendItem,
  renderMdLegendItem,
} from "@/charts/renderItem/pie-with-option-images";
import { PIE_HIDDEN_AXISES } from "@/charts/constants/pie";

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

export const getMdOption = (
  pieData: any,
  pieLegendData: any,
  questionImage: string
) => {
  const hasOverflow = pieData.length > 4;
  const data = hasOverflow ? pieData.slice(0, 4) : pieData;
  const legendData = hasOverflow ? pieLegendData.slice(0, 4) : pieLegendData;
  return {
    silent: true,
    animation: false,
    tooltip: pieTooltip,
    backgroundColor: "#222430",
    ...PIE_HIDDEN_AXISES,
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
      left: CHART_WIDTH_M,
      right: 0,
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
  silent: true,
  animation: false,
  tooltip: pieTooltip,
  backgroundColor: "#222430",
  ...PIE_HIDDEN_AXISES,
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
    left: CHART_WIDTH_L,
    right: 0,
    top: 0,
    bottom: 0,
  },
});
