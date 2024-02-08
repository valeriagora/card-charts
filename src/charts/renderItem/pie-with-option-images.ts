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
  L_LEGEND_IMAGE_OPTIONS_MAX_SYMBOLS_COUNT,
  L_LEGEND_IMAGE_OPTIONS_WITH_IMAGE_MAX_SYMBOLS_COUNT,
  MAX_PERCENTS_TEXT_WIDTH,
  M_LEGEND_IMAGE_OPTIONS_MAX_SYMBOLS_COUNT,
  M_LEGEND_IMAGE_OPTIONS_WITH_IMAGE_MAX_SYMBOLS_COUNT,
  OPTION_MARGIN_BOTTOM,
  OPTION_IMAGE_MARGIN_RIGHT,
  OPTION_IMAGE_SIDE,
  RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
  TEXT_LINE_HEIGHT,
  chartBoxDimensions,
  CHART_HORIZONTAL_GAP,
  legendTextStyles,
  pieColors,
} from "@/charts/constants/shared";

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
  const imageOptionUrl = api.value(3);
  const verticalPadding =
    (chartBoxDimensions.medium.height -
      itemsLength * OPTION_IMAGE_SIDE -
      (itemsLength - 1) * OPTION_MARGIN_BOTTOM) /
    2;
  const questionImage = questionImageUrl
    ? getQuestionImage(
        questionImageUrl,
        (param.coordSys as any).height,
        "medium"
      )
    : [];
  const coverY =
    verticalPadding +
    param.dataIndex * (OPTION_IMAGE_SIDE + OPTION_MARGIN_BOTTOM);
  const iconY =
    verticalPadding +
    param.dataIndex * (OPTION_IMAGE_SIDE + OPTION_MARGIN_BOTTOM) +
    OPTION_IMAGE_SIDE / 2;
  const labelY = iconY - TEXT_LINE_HEIGHT / 2;
  const truncatedText = truncate(
    label as string,
    questionImageUrl
      ? M_LEGEND_IMAGE_OPTIONS_WITH_IMAGE_MAX_SYMBOLS_COUNT
      : M_LEGEND_IMAGE_OPTIONS_MAX_SYMBOLS_COUNT
  );

  const iconX =
    xAxisStartPx +
    CHART_HORIZONTAL_GAP +
    OPTION_IMAGE_SIDE +
    OPTION_IMAGE_MARGIN_RIGHT +
    CIRCLE_ICON_RADIUS;
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
        type: RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
        shape: {
          width: OPTION_IMAGE_SIDE,
          height: OPTION_IMAGE_SIDE,
          x: xAxisStartPx,
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
          image: imageOptionUrl,
          y: 1,
          width: OPTION_IMAGE_SIDE,
          height: OPTION_IMAGE_SIDE,
        },
        position: [xAxisStartPx, coverY],
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
  const imageOptionUrl = api.value(3);
  const labelChunks = breakWord(
    label as string,
    questionImageUrl
      ? L_LEGEND_IMAGE_OPTIONS_WITH_IMAGE_MAX_SYMBOLS_COUNT
      : L_LEGEND_IMAGE_OPTIONS_MAX_SYMBOLS_COUNT
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
    (optionHeights[param.dataIndex] - OPTION_IMAGE_SIDE) / 2;
  let optionCenterY =
    itemsLength === 1
      ? prevOptionHeightsSum +
        (optionHeights[param.dataIndex] - OPTION_MARGIN_BOTTOM) / 2
      : chartVerticalPadding +
        prevOptionHeightsSum +
        currentOptionVerticalPadding +
        OPTION_IMAGE_SIDE / 2;
  const coverY =
    itemsLength === 1
      ? prevOptionHeightsSum +
        (optionHeights[param.dataIndex] - OPTION_MARGIN_BOTTOM) / 2 -
        OPTION_IMAGE_SIDE / 2
      : optionCenterY - OPTION_IMAGE_SIDE / 2;

  const labelY =
    itemsLength === 1
      ? ySizePx / 2 - (labelChunks.length * TEXT_LINE_HEIGHT) / 2
      : optionCenterY -
        (optionsWithImagesLines[param.dataIndex] * TEXT_LINE_HEIGHT) / 2;
  const iconX =
    xAxisStartPx +
    CHART_HORIZONTAL_GAP +
    OPTION_IMAGE_SIDE +
    OPTION_IMAGE_MARGIN_RIGHT +
    CIRCLE_ICON_RADIUS;
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
        type: RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
        shape: {
          width: OPTION_IMAGE_SIDE,
          height: OPTION_IMAGE_SIDE,
          x: xAxisStartPx,
          y: itemsLength === 1 ? ySizePx / 2 - OPTION_IMAGE_SIDE / 2 : coverY,
        },
        style: {
          fill: "#1a1a25",
        },
      },
      {
        type: "image",
        style: {
          x: 0,
          image: imageOptionUrl,
          y: 1,
          width: OPTION_IMAGE_SIDE,
          height: OPTION_IMAGE_SIDE,
        },
        position: [
          xAxisStartPx,
          itemsLength === 1 ? ySizePx / 2 - OPTION_IMAGE_SIDE / 2 : coverY,
        ],
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
