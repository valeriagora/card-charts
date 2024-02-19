import { CardSize, Breakpoint, IChartOptionsOverflow } from "@/charts/types";

export const CARD_DIMENSIONS = {
  [Breakpoint.medium]: {
    S: {
      width: 320,
      height: 200,
    },
    M: {
      width: 656,
      height: 416,
    },
    L: {
      width: 992,
      height: "100%",
    },
  },
  [Breakpoint.large]: {
    S: {
      width: 348,
      height: 200,
    },
    M: {
      width: 712,
      height: 416,
    },
    L: {
      width: 1076,
      height: "100%",
    },
  },
};
export const CHART_BOX_DIMENSIONS = {
  // breakpoint size
  [Breakpoint.medium]: {
    // card size
    S: {
      width: 280,
      height: 120,
    },
    M: {
      width: 616,
      height: 336,
    },
    L: {
      width: 952,
      height: "auto",
    },
  },
  [Breakpoint.large]: {
    S: {
      width: 308,
      height: 120,
    },
    M: {
      width: 672,
      height: 336,
    },
    L: {
      width: 1036,
      height: "auto",
    },
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
export const CHART_WIDTHS = {
  //breakpoint size
  [Breakpoint.medium]: {
    // card size
    S: 120,
    M: 304,
    L: 472,
  },
  [Breakpoint.large]: {
    S: 120,
    M: 332,
    L: 514,
  },
};
// chart container horizontal gaps
export const CHART_CONTAINER_X_GAP_S = 12;
export const CHART_CONTAINER_X_GAP_ML = 8;
// custom shape
export const RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE =
  "RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE";
export const MIN_CHART_HEIGHT_L = 188;
export const chartOptionsOverflow: IChartOptionsOverflow = {
  [CardSize.small]: { default: 4, withImgOptions: 4 },
  [CardSize.medium]: {
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
