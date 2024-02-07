import { chartBoxDimensions, legendTextStyles, pieColors } from "@/constants";
import { getLegendIconColor, truncate } from "@/utils";
import {
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from "echarts";
import {
  CIRCLE_ICON_MARGIN_RIGHT,
  CIRCLE_ICON_RADIUS,
  CIRCLE_ICON_S_MARGIN_LEFT,
  MAX_PERCENTS_TEXT_WIDTH,
  TEXT_LINE_HEIGHT,
} from "@/constants";

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
