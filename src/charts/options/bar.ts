import { ReactEChartsProps } from "@/charts/components/shared/ReactECharts";
import {
  CustomSeriesRenderItemParams,
  SeriesOption,
  CustomSeriesRenderItemAPI,
} from "echarts";
import {
  BAR_CHART_ML_BOTTOM_PADDING,
  BAR_GRID_LEFT,
  BAR_HEIGHT,
  L_BAR_GRID_CHART_WIDTH,
  ML_BAR_CHART_HORIZONTAL_GAP,
  ML_GRID_BOTTOM_PADDING,
  M_BAR_Y_GAP,
  M_BAR_Y_PADDINGS,
} from "@/charts/constants/bar";
import { CardSize, CustomLegend, CustomLegendWithImage } from "@/charts/types";
import {
  renderBarLgLegendItem,
  renderBarMdLegendItem,
  renderBarSmLegendItem,
  renderT2B,
} from "@/charts/renderItem/bar";
import {
  chartBoxDimensions,
  OPTION_IMAGE_SIDE,
  OPTION_MARGIN_BOTTOM,
  TEXT_LINE_HEIGHT,
} from "../constants/shared";
import { breakWord } from "../utils";

export const getSmOption = (
  data: { name: string; value: number }[],
  legendData: CustomLegend | CustomLegendWithImage,
  hasOverflow: boolean
): ReactEChartsProps["option"] => {
  const barData = hasOverflow ? data.slice(0, 4) : data;
  const legend = hasOverflow ? legendData.slice(0, 4) : legendData;
  const gridVerticalPadding =
    (chartBoxDimensions.small.height - barData.length * 20) / 2;
  return {
    animation: false,
    backgroundColor: "#222430",
    show: true,
    grid: {
      top: gridVerticalPadding,
      bottom: gridVerticalPadding,
      right: 148 + 12,
      left: 0,
    },
    xAxis: {
      inverse: true,
      show: true,
      splitLine: {
        lineStyle: { color: "#474A59" },
      },
      axisLabel: {
        show: false,
      },
    },
    yAxis: {
      inverse: true,
      show: false,
      data: barData.map((item) => item.name),
      position: "right",
      type: "category",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#6C7080",
          width: 1,
        },
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        type: "custom",
        renderItem: (
          param: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) => renderBarSmLegendItem(param, api, gridVerticalPadding),
        data: legend,
      },
      {
        data: barData,
        type: "bar",
        barWidth: 16,
        itemStyle: {
          color: "#25B4C8",
        },
      },
    ],
  };
};

export const getMdOption = (
  data: { name: string; value: number }[],
  legendData: CustomLegend[],
  withImage: boolean,
  hasOverflow: boolean,
  showT2B: boolean,
  questionImageUrl: string
): ReactEChartsProps["option"] => {
  const barData = hasOverflow ? data.slice(0, 11) : data;
  const legend = hasOverflow ? legendData.slice(0, 11) : legendData;
  const gridVerticalPadding = hasOverflow
    ? 0
    : (chartBoxDimensions.medium.height -
        M_BAR_Y_GAP * (barData.length - 1) -
        BAR_HEIGHT * barData.length -
        M_BAR_Y_PADDINGS -
        BAR_CHART_ML_BOTTOM_PADDING) /
      2;
  const t2bSeries =
    showT2B && !withImage
      ? {
          type: "custom",
          renderItem: (params: any, api: any) =>
            renderT2B(params, api, data, gridVerticalPadding, CardSize.medium),
          data: [[]],
          z: -1,
        }
      : undefined;
  return {
    animation: false,
    backgroundColor: "#222430",
    show: true,
    grid: {
      top: gridVerticalPadding,
      bottom: gridVerticalPadding + ML_GRID_BOTTOM_PADDING,
      right: "50%",
      left: BAR_GRID_LEFT,
    },
    xAxis: {
      name: "",
      inverse: true,
      axisLabel: {
        margin: 2,
        show: true,
        fontFamily: "Manrope",
        color: "#6C7080",
        fontSize: 12,
        lineHeight: 16,
        fontWeight: 400,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#6C7080",
          width: 1,
        },
      },
    },
    yAxis: {
      inverse: true,
      show: true,
      data: barData,
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        type: "custom",
        renderItem: (
          param: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) =>
          renderBarMdLegendItem(
            param,
            api,
            gridVerticalPadding,
            showT2B,
            questionImageUrl
          ),
        data: legend,
      },
      {
        data: data,
        type: "bar",
        barWidth: 16,
        itemStyle: {
          color: "#25B4C8",
        },
      },
      t2bSeries as SeriesOption,
    ],
  };
};

export const getLgOption = (
  data: { name: string; value: number }[],
  legendData: CustomLegend[],
  withImage: boolean,
  showT2B: boolean,
  questionImageUrl: string,
  containerHeight: number
): ReactEChartsProps["option"] => {
  const gridVerticalPadding =
    (containerHeight -
      data.length * BAR_HEIGHT -
      (data.length - 1) * OPTION_MARGIN_BOTTOM -
      BAR_CHART_ML_BOTTOM_PADDING) /
    2;
  const t2bSeries = showT2B
    ? {
        type: "custom",
        renderItem: (params: any, api: any) =>
          renderT2B(
            params,
            api,
            data,
            gridVerticalPadding,
            CardSize.large,
            withImage
          ),
        data: [[]],
        z: -1,
      }
    : undefined;
  return {
    animation: false,
    backgroundColor: "#222430",
    show: true,
    grid: {
      top: gridVerticalPadding,
      bottom: gridVerticalPadding,
      left: BAR_GRID_LEFT,
      right: L_BAR_GRID_CHART_WIDTH + ML_BAR_CHART_HORIZONTAL_GAP,
    },
    xAxis: {
      name: "",
      inverse: true,
      axisLabel: {
        margin: 2,
        show: true,
        fontFamily: "Manrope",
        color: "#6C7080",
        fontSize: 12,
        lineHeight: 16,
        fontWeight: 400,
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: "#6C7080",
          width: 1,
        },
      },
    },
    yAxis: {
      inverse: true,
      show: true,
      data,
      axisTick: {
        show: false,
      },
    },
    tooltip: {
      trigger: "item",
      formatter: (props: any) => {
        return breakWord(props.data.name, 45).join("<br/>");
      },
      backgroundColor: "#3B3E4A",
      borderColor: "#3B3E4A",
      textStyle: {
        color: "#fff",
        fontWeight: 500,
        fontFamily: "Manrope",
        fontSize: 14,
        lineHeight: 20,
      },
    },
    series: [
      {
        type: "custom",
        tooltip: {
          position: ["50%", "50%"],
        },
        renderItem: (
          param: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) =>
          renderBarLgLegendItem(
            param,
            api,
            showT2B,
            questionImageUrl,
            gridVerticalPadding,
            containerHeight
          ),
        data: legendData,
      },
      {
        data,
        type: "bar",
        barWidth: 16,
        barCategoryGap: 12,
        itemStyle: {
          color: "#25B4C8",
        },
      },
      t2bSeries as SeriesOption,
    ],
  };
};
