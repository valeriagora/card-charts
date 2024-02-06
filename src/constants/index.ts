import { IPieOptionsOverflow } from "@/types";

export const url =
  "https://images.unsplash.com/photo-1682695796795-cc287af78a2b?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

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
export const MAX_PERCENTS_TEXT_WIDTH = 36;
export const L_CHART_WIDTH = 952;
export const M_CHART_WIDTH = 616;
export const IMAGE_OPTION_BG_RADIUS = 8;
export const QUESTION_IMAGE_SIDE = 120;
export const M_LEGEND_MAX_SYMBOLS_COUNT = 34;
export const M_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT = 17;
export const M_LEGEND_IMAGE_OPTIONS_MAX_SYMBOLS_COUNT = 22;
export const M_LEGEND_IMAGE_OPTIONS_WITH_IMAGE_MAX_SYMBOLS_COUNT = 5;
export const L_LEGEND_MAX_SYMBOLS_COUNT = 60;
export const L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT = 42;
export const L_LEGEND_IMAGE_OPTIONS_MAX_SYMBOLS_COUNT = 47;
export const L_LEGEND_IMAGE_OPTIONS_WITH_IMAGE_MAX_SYMBOLS_COUNT = 31;
export const TEXT_LINE_HEIGHT = 20;
export const OPTION_IMAGE_SIDE = 72;
export const OPTION_IMAGE_MARGIN_RIGHT = 8;
export const OPTION_MARGIN_BOTTOM = 8;
export const CIRCLE_ICON_MARGIN_RIGHT = 4;
export const CIRCLE_ICON_S_MARGIN_LEFT = 4;
export const CIRCLE_ICON_RADIUS = 6;
export const RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE =
  "RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE";
export const MIN_L_CHART_HEIGHT = 188;
export const CHART_HORIZONTAL_GAP = 8;
export const pieOptionsOverflow: IPieOptionsOverflow = {
  small: { default: 4, withImgOptions: 4 },
  medium: {
    default: 11,
    withImgOptions: 4,
  },
};
