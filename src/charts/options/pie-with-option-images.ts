import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from "echarts";
import { CHART_WIDTHS, pieColors } from "@/charts/constants/shared";
import {
  renderLgLegendItem,
  renderMdLegendItem,
} from "@/charts/renderItem/pie-with-option-images";
import { PIE_HIDDEN_AXISES } from "@/charts/constants/pie";
import { Breakpoint } from "../types";

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
  questionImage: string,
  breakpoint: Breakpoint
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
        ) =>
          renderMdLegendItem(
            param,
            api,
            questionImage,
            data.length,
            breakpoint
          ),
        data: legendData,
      },
      {
        data: pieData,
        ...pieSeries,
      },
    ],
    grid: {
      left: CHART_WIDTHS[breakpoint].M,
      right: 0,
      top: 0,
      bottom: 1,
    },
  };
};
export const getLgOption = (
  pieData: any,
  pieLegendData: any,
  questionImage: string,
  optionHeights: number[],
  optionsWithImagesLines: number[],
  containerHeight: number,
  breakpoint: Breakpoint
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
          containerHeight,
          breakpoint
        ),
      data: pieLegendData,
    },
    {
      data: pieData,
      ...pieSeries,
    },
  ],
  grid: {
    left: CHART_WIDTHS[breakpoint].L,
    right: 0,
    top: 0,
    bottom: 1,
  },
});
