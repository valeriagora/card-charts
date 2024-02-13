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
  OPTION_MARGIN_BOTTOM,
  OPTION_IMAGE_SIDE,
  RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
  OPTION_IMAGE_MARGIN_RIGHT,
} from "@/charts/constants/shared";
import {
  L_BAR_GRID_CHART_WIDTH,
  L_MAX_SYMBOLS_COUNT,
  L_MAX_SYMBOLS_WITH_QUESTION_IMG,
  L_MAX_SYMBOLS_WITH_QUESTION_IMG_AND_T2B,
  L_MAX_SYMBOLS_WITH_T2B,
  ML_GRID_BOTTOM_PADDING,
  ML_BAR_CHART_HORIZONTAL_GAP,
  M_MAX_SYMBOLS_WITH_OPTION_IMG_COUNT,
  M_MAX_SYMBOLS_WITH_QUESTION_AND_OPTION_IMG,
  M_MAX_SYMBOLS_WITH_T2B_WITH_OPTION_IMG,
  M_BAR_Y_PADDINGS,
  L_MAX_SYMBOLS_WITH_OPTION_IMG,
  L_MAX_SYMBOLS_WITH_QUESTION_AND_OPTION_IMG,
  L_MAX_SYMBOLS_WITH_T2B_WITH_OPTION_IMG,
  L_MAX_SYMBOLS_WITH_QUESTION_AND_OPTION_IMG_AND_T2B,
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
  const maxSymbols = !!questionImageUrl
    ? M_MAX_SYMBOLS_WITH_QUESTION_AND_OPTION_IMG
    : showT2B
    ? M_MAX_SYMBOLS_WITH_T2B_WITH_OPTION_IMG
    : M_MAX_SYMBOLS_WITH_OPTION_IMG_COUNT;
  const truncatedText = truncate(label as string, maxSymbols);
  const questionImage = questionImageUrl
    ? getQuestionImage(
        questionImageUrl,
        chartBoxDimensions.medium.height,
        "medium"
      )
    : [];
  const coverX =
    chartBoxDimensions.medium.width / 2 + ML_BAR_CHART_HORIZONTAL_GAP;
  const percentsX = coverX + OPTION_IMAGE_SIDE + OPTION_IMAGE_MARGIN_RIGHT;
  const labelX = MAX_PERCENTS_TEXT_WIDTH + percentsX;
  const labelY =
    gridVerticalPadding +
    param.dataIndex * ySizePx +
    (ySizePx - ML_GRID_BOTTOM_PADDING) / 2 -
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
  const maxSymbols = isT2BAndQuestionImgShown
    ? L_MAX_SYMBOLS_WITH_QUESTION_AND_OPTION_IMG_AND_T2B
    : isOnlyT2BShown
    ? L_MAX_SYMBOLS_WITH_T2B_WITH_OPTION_IMG
    : isOnlyImageShown
    ? L_MAX_SYMBOLS_WITH_QUESTION_AND_OPTION_IMG
    : L_MAX_SYMBOLS_WITH_OPTION_IMG;
  const truncatedText = truncate(label as string, maxSymbols);
  const questionImage = questionImageUrl
    ? getQuestionImage(questionImageUrl, containerHeight, CardSize.large)
    : [];
  const coverX = L_BAR_GRID_CHART_WIDTH + ML_BAR_CHART_HORIZONTAL_GAP;
  const percentsX = coverX + OPTION_IMAGE_SIDE + ML_BAR_CHART_HORIZONTAL_GAP;
  const labelX = MAX_PERCENTS_TEXT_WIDTH + percentsX;
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
