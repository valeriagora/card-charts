import { ReactEChartsProps } from "@/charts/components/shared/ReactECharts";
import {
  CustomSeriesRenderItemParams,
  SeriesOption,
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItem,
  CustomSeriesRenderItemReturn,
} from "echarts";
import { CardSize, CustomLegend, CustomLegendWithImage } from "@/charts/types";
import {
  renderBarLgLegendItem,
  renderBarMdLegendItem,
} from "@/charts/renderItem/bar-with-option-images";
import { renderT2B } from "@/charts/renderItem/bar";
import {
  chartBoxDimensions,
  CHART_CONTAINER_X_GAP_ML,
  CHART_WIDTH_L,
  CHART_WIDTH_M,
} from "../constants/shared";
import { breakWord } from "../utils";
import {
  BAR_HEIGHT,
  BAR_CHART_PADDING_LEFT_ML,
  BAR_Y_GAP_WITH_OPTION_IMG_ML,
  BAR_CHART_CONTAINER_PADDING_BOTTOM_ML,
} from "../constants/bar";
export const getMdOption = (
  data: { name: string; value: number }[],
  legendData: CustomLegend | CustomLegendWithImage,
  withImage: boolean,
  hasOverflow: boolean,
  showT2B: boolean,
  questionImageUrl: string
): ReactEChartsProps["option"] => {
  const barData = hasOverflow ? data.slice(0, 4) : data;
  const legend = hasOverflow ? legendData.slice(0, 4) : legendData;
  const gridVerticalPadding = hasOverflow
    ? 0
    : (chartBoxDimensions.medium.height -
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
              CardSize.medium
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
      right: CHART_WIDTH_M + CHART_CONTAINER_X_GAP_ML,
      left: BAR_CHART_PADDING_LEFT_ML,
    },
    xAxis: {
      name: "",
      inverse: true,
      axisLabel: {
        margin: 2,
        show: true,
        fontFamily: "Manrope",
        color: "#c8cad0",
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
        data: barData,
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
  legendData: CustomLegend | CustomLegendWithImage,
  withImage: boolean,
  showT2B: boolean,
  questionImageUrl: string,
  containerHeight: number
): ReactEChartsProps["option"] => {
  const t2bSeries = showT2B
    ? {
        type: "custom",
        renderItem: (
          params: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) => renderT2B(params, api, data, 0, CardSize.large, withImage),
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
      right: CHART_WIDTH_L + CHART_CONTAINER_X_GAP_ML,
      left: BAR_CHART_PADDING_LEFT_ML,
    },
    xAxis: {
      name: "",
      inverse: true,
      axisLabel: {
        margin: 2,
        show: true,
        fontFamily: "Manrope",
        color: "#c8cad0",
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
