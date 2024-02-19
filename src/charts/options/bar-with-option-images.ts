import { ReactEChartsProps } from "@/charts/components/shared/ReactECharts";
import {
  CustomSeriesRenderItemParams,
  SeriesOption,
  CustomSeriesRenderItemAPI,
} from "echarts";
import {
  CardSize,
  CustomLegend,
  CustomLegendWithImage,
  Breakpoint,
} from "@/charts/types";
import {
  renderBarLgLegendItem,
  renderBarMdLegendItem,
} from "@/charts/renderItem/bar-with-option-images";
import { renderT2B } from "@/charts/renderItem/bar";
import {
  CHART_BOX_DIMENSIONS,
  CHART_CONTAINER_X_GAP_ML,
} from "../constants/shared";
import { breakWord } from "../utils";
import {
  BAR_HEIGHT,
  BAR_CHART_PADDING_LEFT_ML,
  BAR_Y_GAP_WITH_OPTION_IMG_ML,
  BAR_CHART_CONTAINER_PADDING_BOTTOM_ML,
  BAR_OPTION_X_AXIS,
  BAR_OPTION_Y_AXIS,
  BAR_SERIES,
  BAR_Y_AXISES_WIDTHS,
} from "../constants/bar";

export const getMdOption = (
  data: { name: string; value: number }[],
  legendData: CustomLegend | CustomLegendWithImage,
  withImage: boolean,
  hasOverflow: boolean,
  showT2B: boolean,
  questionImageUrl: string,
  breakpoint: Breakpoint
): ReactEChartsProps["option"] => {
  const barData = hasOverflow ? data.slice(0, 4) : data;
  const legend = hasOverflow ? legendData.slice(0, 4) : legendData;
  const gridVerticalPadding = hasOverflow
    ? 0
    : (CHART_BOX_DIMENSIONS[breakpoint].M.height -
        BAR_Y_GAP_WITH_OPTION_IMG_ML * barData.length -
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
              barData,
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
        data: barData,
        ...BAR_SERIES,
      },
      t2bSeries as SeriesOption,
    ],
  };
};

export const getLgOption = (
  data: { name: string; value: number }[],
  legendData: CustomLegend | CustomLegendWithImage,
  withImage: boolean,
  showT2B: boolean,
  questionImageUrl: string,
  containerHeight: number,
  breakpoint: Breakpoint
): ReactEChartsProps["option"] => {
  const t2bSeries = showT2B
    ? {
        type: "custom",
        renderItem: (
          params: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) =>
          renderT2B(
            params,
            api,
            data,
            0,
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
      top: 0,
      bottom: BAR_CHART_CONTAINER_PADDING_BOTTOM_ML,
      right: BAR_Y_AXISES_WIDTHS[breakpoint].L + CHART_CONTAINER_X_GAP_ML,
      left: BAR_CHART_PADDING_LEFT_ML,
    },
    xAxis: BAR_OPTION_X_AXIS,
    yAxis: {
      ...BAR_OPTION_Y_AXIS,
      data,
    },
    tooltip: {
      trigger: "item",
      formatter: (props: any) => breakWord(props.data.name, 45).join("<br/>"),
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
            containerHeight,
            breakpoint
          ),
        data: legendData,
      },
      {
        ...BAR_SERIES,
        data,
      },
      t2bSeries as SeriesOption,
    ],
  };
};
