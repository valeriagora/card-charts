import { breakWord, getQuestionImage, truncate } from "@/charts/utils";
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from "echarts";
import {
  MAX_PERCENTS_TEXT_WIDTH,
  chartBoxDimensions,
  legendTextStyles,
  OPTION_IMAGE_SIDE,
  RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
  OPTION_IMAGE_MARGIN_RIGHT,
  CHART_CONTAINER_X_GAP_ML,
  CHART_WIDTH_M,
  CHART_WIDTH_L,
} from "@/charts/constants/shared";
import {
  BAR_CHART_CONTAINER_PADDING_BOTTOM_ML,
  M_MAX_SYMBOLS_WITH_OPTION_IMG_COUNT,
  M_MAX_SYMBOLS_WITH_QUESTION_AND_OPTION_IMG,
  M_MAX_SYMBOLS_WITH_T2B_WITH_OPTION_IMG,
  L_MAX_SYMBOLS_WITH_OPTION_IMG,
  L_MAX_SYMBOLS_WITH_QUESTION_AND_OPTION_IMG,
  L_MAX_SYMBOLS_WITH_T2B_WITH_OPTION_IMG,
  L_MAX_SYMBOLS_WITH_QUESTION_AND_OPTION_IMG_AND_T2B,
  BAR_Y_AXIS_TEXT_X_GAP_ML,
  barMaxSymbolsCount,
} from "@/charts/constants/bar";
import { CardSize } from "../types";

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
  const optionImageUrl = api.value(3);
  const maxSymbolsCount = barMaxSymbolsCount.medium.withOptionImgs;
  const maxSymbols = !!questionImageUrl
    ? maxSymbolsCount.withQuestionImg
    : showT2B
    ? maxSymbolsCount.withT2B
    : maxSymbolsCount.default;
  const truncatedText = truncate(label as string, maxSymbols);
  const questionImage = questionImageUrl
    ? getQuestionImage(
        questionImageUrl,
        chartBoxDimensions.medium.height,
        CardSize.medium
      )
    : [];
  const coverX = CHART_WIDTH_M + CHART_CONTAINER_X_GAP_ML;
  const percentsX = coverX + OPTION_IMAGE_SIDE + OPTION_IMAGE_MARGIN_RIGHT;
  const labelX = percentsX + MAX_PERCENTS_TEXT_WIDTH + BAR_Y_AXIS_TEXT_X_GAP_ML;
  const labelY =
    gridVerticalPadding +
    param.dataIndex * ySizePx +
    (ySizePx - BAR_CHART_CONTAINER_PADDING_BOTTOM_ML) / 2 -
    2;
  const coverY =
    gridVerticalPadding +
    param.dataIndex * ySizePx +
    (ySizePx - OPTION_IMAGE_SIDE) / 2;
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
      {
        type: RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
        shape: {
          width: OPTION_IMAGE_SIDE,
          height: OPTION_IMAGE_SIDE,
          x: coverX,
          y: coverY,
        },
        style: {
          fill: "#1a1a25",
        },
      },
      {
        type: "image",
        style: {
          x: 0,
          image: optionImageUrl,
          y: 1,
          width: OPTION_IMAGE_SIDE,
          height: OPTION_IMAGE_SIDE,
        },
        position: [coverX, coverY],
      },
    ],
  };
};
export const renderBarLgLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  showT2B: boolean,
  questionImageUrl: string,
  containerHeight: number
) => {
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const percents = api.value(0);
  const label = api.value(2);
  const optionImageUrl = api.value(3);
  const isT2BAndQuestionImgShown = showT2B && !!questionImageUrl;
  const isOnlyT2BShown = showT2B && !questionImageUrl;
  const isOnlyImageShown = !!questionImageUrl && !showT2B;
  const maxSymbolsCount = barMaxSymbolsCount.large.withOptionImgs;
  const maxSymbols = isT2BAndQuestionImgShown
    ? maxSymbolsCount.withQuestionImgAndT2B
    : isOnlyT2BShown
    ? maxSymbolsCount.withT2B
    : isOnlyImageShown
    ? maxSymbolsCount.withQuestionImg
    : maxSymbolsCount.default;
  const truncatedText = truncate(label as string, maxSymbols);
  const questionImage = questionImageUrl
    ? getQuestionImage(questionImageUrl, containerHeight, CardSize.large)
    : [];
  const coverX = CHART_WIDTH_L + CHART_CONTAINER_X_GAP_ML;
  const percentsX = coverX + OPTION_IMAGE_SIDE + OPTION_IMAGE_MARGIN_RIGHT;
  const labelX = percentsX + MAX_PERCENTS_TEXT_WIDTH + BAR_Y_AXIS_TEXT_X_GAP_ML;
  const labelY = param.dataIndex * ySizePx + (ySizePx - 16) / 2 - 2;
  const coverY = param.dataIndex * ySizePx + (ySizePx - OPTION_IMAGE_SIDE) / 2;
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
      {
        type: RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
        shape: {
          width: OPTION_IMAGE_SIDE,
          height: OPTION_IMAGE_SIDE,
          x: coverX,
          y: coverY,
        },
        style: {
          fill: "#1a1a25",
        },
      },
      {
        type: "image",
        style: {
          x: 0,
          image: optionImageUrl,
          y: 1,
          width: OPTION_IMAGE_SIDE,
          height: OPTION_IMAGE_SIDE,
        },
        position: [coverX, coverY],
      },
    ],
  };
};
