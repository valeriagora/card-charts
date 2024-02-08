import {
  breakWord,
  getLegendIconColor,
  truncate,
  getQuestionImage,
} from "@/charts/utils";
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from "echarts";
import {
  CIRCLE_ICON_MARGIN_RIGHT,
  CIRCLE_ICON_RADIUS,
  L_LEGEND_MAX_SYMBOLS_COUNT,
  L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT,
  MAX_PERCENTS_TEXT_WIDTH,
  M_LEGEND_MAX_SYMBOLS_COUNT,
  M_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT,
  OPTION_MARGIN_BOTTOM,
  TEXT_LINE_HEIGHT,
  pieColors,
  chartBoxDimensions,
  CHART_HORIZONTAL_GAP,
  legendTextStyles,
  CIRCLE_ICON_S_MARGIN_LEFT,
} from "@/charts/constants/shared";
export const renderSmLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  itemsLength: number
) => {
  const xAxisStartPx = param.coordSys.x;
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const iconColor = getLegendIconColor(pieColors, param.dataIndex);
  const percents = api.value(0);
  const label = api.value(2);
  const truncatedText = truncate(label as string, 11);
  const iconX = xAxisStartPx + CIRCLE_ICON_RADIUS + CIRCLE_ICON_S_MARGIN_LEFT;
  const iconY =
    (chartBoxDimensions.small.height - itemsLength * TEXT_LINE_HEIGHT) / 2 +
    TEXT_LINE_HEIGHT / 2 +
    param.dataIndex * TEXT_LINE_HEIGHT;
  const percentsX = iconX + CIRCLE_ICON_RADIUS + CIRCLE_ICON_MARGIN_RIGHT;
  const labelX = MAX_PERCENTS_TEXT_WIDTH + percentsX;
  const labelY =
    (chartBoxDimensions.small.height - itemsLength * TEXT_LINE_HEIGHT) / 2 +
    param.dataIndex * TEXT_LINE_HEIGHT;
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
      {
        type: "circle",
        shape: {
          cx: 0,
          cy: 0,
          r: 6,
        },
        style: {
          fill: iconColor,
        },
        position: [iconX, iconY],
      },
    ],
  };
};
export const renderMdLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  questionImageUrl: string,
  itemsLength: number
) => {
  const xAxisStartPx = param.coordSys.x;
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const iconColor = getLegendIconColor(pieColors, param.dataIndex);
  const percents = api.value(0);
  const label = api.value(2);
  const verticalPadding =
    (chartBoxDimensions.medium.height -
      itemsLength * TEXT_LINE_HEIGHT -
      (itemsLength - 1) * OPTION_MARGIN_BOTTOM) /
    2;
  const questionImage = questionImageUrl
    ? getQuestionImage(
        questionImageUrl,
        (param.coordSys as any).height,
        "medium"
      )
    : [];
  const iconY =
    verticalPadding +
    param.dataIndex * (TEXT_LINE_HEIGHT + OPTION_MARGIN_BOTTOM) +
    TEXT_LINE_HEIGHT / 2;
  const labelY = iconY - TEXT_LINE_HEIGHT / 2;
  const truncatedText = truncate(
    label as string,
    questionImageUrl
      ? M_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT
      : M_LEGEND_MAX_SYMBOLS_COUNT
  );
  const iconX = CHART_HORIZONTAL_GAP + xAxisStartPx + CIRCLE_ICON_RADIUS;
  const percentsX = iconX + CIRCLE_ICON_RADIUS + CIRCLE_ICON_MARGIN_RIGHT;
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
        position: [MAX_PERCENTS_TEXT_WIDTH + percentsX, labelY],
      },
      {
        type: "circle",
        shape: {
          cx: 0,
          cy: 0,
          r: 6,
        },
        style: {
          fill: iconColor,
        },
        position: [iconX, iconY],
      },
    ],
  };
};
export const renderLgLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  questionImageUrl: string,
  optionHeights: number[],
  optionsWithImagesLines: number[],
  containerHeight: number
) => {
  const itemsLength = optionHeights.length;
  const xAxisStartPx = param.coordSys.x;
  const [_, ySizePx] = api.size([1, 1]) as number[];
  const iconColor = getLegendIconColor(pieColors, param.dataIndex);
  const questionImage = questionImageUrl
    ? getQuestionImage(
        questionImageUrl,
        (param.coordSys as any).height,
        "large"
      )
    : [];
  const percents = api.value(0);
  const label = api.value(2);
  const labelChunks = breakWord(
    label as string,
    questionImageUrl
      ? L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT
      : L_LEGEND_MAX_SYMBOLS_COUNT
  );
  const prevOptionHeightsSum = optionHeights.reduce((total, current, idx) => {
    if (idx < param.dataIndex) {
      const optionMarginBottom =
        idx === optionHeights.length ? 0 : OPTION_MARGIN_BOTTOM;
      total += current + optionMarginBottom;
    }
    return total;
  }, 0);
  const optionsHeightSum =
    optionHeights.reduce((total, current) => total + current, 0) +
    (optionHeights.length - 1) * OPTION_MARGIN_BOTTOM;
  const chartVerticalPadding = (containerHeight - optionsHeightSum) / 2;
  const currentOptionVerticalPadding =
    (optionHeights[param.dataIndex] - TEXT_LINE_HEIGHT) / 2;
  let optionCenterY =
    itemsLength === 1
      ? prevOptionHeightsSum +
        (optionHeights[param.dataIndex] - OPTION_MARGIN_BOTTOM) / 2
      : chartVerticalPadding +
        prevOptionHeightsSum +
        currentOptionVerticalPadding +
        TEXT_LINE_HEIGHT / 2;
  const coverY =
    itemsLength === 1
      ? prevOptionHeightsSum +
        (optionHeights[param.dataIndex] - OPTION_MARGIN_BOTTOM) / 2 -
        TEXT_LINE_HEIGHT / 2
      : optionCenterY - TEXT_LINE_HEIGHT / 2;

  const labelY =
    itemsLength === 1
      ? ySizePx / 2 - (labelChunks.length * TEXT_LINE_HEIGHT) / 2
      : optionCenterY -
        (optionsWithImagesLines[param.dataIndex] * TEXT_LINE_HEIGHT) / 2;
  const iconX = xAxisStartPx + CHART_HORIZONTAL_GAP + CIRCLE_ICON_RADIUS;
  const percentsX = iconX + CIRCLE_ICON_RADIUS + CIRCLE_ICON_MARGIN_RIGHT;
  const labelX = MAX_PERCENTS_TEXT_WIDTH + percentsX;
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
        position: [
          percentsX,
          itemsLength === 1
            ? ySizePx / 2 - TEXT_LINE_HEIGHT / 2
            : optionCenterY - TEXT_LINE_HEIGHT / 2,
        ],
      },
      {
        type: "text",
        style: {
          text: labelChunks.join("\n"),
          ...legendTextStyles,
          fill: "#c8cad0",
        },
        position: [labelX, labelY],
      },
      {
        type: "circle",
        shape: {
          cx: 0,
          cy: 0,
          r: 6,
        },
        style: {
          fill: iconColor,
        },
        position: [iconX, itemsLength === 1 ? ySizePx / 2 : optionCenterY],
      },
    ],
  };
};
