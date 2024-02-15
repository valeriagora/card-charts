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
  MAX_PERCENTS_TEXT_WIDTH,
  OPTION_IMAGE_MARGIN_RIGHT,
  OPTION_IMAGE_SIDE,
  RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
  TEXT_LINE_HEIGHT,
  chartBoxDimensions,
  CHART_CONTAINER_X_GAP_ML,
  legendTextStyles,
  pieColors,
} from "@/charts/constants/shared";
import {
  PIE_LEGEND_ICON_X_PADDING,
  PIE_LEGEND_ICON_RADIUS,
  PIE_LEGEND_ITEM_TEXT_X_GAP,
  PIE_LEGEND_ITEM_Y_GAP_ML,
  pieMaxSymbols,
} from "@/charts/constants/pie";
import { CardSize } from "../types";

export const renderMdLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  questionImageUrl: string,
  itemsLength: number
) => {
  // @ts-ignore
  const xAxisStartPx = param.coordSys.x;
  const iconColor = getLegendIconColor(pieColors, param.dataIndex);
  const percents = api.value(0);
  const label = api.value(2);
  const imageOptionUrl = api.value(3);
  const verticalPadding =
    (chartBoxDimensions.medium.height -
      itemsLength * OPTION_IMAGE_SIDE -
      (itemsLength - 1) * PIE_LEGEND_ITEM_Y_GAP_ML) /
    2;
  const questionImage = questionImageUrl
    ? getQuestionImage(
        questionImageUrl,
        (param.coordSys as any).height,
        CardSize.medium
      )
    : [];
  const coverY =
    verticalPadding +
    param.dataIndex * (OPTION_IMAGE_SIDE + PIE_LEGEND_ITEM_Y_GAP_ML);
  const iconY =
    verticalPadding +
    param.dataIndex * (OPTION_IMAGE_SIDE + PIE_LEGEND_ITEM_Y_GAP_ML) +
    OPTION_IMAGE_SIDE / 2;
  const labelY = iconY - TEXT_LINE_HEIGHT / 2;
  const maxSymbolsWithOptionImgs = pieMaxSymbols.medium.withOptionImgs;
  const truncatedText = truncate(
    label as string,
    questionImageUrl
      ? maxSymbolsWithOptionImgs.withQuestionImg
      : maxSymbolsWithOptionImgs.default
  );
  const coverX = xAxisStartPx + CHART_CONTAINER_X_GAP_ML;
  const iconX =
    coverX +
    OPTION_IMAGE_SIDE +
    OPTION_IMAGE_MARGIN_RIGHT +
    PIE_LEGEND_ICON_X_PADDING +
    PIE_LEGEND_ICON_RADIUS;
  const percentsX =
    iconX +
    PIE_LEGEND_ICON_X_PADDING +
    PIE_LEGEND_ICON_RADIUS +
    PIE_LEGEND_ITEM_TEXT_X_GAP;
  const labelX =
    percentsX + MAX_PERCENTS_TEXT_WIDTH + PIE_LEGEND_ITEM_TEXT_X_GAP;
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
          image: imageOptionUrl,
          y: 1,
          width: OPTION_IMAGE_SIDE,
          height: OPTION_IMAGE_SIDE,
        },
        position: [coverX, coverY - 1],
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
  // @ts-ignore
  const xAxisStartPx = param.coordSys.x;
  const [_, ySizePx] = api.size!([1, 1]) as number[];
  const iconColor = getLegendIconColor(pieColors, param.dataIndex);
  const questionImage = questionImageUrl
    ? getQuestionImage(
        questionImageUrl,
        (param.coordSys as any).height,
        CardSize.large
      )
    : [];
  const percents = api.value(0);
  const label = api.value(2);
  const imageOptionUrl = api.value(3);
  const maxSymbolsWithOptionImgs = pieMaxSymbols.large.withOptionImgs;
  const labelChunks = breakWord(
    label as string,
    questionImageUrl
      ? maxSymbolsWithOptionImgs.withQuestionImg
      : maxSymbolsWithOptionImgs.default
  );
  const prevOptionHeightsSum = optionHeights.reduce((total, current, idx) => {
    if (idx < param.dataIndex) {
      const optionMarginBottom =
        idx === optionHeights.length ? 0 : PIE_LEGEND_ITEM_Y_GAP_ML;
      total += current + optionMarginBottom;
    }
    return total;
  }, 0);
  const optionsHeightSum =
    optionHeights.reduce((total, current) => total + current, 0) +
    (optionHeights.length - 1) * PIE_LEGEND_ITEM_Y_GAP_ML;
  const chartVerticalPadding = (containerHeight - optionsHeightSum) / 2;
  const currentOptionVerticalPadding =
    (optionHeights[param.dataIndex] - OPTION_IMAGE_SIDE) / 2;
  let optionCenterY =
    itemsLength === 1
      ? prevOptionHeightsSum +
        (optionHeights[param.dataIndex] - PIE_LEGEND_ITEM_Y_GAP_ML) / 2
      : chartVerticalPadding +
        prevOptionHeightsSum +
        currentOptionVerticalPadding +
        OPTION_IMAGE_SIDE / 2;
  const coverY =
    itemsLength === 1
      ? prevOptionHeightsSum +
        (optionHeights[param.dataIndex] - PIE_LEGEND_ITEM_Y_GAP_ML) / 2 -
        OPTION_IMAGE_SIDE / 2
      : optionCenterY - OPTION_IMAGE_SIDE / 2;
  const labelY =
    itemsLength === 1
      ? ySizePx / 2 - (labelChunks.length * TEXT_LINE_HEIGHT) / 2
      : optionCenterY -
        (optionsWithImagesLines[param.dataIndex] * TEXT_LINE_HEIGHT) / 2;
  const coverX = xAxisStartPx + CHART_CONTAINER_X_GAP_ML;
  const iconX =
    coverX +
    OPTION_IMAGE_SIDE +
    OPTION_IMAGE_MARGIN_RIGHT +
    PIE_LEGEND_ICON_X_PADDING +
    PIE_LEGEND_ICON_RADIUS;
  const percentsX =
    iconX +
    PIE_LEGEND_ICON_X_PADDING +
    PIE_LEGEND_ICON_RADIUS +
    PIE_LEGEND_ITEM_TEXT_X_GAP;
  const labelX =
    percentsX + MAX_PERCENTS_TEXT_WIDTH + PIE_LEGEND_ITEM_TEXT_X_GAP;
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
          x: coverX,
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
          coverX,
          itemsLength === 1
            ? ySizePx / 2 - OPTION_IMAGE_SIDE / 2 - 1
            : coverY - 1,
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
