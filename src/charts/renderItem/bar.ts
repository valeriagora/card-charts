import { getQuestionImage, truncate } from "@/charts/utils";
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
  CustomSeriesRenderItemReturn,
} from "echarts";
import {
  MAX_PERCENTS_TEXT_WIDTH,
  legendTextStyles,
  QUESTION_IMAGE_SIDE,
  CHART_CONTAINER_X_GAP_S,
  CHART_CONTAINER_X_GAP_ML,
  CHART_BOX_DIMENSIONS,
  CHART_WIDTHS,
} from "@/charts/constants/shared";
import {
  BAR_MAX_SYMBOLS_COUNT,
  BAR_Y_AXIS_TEXT_X_GAP_S,
  BAR_Y_AXIS_TEXT_X_GAP_ML,
  T2B_TEXT_RIGHT_PADDING,
} from "@/charts/constants/bar";
import { CardSize, IBreakpoint } from "../types";

export const renderBarSmLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  gridVerticalPadding: number,
  breakpoint: IBreakpoint
): CustomSeriesRenderItemReturn => {
  // @ts-ignore
  const xAxisStartPx: number = param.coordSys.x;
  const [_, ySizePx] = api.size!([1, 1]) as number[];
  const percents = api.value(0);
  const label = api.value(2);
  const truncatedText = truncate(
    label as string,
    BAR_MAX_SYMBOLS_COUNT[breakpoint].small
  );
  const percentsX =
    xAxisStartPx + CHART_WIDTHS[breakpoint].S + CHART_CONTAINER_X_GAP_S;
  const labelX = percentsX + MAX_PERCENTS_TEXT_WIDTH + BAR_Y_AXIS_TEXT_X_GAP_S;
  const labelY = param.dataIndex * ySizePx + gridVerticalPadding;
  return {
    type: "group",
    silent: true,
    children: [
      {
        type: "text",
        style: {
          text: `${percents}%`,
          ...legendTextStyles,
          fill: "#fff",
        },
        position: [percentsX, labelY],
      },
      {
        type: "text",
        style: {
          text: truncatedText,
          ...legendTextStyles,
          fill: "#c8cad0",
        },
        position: [labelX, labelY],
      },
    ],
  } as any;
};
export const renderBarMdLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  gridVerticalPadding: number,
  showT2B: boolean,
  questionImageUrl: string,
  breakpoint: IBreakpoint
): CustomSeriesRenderItemReturn => {
  const [_, ySizePx] = api.size!([1, 1]) as number[];
  const percents = api.value(0);
  const label = api.value(2);
  const maxSymbolsCount =
    BAR_MAX_SYMBOLS_COUNT[breakpoint].medium.withoutOptionImgs;
  const maxSymbols = !!questionImageUrl
    ? maxSymbolsCount.withQuestionImg
    : showT2B
    ? maxSymbolsCount.withT2B
    : maxSymbolsCount.default;
  const truncatedText = truncate(label as string, maxSymbols);
  const questionImage = questionImageUrl
    ? getQuestionImage(
        questionImageUrl,
        CHART_BOX_DIMENSIONS[breakpoint].M.height,
        CardSize.medium,
        breakpoint
      )
    : [];
  const percentsX = CHART_WIDTHS[breakpoint].M + CHART_CONTAINER_X_GAP_ML;
  const labelX = percentsX + MAX_PERCENTS_TEXT_WIDTH + BAR_Y_AXIS_TEXT_X_GAP_ML;
  const labelY =
    gridVerticalPadding + param.dataIndex * ySizePx + (ySizePx - 16) / 2 - 2;
  return {
    type: "group",
    silent: true,
    children: [
      ...questionImage,
      {
        type: "text",
        style: {
          text: `${percents}%`,
          ...legendTextStyles,
          fill: "#fff",
        },
        position: [percentsX, labelY],
      },
      {
        type: "text",
        style: {
          text: truncatedText,
          ...legendTextStyles,
          fill: "#c8cad0",
        },
        position: [labelX, labelY],
      },
    ],
  };
};
export const renderBarLgLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  showT2B: boolean,
  questionImageUrl: string,
  gridVerticalPadding: number,
  containerHeight: number,
  breakpoint: IBreakpoint
): CustomSeriesRenderItemReturn => {
  const [_, ySizePx] = api.size!([1, 1]) as number[];
  const percents = api.value(0);
  const label = api.value(2);
  const isT2BAndQuestionImgShown = showT2B && !!questionImageUrl;
  const isOnlyT2BShown = showT2B && !questionImageUrl;
  const isOnlyImageShown = !!questionImageUrl && !showT2B;
  const maxSymbolsCount =
    BAR_MAX_SYMBOLS_COUNT[breakpoint].large.withoutOptionImgs;
  const maxSymbols = isT2BAndQuestionImgShown
    ? maxSymbolsCount.withQuestionImgAndT2B
    : isOnlyT2BShown
    ? maxSymbolsCount.withT2B
    : isOnlyImageShown
    ? maxSymbolsCount.withQuestionImg
    : maxSymbolsCount.default;
  const truncatedText = truncate(label as string, maxSymbols);
  const questionImage = questionImageUrl
    ? getQuestionImage(
        questionImageUrl,
        containerHeight,
        CardSize.large,
        breakpoint
      )
    : [];
  const percentsX = CHART_WIDTHS[breakpoint].L + CHART_CONTAINER_X_GAP_ML;
  const labelX = percentsX + MAX_PERCENTS_TEXT_WIDTH + BAR_Y_AXIS_TEXT_X_GAP_ML;
  const labelY =
    gridVerticalPadding + param.dataIndex * ySizePx + (ySizePx - 16) / 2 - 2;
  return {
    type: "group",
    silent: true,
    children: [
      ...questionImage,
      {
        type: "text",
        style: {
          text: `${percents}%`,
          ...legendTextStyles,
          fill: "#fff",
        },
        position: [percentsX, labelY],
      },
      {
        type: "text",
        style: {
          text: truncatedText,
          ...legendTextStyles,
          fill: "#c8cad0",
        },
        position: [labelX, labelY],
      },
    ],
  };
};

