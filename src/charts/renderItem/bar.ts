import { breakWord, getQuestionImage, truncate } from "@/charts/utils";
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from "echarts";
import {
  MAX_PERCENTS_TEXT_WIDTH,
  chartBoxDimensions,
  legendTextStyles,
  QUESTION_IMAGE_SIDE,
  S_CHART_GRID_X_GAP,
  S_LABEL_X_GAP,
  ML_LABEL_X_GAP,
  ML_CHART_GRID_X_GAP,
  S_CHART_X_GAP,
} from "@/charts/constants/shared";
import {
  L_BAR_GRID_CHART_WIDTH,
  L_MAX_SYMBOLS_COUNT,
  L_MAX_SYMBOLS_WITH_QUESTION_IMG,
  L_MAX_SYMBOLS_WITH_QUESTION_IMG_AND_T2B,
  L_MAX_SYMBOLS_WITH_T2B,
  ML_BAR_CHART_HORIZONTAL_GAP,
  ML_Y_AXIS_LABEL_X_GAP,
  M_BAR_CHART_WIDTH,
  M_MAX_SYMBOLS_COUNT,
  M_MAX_SYMBOLS_WITH_QUESTION_IMG,
  M_MAX_SYMBOLS_WITH_T2B,
  S_BAR_CHART_WIDTH,
  S_MAX_SYMBOLS_COUNT,
} from "@/charts/constants/bar";
import { CardSize } from "../types";

export const renderBarSmLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  gridVerticalPadding: number
) => {
  const xAxisStartPx = param.coordSys.x;
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const percents = api.value(0);
  const label = api.value(2);
  const truncatedText = truncate(label as string, S_MAX_SYMBOLS_COUNT);
  const percentsX = xAxisStartPx + S_BAR_CHART_WIDTH + S_CHART_X_GAP;
  const labelX = percentsX + MAX_PERCENTS_TEXT_WIDTH + S_LABEL_X_GAP;
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
  };
};
export const renderBarMdLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  gridVerticalPadding: number,
  showT2B: boolean,
  questionImageUrl: string
) => {
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const percents = api.value(0);
  const label = api.value(2);
  const maxSymbols = !!questionImageUrl
    ? M_MAX_SYMBOLS_WITH_QUESTION_IMG
    : showT2B
    ? M_MAX_SYMBOLS_WITH_T2B
    : M_MAX_SYMBOLS_COUNT;
  const truncatedText = truncate(label as string, maxSymbols);
  const questionImage = questionImageUrl
    ? getQuestionImage(
        questionImageUrl,
        chartBoxDimensions.medium.height,
        CardSize.medium
      )
    : [];
  const percentsX = M_BAR_CHART_WIDTH + ML_CHART_GRID_X_GAP;
  const labelX = percentsX + MAX_PERCENTS_TEXT_WIDTH + ML_Y_AXIS_LABEL_X_GAP;
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
  containerHeight: number
) => {
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const percents = api.value(0);
  const label = api.value(2);
  const isT2BAndQuestionImgShown = showT2B && !!questionImageUrl;
  const isOnlyT2BShown = showT2B && !questionImageUrl;
  const isOnlyImageShown = !!questionImageUrl && !showT2B;
  const maxSymbols = isT2BAndQuestionImgShown
    ? L_MAX_SYMBOLS_WITH_QUESTION_IMG_AND_T2B
    : isOnlyT2BShown
    ? L_MAX_SYMBOLS_WITH_T2B
    : isOnlyImageShown
    ? L_MAX_SYMBOLS_WITH_QUESTION_IMG
    : L_MAX_SYMBOLS_COUNT;
  const truncatedText = truncate(label as string, maxSymbols);
  const questionImage = questionImageUrl
    ? getQuestionImage(questionImageUrl, containerHeight, CardSize.large)
    : [];
  console.log("*", L_BAR_GRID_CHART_WIDTH, ML_CHART_GRID_X_GAP);

  const percentsX = L_BAR_GRID_CHART_WIDTH + ML_CHART_GRID_X_GAP;
  const labelX = MAX_PERCENTS_TEXT_WIDTH + ML_LABEL_X_GAP + percentsX;
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

const ML_CARD_HORIZONTAL_PADDING = 20;
const L_CONTAINER_WIDTH = 992 - ML_CARD_HORIZONTAL_PADDING * 2;
const M_CONTAINER_WIDTH = 656 - ML_CARD_HORIZONTAL_PADDING * 2;
const T2B_TEXT_RIGHT_PADDING = 10;
export const renderT2B = function (
  params: any,
  api: any,
  values: any,
  gridVerticalPadding: number,
  size: any,
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
  let containerWidth =
    size === CardSize.large ? L_CONTAINER_WIDTH : M_CONTAINER_WIDTH;
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
