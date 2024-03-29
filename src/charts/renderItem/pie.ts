import {
  breakWord,
  getLegendIconColor,
  truncate,
  getQuestionImage,
} from "@/charts/utils";
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
  CustomSeriesRenderItemReturn,
} from "echarts";
import {
  MAX_PERCENTS_TEXT_WIDTH,
  TEXT_LINE_HEIGHT,
  pieColors,
  legendTextStyles,
  CHART_CONTAINER_X_GAP_S,
  CHART_CONTAINER_X_GAP_ML,
  CHART_BOX_DIMENSIONS,
} from "@/charts/constants/shared";
import {
  PIE_MAX_SYMBOLS,
  PIE_LEGEND_ICON_RADIUS,
  PIE_LEGEND_ICON_X_PADDING,
  PIE_LEGEND_ITEM_TEXT_X_GAP,
  PIE_LEGEND_ITEM_Y_GAP_ML,
} from "../constants/pie";
import { CardSize, Breakpoint } from "../types";
export const renderSmLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI,
  itemsLength: number,
  breakpoint: Breakpoint
): CustomSeriesRenderItemReturn => {
  // @ts-ignore
  const xAxisStartPx = param.coordSys.x;
  const iconColor = getLegendIconColor(pieColors, param.dataIndex);
  const percents = api.value(0);
  const label = api.value(2);
  const truncatedText = truncate(
    label as string,
    PIE_MAX_SYMBOLS[breakpoint].small
  );
  const iconX =
    xAxisStartPx +
    CHART_CONTAINER_X_GAP_S +
    PIE_LEGEND_ICON_X_PADDING +
    PIE_LEGEND_ICON_RADIUS;
  const iconY =
    (CHART_BOX_DIMENSIONS[breakpoint].S.height -
      itemsLength * TEXT_LINE_HEIGHT) /
      2 +
    TEXT_LINE_HEIGHT / 2 +
    param.dataIndex * TEXT_LINE_HEIGHT;
  const percentsX =
    iconX +
    PIE_LEGEND_ICON_X_PADDING +
    PIE_LEGEND_ICON_RADIUS +
    PIE_LEGEND_ITEM_TEXT_X_GAP;
  const labelX =
    percentsX + MAX_PERCENTS_TEXT_WIDTH + PIE_LEGEND_ITEM_TEXT_X_GAP;
  const labelY =
    (CHART_BOX_DIMENSIONS[breakpoint].S.height -
      itemsLength * TEXT_LINE_HEIGHT) /
      2 +
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
      } as any,
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
  itemsLength: number,
  breakpoint: Breakpoint
): CustomSeriesRenderItemReturn => {
  // @ts-ignore
  const xAxisStartPx = param.coordSys.x;
  const iconColor = getLegendIconColor(pieColors, param.dataIndex);
  const percents = api.value(0);
  const label = api.value(2);
  const verticalPadding =
    (CHART_BOX_DIMENSIONS[breakpoint].M.height -
      itemsLength * TEXT_LINE_HEIGHT -
      (itemsLength - 1) * PIE_LEGEND_ITEM_Y_GAP_ML) /
    2;
  const questionImage = questionImageUrl
    ? getQuestionImage(
        questionImageUrl,
        (param.coordSys as any).height,
        CardSize.medium,
        breakpoint
      )
    : [];
  const iconY =
    verticalPadding +
    param.dataIndex * (TEXT_LINE_HEIGHT + PIE_LEGEND_ITEM_Y_GAP_ML) +
    TEXT_LINE_HEIGHT / 2;
  const labelY = iconY - TEXT_LINE_HEIGHT / 2;
  const maxSymbolsWithoutOptionImgs =
    PIE_MAX_SYMBOLS[breakpoint].medium.withoutOptionImgs;
  const truncatedText = truncate(
    label as string,
    questionImageUrl
      ? maxSymbolsWithoutOptionImgs.withQuestionImg
      : maxSymbolsWithoutOptionImgs.default
  );
  const iconX =
    xAxisStartPx +
    CHART_CONTAINER_X_GAP_ML +
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
  containerHeight: number,
  breakpoint: Breakpoint
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
        CardSize.large,
        breakpoint
      )
    : [];
  const percents = api.value(0);
  const label = api.value(2);
  const maxSymbolsWithoutOptionImgs =
    PIE_MAX_SYMBOLS[breakpoint].large.withoutOptionImgs;
  const labelChunks = breakWord(
    label as string,
    questionImageUrl
      ? maxSymbolsWithoutOptionImgs.withQuestionImg
      : maxSymbolsWithoutOptionImgs.default
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
    (optionHeights[param.dataIndex] - TEXT_LINE_HEIGHT) / 2;
  let optionCenterY =
    itemsLength === 1
      ? prevOptionHeightsSum +
        (optionHeights[param.dataIndex] - PIE_LEGEND_ITEM_Y_GAP_ML) / 2
      : chartVerticalPadding +
        prevOptionHeightsSum +
        currentOptionVerticalPadding +
        TEXT_LINE_HEIGHT / 2;
  const labelY =
    itemsLength === 1
      ? ySizePx / 2 - (labelChunks.length * TEXT_LINE_HEIGHT) / 2
      : optionCenterY -
        (optionsWithImagesLines[param.dataIndex] * TEXT_LINE_HEIGHT) / 2;
  const iconX =
    xAxisStartPx +
    CHART_CONTAINER_X_GAP_ML +
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
