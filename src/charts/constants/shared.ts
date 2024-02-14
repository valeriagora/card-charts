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
// max symbols count
// export const pieMaxSymbols = {
//   small: 16,
//   medium: {
//     withoutOptionImgs: {
//       default: 34,
//       withT2B: 26,
//       withQuestionImg: 5,
//     },
//     withOptionImgs: {
//       default: 22,
//       withT2B: 13,
//       withQuestionImg: 7,
//     },
//   },
//   large: {
//     withoutOptionImgs: {
//       default: 60,
//       withT2B: 53,
//       withQuestionImg: 42,
//       withQuestionImgAndT2B: 34,
//     },
//     withOptionImgs: {
//       default: 47,
//       withT2B: 40,
//       withQuestionImg: 31,
//       withQuestionImgAndT2B: 20,
//     },
//   },
// };
// export const LEGEND_MAX_SYMBOLS_COUNT_M = 34;
// export const LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT_M = 17;
// export const LEGEND_IMAGE_OPTIONS_MAX_SYMBOLS_COUNT_M = 22;
// export const LEGEND_WITH_IMG_OPTIONS_WITH_IMAGE_MAX_SYMBOLS_COUNT_M = 5;
// export const LEGEND_MAX_SYMBOLS_COUNT_L = 60;
// export const L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT = 42;
// export const L_LEGEND_IMAGE_OPTIONS_MAX_SYMBOLS_COUNT = 47;
// export const L_LEGEND_IMAGE_OPTIONS_WITH_IMAGE_MAX_SYMBOLS_COUNT = 31;
//
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
//
export const MIN_CHART_HEIGHT_L = 188;
// export const CHART_HORIZONTAL_GAP = 8;
// //
// export const S_LABEL_X_GAP = 4;
// export const ML_LABEL_X_GAP = 8;
// export const S_CHART_GRID_X_GAP = 12;
// export const ML_CHART_GRID_X_GAP = 8;
// // gap between chart and legend or y-axis
// export const S_CHART_X_GAP = 12;
// export const ML_CHART_X_GAP = 8;
// // vertical gap between options
// export const ML_OPTION_Y_GAP = 8;
// // y axis item(bar) or legend item(pie) margin bottom
// export const OPTION_Y_GAP = 8;
// export const OPTION_MARGIN_BOTTOM = 8;
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