export const renderT2B = function (
  params: any,
  api: any,
  values: any,
  gridVerticalPadding: number,
  size: CardSize,
  breakpoint: IBreakpoint,
  withImage = false
) {
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const hasOverflow = size === CardSize.medium ? values.length > 11 : false;
  const data = hasOverflow ? values.slice(0, 11) : values;
  const firstValue = data[0].value;
  const secondValue = data[1]?.value ?? 0;
  const t2bPercents = firstValue + secondValue;
  const penultimateValue = data[data.length - 2]?.value ?? 0;
  const lastValue = data[data.length - 1]?.value ?? 0;
  let b2bPercents = lastValue + penultimateValue;
  let containerWidth = CHART_BOX_DIMENSIONS[breakpoint][size].width;
  const optionHeight = size === CardSize.large ? ySizePx : ySizePx;
  const containerHeight = optionHeight * 2;
  const textWidth = 60;
  const iconHeight = 8;
  const fontSize = 14;
  if (withImage && size === CardSize.large) {
    const qImgLeftMargin = 4;
    containerWidth -= QUESTION_IMAGE_SIDE + qImgLeftMargin;
  }
  const t2bYDistance = gridVerticalPadding;
  const b2bYDistance = gridVerticalPadding + (data.length - 2) * optionHeight;
  const b2bTextYDistance = data.length - 1;
  const showTop2Box = t2bPercents >= b2bPercents;
  const children = [
    {
      type: "rect",
      shape: {
        x: 0,
        y: showTop2Box ? t2bYDistance : b2bYDistance,
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
          ? gridVerticalPadding + optionHeight - iconHeight / 2
          : gridVerticalPadding +
            optionHeight * b2bTextYDistance -
            iconHeight / 2,
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
          ? gridVerticalPadding + optionHeight + fontSize / 2
          : gridVerticalPadding +
            optionHeight * b2bTextYDistance +
            fontSize / 2,
      ],
    },
  ];

  return {
    type: "group",
    children,
  };
};
