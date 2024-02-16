import { ReactEChartsProps } from "@/charts/components/shared/ReactECharts";
import {
  CustomSeriesRenderItemParams,
  SeriesOption,
  CustomSeriesRenderItemAPI,
} from "echarts";
import {
  BAR_HEIGHT,
  BAR_CHART_PADDING_LEFT_ML,
  BAR_Y_GAP_ML,
  BAR_CHART_CONTAINER_PADDING_BOTTOM_ML,
  // BAR_Y_AXIS_WIDTH_S,
  // BAR_Y_AXIS_WIDTH_M,
  // BAR_Y_AXIS_WIDTH_L,
  BAR_OPTION_X_AXIS,
  BAR_OPTION_Y_AXIS,
  BAR_SERIES,
  BAR_Y_AXISES_WIDTHS,
} from "@/charts/constants/bar";
import {
  CardSize,
  CustomLegend,
  CustomLegendWithImage,
  IBreakpoint,
} from "@/charts/types";
import {
  renderBarLgLegendItem,
  renderBarMdLegendItem,
  renderBarSmLegendItem,
  renderT2B,
} from "@/charts/renderItem/bar";
import {
  CHART_BOX_DIMENSIONS,
  CHART_CONTAINER_X_GAP_ML,
  CHART_CONTAINER_X_GAP_S,
  TEXT_LINE_HEIGHT,
} from "../constants/shared";
import { breakWord } from "../utils";

export const getSmOption = (
  data: { name: string; value: number }[],
  legendData: CustomLegend | CustomLegendWithImage,
  hasOverflow: boolean,
  breakpoint: IBreakpoint
): ReactEChartsProps["option"] => {
  const barData = hasOverflow ? data.slice(0, 4) : data;
  const legend = hasOverflow ? legendData.slice(0, 4) : legendData;
  const gridVerticalPadding =
    (CHART_BOX_DIMENSIONS[breakpoint].S.height -
      barData.length * TEXT_LINE_HEIGHT) /
    2;
  return {
    animation: false,
    backgroundColor: "#222430",
    show: true,
    grid: {
      top: gridVerticalPadding,
      bottom: gridVerticalPadding,
      right: BAR_Y_AXISES_WIDTHS[breakpoint].S + CHART_CONTAINER_X_GAP_S,
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
        ) => renderBarSmLegendItem(param, api, gridVerticalPadding, breakpoint),
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
  legendData: CustomLegend,
  withImage: boolean,
  hasOverflow: boolean,
  showT2B: boolean,
  questionImageUrl: string,
  breakpoint: IBreakpoint
): ReactEChartsProps["option"] => {
  const barData = hasOverflow ? data.slice(0, 11) : data;
  const legend = hasOverflow ? legendData.slice(0, 11) : legendData;
  const gridVerticalPadding = hasOverflow
    ? 0
    : (CHART_BOX_DIMENSIONS[breakpoint].M.height -
        BAR_Y_GAP_ML * (barData.length - 1) -
        BAR_HEIGHT * barData.length -
        BAR_CHART_CONTAINER_PADDING_BOTTOM_ML) /
      2;

  const t2bSeries =
    showT2B && !withImage
      ? {
          type: "custom",
          renderItem: (params: any, api: any) =>
            renderT2B(
              params,
              api,
              data,
              gridVerticalPadding,
              CardSize.medium,
              breakpoint
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
      bottom: gridVerticalPadding + BAR_CHART_CONTAINER_PADDING_BOTTOM_ML,
      right: BAR_Y_AXISES_WIDTHS[breakpoint].M + CHART_CONTAINER_X_GAP_ML,
      left: BAR_CHART_PADDING_LEFT_ML,
    },
    xAxis: BAR_OPTION_X_AXIS,
    yAxis: {
      ...BAR_OPTION_Y_AXIS,
      data: barData,
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
            questionImageUrl,
            breakpoint
          ),
        data: legend,
      },
      {
        data: data,
        ...BAR_SERIES,
      },
      t2bSeries as SeriesOption,
    ],
  };
};

export const getLgOption = (
  data: { name: string; value: number }[],
  legendData: CustomLegend,
  withImage: boolean,
  showT2B: boolean,
  questionImageUrl: string,
  containerHeight: number,
  breakpoint: IBreakpoint
): ReactEChartsProps["option"] => {
  const gridVerticalPadding =
    (containerHeight -
      data.length * BAR_HEIGHT -
      (data.length - 1) * BAR_Y_GAP_ML -
      BAR_CHART_CONTAINER_PADDING_BOTTOM_ML) /
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
            breakpoint,
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
      bottom: gridVerticalPadding + BAR_CHART_CONTAINER_PADDING_BOTTOM_ML,
      left: BAR_CHART_PADDING_LEFT_ML,
      right: BAR_Y_AXISES_WIDTHS[breakpoint].L + CHART_CONTAINER_X_GAP_ML,
    },
    xAxis: BAR_OPTION_X_AXIS,
    yAxis: {
      ...BAR_OPTION_Y_AXIS,
      data,
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
            containerHeight,
            breakpoint
          ),
        data: legendData,
      },
      {
        data,
        ...BAR_SERIES,
      },
      t2bSeries as SeriesOption,
    ],
  };
};
