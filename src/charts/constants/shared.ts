import { IChartOptionsOverflow } from "@/charts/types";

export const chartBoxDimensions = {
  small: {
    width: 280,
    height: 120,
  },
  medium: {
    width: 616,
    height: 336,
  },
  large: {
    width: 952,
    height: "auto",
  },
};
export const pieColors = [
  "#25B4C8",
  "#EF9B91",
  "#39519B",
  "#9ECC7F",
  "#F9DE82",
  "#B395FE",
  "#D88ADA",
  "#7EAEF5",
  "#E5975F",
  "#B5B7CA",
];
// y-axis(bar) or legend item percents text max width
export const MAX_PERCENTS_TEXT_WIDTH = 32;
// images
export const IMAGE_BG_RADIUS = 8;
export const QUESTION_IMAGE_SIDE = 120;
export const OPTION_IMAGE_SIDE = 72;
export const OPTION_IMAGE_MARGIN_RIGHT = 8;
export const TEXT_LINE_HEIGHT = 20;
// chart widths
export const CHART_WIDTH_S = 120;
export const CHART_WIDTH_M = 304;
export const CHART_WIDTH_L = 472;
// chart container horizontal gaps
export const CHART_CONTAINER_X_GAP_S = 12;
export const CHART_CONTAINER_X_GAP_ML = 8;
// custom shape
export const RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE =
  "RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE";
export const MIN_CHART_HEIGHT_L = 188;
export const chartOptionsOverflow: IChartOptionsOverflow = {
  small: { default: 4, withImgOptions: 4 },
  medium: {
    default: 11,
    withImgOptions: 4,
  },
};
export const legendTextStyles = {
  lineHeight: TEXT_LINE_HEIGHT,
  fontSize: 14,
  fontWeight: 500,
  fontFamily: "Manrope, sans-serif",
};
