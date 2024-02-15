import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from "echarts";
import {
  CHART_WIDTH_L,
  CHART_WIDTH_M,
  pieColors,
  CHART_WIDTH_S,
} from "@/charts/constants/shared";
import {
  renderSmLegendItem,
  renderMdLegendItem,
  renderLgLegendItem,
} from "@/charts/renderItem/pie";
import { PIE_HIDDEN_AXISES } from "@/charts/constants/pie";
import { ReactEChartsProps } from "../components/shared/ReactECharts";
import { CustomLegend } from "../types";

const pieTooltip = {
  show: false,
};
const pieSeries = {
  type: "pie" as any,
  color: pieColors as any[],
  label: {
    show: false,
  },
  center: ["25%", "50%"],
  radius: [51, 91],
  name: "pie-series",
};

export const getSmOption = (
  data: { name: string; value: number }[],
  pieLegendData: CustomLegend
): ReactEChartsProps["option"] => {
  const hasOverflow = data.length > 4;
  const legendData = hasOverflow ? pieLegendData.slice(0, 4) : pieLegendData;
  return {
    silent: true,
    animation: false,
    tooltip: pieTooltip,
    backgroundColor: "#222430",
    ...PIE_HIDDEN_AXISES,
    grid: {
      right: 0,
      top: 0,
      bottom: 0,
      left: CHART_WIDTH_S,
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
  pieData: { name: string; value: number }[],
  pieLegendData: CustomLegend,
  questionImage: string
): ReactEChartsProps["option"] => {
  const hasOverflow = pieData.length > 11;
  const data = hasOverflow ? pieData.slice(0, 11) : pieData;
  const legendData = hasOverflow ? pieLegendData.slice(0, 11) : pieLegendData;
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
