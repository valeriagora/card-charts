import { ReactEChartsProps } from "@/charts/components/shared/ReactECharts";
import {
  CustomSeriesRenderItemParams,
  SeriesOption,
  CustomSeriesRenderItemAPI,
} from "echarts";
import { ML_BAR_BOTTOM_PADDING } from "@/charts/constants/bar";
import { CardSize, CustomLegend } from "@/charts/types";
import {
  renderBarLgLegendItem,
  renderBarMdLegendItem,
  renderBarSmLegendItem,
} from "@/charts/renderItem/bar";

export const getSmOption = (
  data: { name: string; value: number }[],
  legendData: CustomLegend[],
  hasOverflow: boolean
): ReactEChartsProps["option"] => {
  const barData = hasOverflow ? data.slice(0, 4) : data;
  const legend = hasOverflow ? legendData.slice(0, 4) : legendData;
  return {
    animation: false,
    backgroundColor: "#222430",
    show: true,
    grid: {
      top: 0,
      bottom: 0,
      right: 148 + 12,
      left: 0,
    },
    xAxis: {
      inverse: true,
      show: false,
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
        ) => renderBarSmLegendItem(param, api, legend.length),
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

const renderOptionImage = function (
  param: any,
  api: any,
  maxXAxisValue: number
) {
  const xAxisStartPx = param.coordSys.x;
  const size = api.size([maxXAxisValue, 1]);
  return {
    type: "group",
    children: [
      {
        type: "image",
        style: {
          image: api.value(2),
          x: 2,
          y: 2,
          width: 72,
          height: 72,
        },
        position: [size[0] + xAxisStartPx + 8, size[1] * param.dataIndex],
      },
    ],
  };
};

const ML_CARD_HORIZONTAL_PADDING = 20;
const L_ROW_MAX_HEIGHT = 60;
const L_CONTAINER_WIDTH = 992 - ML_CARD_HORIZONTAL_PADDING * 2;
const M_CONTAINER_WIDTH = 656 - ML_CARD_HORIZONTAL_PADDING * 2;
const GRID_BOTTOM_PADDING = 16;
const T2B_TEXT_RIGHT_PADDING = 10;

const renderT2B = function (
  params: any,
  api: any,
  values: any,
  size: any,
  withImage = false
) {
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const hasOverflow = values.length > 11;
  const data = hasOverflow ? values.slice(0, 11) : values;
  const t2bPercents = data[0].value + data[1].value;
  let b2bPercents = data[data.length - 1].value + data[data.length - 2].value;
  let containerWidth =
    size === CardSize.large ? L_CONTAINER_WIDTH : M_CONTAINER_WIDTH;
  const optionHeight = size === CardSize.large ? L_ROW_MAX_HEIGHT : ySizePx;
  const containerHeight = optionHeight * 2;
  const textWidth = 60;
  const iconHeight = 8;
  const fontSize = 14;
  if (withImage && size === CardSize.large) {
    const imageWidth = 120;
    const imageLeftMargin = 4;
    containerWidth -= imageWidth - imageLeftMargin;
  }
  const b2bYDistance = (data.length - 2) * optionHeight;
  const b2bTextYDistance = data.length - 1;
  const showTop2Box = t2bPercents >= b2bPercents;
  const children = [
    {
      type: "rect",
      shape: {
        x: 0,
        y: showTop2Box ? 0 : b2bYDistance,
        width: containerWidth,
        height: containerHeight,
        r: 2,
      },
      style: {
        fill: "#1A1A25",
      },
    },
    {
      type: "rect",
      shape: {
        x: containerWidth - textWidth - T2B_TEXT_RIGHT_PADDING - iconHeight - 4,
        y: showTop2Box
          ? optionHeight - iconHeight / 2
          : optionHeight * b2bTextYDistance - iconHeight / 2,
        width: iconHeight,
        height: iconHeight,
        r: 1,
      },
      style: {
        fill: "#25B4C8",
      },
    },
    {
      type: "text",
      style: {
        text: `${showTop2Box ? "T2B" : "B2B"} ${
          showTop2Box ? t2bPercents : b2bPercents
        }%`,
        textFont: api.font({
          fontSize,
          fontWeight: 500,
          fontFamily: "Manrope, sans-serif",
        }),
        textAlign: "center",
        textVerticalAlign: "bottom",
        fill: "#fff",
      },
      position: [
        containerWidth - textWidth / 2 - T2B_TEXT_RIGHT_PADDING,
        showTop2Box
          ? optionHeight + fontSize / 2
          : optionHeight * b2bTextYDistance + fontSize / 2,
      ],
    },
  ];

  return {
    type: "group",
    children,
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
  // const imageOptionsSeries = withImageOptions
  //   ? {
  //       type: "custom",
  //       renderItem: (
  //         params: CustomSeriesRenderItemParams,
  //         api: CustomSeriesRenderItemAPI
  //       ) => renderOptionImage(params, api, Math.max(...data.values)),
  //       data: hasOverflow
  //         ? data.images?.slice(0, 4).map((image: string) => [0, 0, image])
  //         : data.images?.map((image: string) => [0, 0, image]),
  //       z: 1,
  //     }
  //   : undefined;
  const t2bSeries =
    showT2B && !withImage
      ? {
          type: "custom",
          renderItem: (params: any, api: any) =>
            renderT2B(params, api, data, CardSize.medium),
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
      bottom: ML_BAR_BOTTOM_PADDING,
      right: "50%",
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
        show: true,
      },
    },
    series: [
      {
        type: "custom",
        renderItem: (
          param: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) => renderBarMdLegendItem(param, api, showT2B, questionImageUrl),
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
  hasOverflow: boolean,
  showT2B: boolean,
  questionImageUrl: string,
  optionHeights: number[],
  optionsLines: number[],
  containerHeight: number
): ReactEChartsProps["option"] => {
  const t2bSeries = showT2B
    ? {
        type: "custom",
        renderItem: (params: any, api: any) =>
          renderT2B(params, api, data.values, CardSize.large, withImage),
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
      bottom: ML_BAR_BOTTOM_PADDING,
      right: "50%",
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
        show: true,
      },
    },
    tooltip: {
      trigger: "item",
      position: ["50%", "50%"],
    },
    series: [
      {
        type: "custom",
        // triggerLineEvent: true,
        tooltip: {
          // trigger: "item",
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
            optionHeights,
            optionsLines,
            containerHeight
          ),
        data: legendData,
      },
      {
        data,
        type: "bar",
        barWidth: 16,
        // barCategoryGap: 100,
        itemStyle: {
          color: "#25B4C8",
        },
      },
      t2bSeries as SeriesOption,
    ],
  };
};
