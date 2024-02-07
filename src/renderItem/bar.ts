import { chartBoxDimensions, legendTextStyles } from "@/constants";
import { getQuestionImage, truncate } from "@/utils";
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from "echarts";
import { MAX_PERCENTS_TEXT_WIDTH, TEXT_LINE_HEIGHT } from "@/constants";
import {
  ML_BAR_TEXT_MARGIN_BOTTOM,
  M_BAR_CHART_HORIZONTAL_GAP,
  M_MAX_SYMBOLS_COUNT,
  M_MAX_SYMBOLS_WITH_QUESTION_IMG,
  M_MAX_SYMBOLS_WITH_T2B,
  S_BAR_CHART_HORIZONTAL_GAP,
  S_BAR_CHART_WIDTH,
  S_MAX_SYMBOLS_COUNT,
} from "@/constants/bar";

export const renderBarSmLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  itemsLength: number
) => {
  const xAxisStartPx = param.coordSys.x;
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const percents = api.value(0);
  const label = api.value(2);
  const truncatedText = truncate(label as string, S_MAX_SYMBOLS_COUNT);
  const percentsX =
    xAxisStartPx + S_BAR_CHART_WIDTH + S_BAR_CHART_HORIZONTAL_GAP;
  const labelX = MAX_PERCENTS_TEXT_WIDTH + percentsX;
  const labelY = param.dataIndex * ySizePx;
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
        (param.coordSys as any).height,
        "medium"
      )
    : [];
  const percentsX =
    chartBoxDimensions.medium.width / 2 + M_BAR_CHART_HORIZONTAL_GAP;
  const labelX = MAX_PERCENTS_TEXT_WIDTH + percentsX;
  const labelY = param.dataIndex * ySizePx + 3.5;
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
