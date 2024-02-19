import { breakWord, getQuestionImage, truncate } from "@/charts/utils";
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
  CustomSeriesRenderItemReturn,
} from "echarts";
import {
  MAX_PERCENTS_TEXT_WIDTH,
  legendTextStyles,
  OPTION_IMAGE_SIDE,
  RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
  OPTION_IMAGE_MARGIN_RIGHT,
  CHART_CONTAINER_X_GAP_ML,
  CHART_BOX_DIMENSIONS,
  CHART_WIDTHS,
} from "@/charts/constants/shared";
import {
  BAR_CHART_CONTAINER_PADDING_BOTTOM_ML,
  BAR_Y_AXIS_TEXT_X_GAP_ML,
  BAR_MAX_SYMBOLS_COUNT,
  BAR_Y_AXISES_WIDTHS,
} from "@/charts/constants/bar";
import { CardSize, IBreakpoint } from "../types";

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
  const optionImageUrl = api.value(3);
  const maxSymbolsCount =
    BAR_MAX_SYMBOLS_COUNT[breakpoint].medium.withOptionImgs;
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
  const coverX = BAR_Y_AXISES_WIDTHS[breakpoint].M + CHART_CONTAINER_X_GAP_ML;
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
        position: [coverX, coverY - 1],
      },
    ],
  };
};
export const renderBarLgLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  showT2B: boolean,
  questionImageUrl: string,
  containerHeight: number,
  breakpoint: IBreakpoint
): CustomSeriesRenderItemReturn => {
  const [_, ySizePx] = api.size!([1, 1]) as number[];
  const percents = api.value(0);
  const label = api.value(2);
  const optionImageUrl = api.value(3);
  const isT2BAndQuestionImgShown = showT2B && !!questionImageUrl;
  const isOnlyT2BShown = showT2B && !questionImageUrl;
  const isOnlyImageShown = !!questionImageUrl && !showT2B;
  const maxSymbolsCount =
    BAR_MAX_SYMBOLS_COUNT[breakpoint].large.withOptionImgs;
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
  const coverX = CHART_WIDTHS[breakpoint].L + CHART_CONTAINER_X_GAP_ML;
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
        position: [coverX, coverY - 1],
      },
    ],
  };
};
