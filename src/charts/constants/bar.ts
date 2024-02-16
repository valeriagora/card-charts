import { IBreakpoint } from "../types";

export const BAR_HEIGHT = 16;
export const barMaxSymbolsCount = {
  small: 16,
  medium: {
    withoutOptionImgs: {
      default: 40,
      withT2B: 26,
      withQuestionImg: 20,
    },
    withOptionImgs: {
      default: 27,
      withT2B: 13,
      withQuestionImg: 6,
    },
  },
  large: {
    withoutOptionImgs: {
      default: 68,
      withT2B: 53,
      withQuestionImg: 46,
      withQuestionImgAndT2B: 34,
    },
    withOptionImgs: {
      default: 54,
      withT2B: 40,
      withQuestionImg: 35,
      withQuestionImgAndT2B: 20,
    },
  },
};
export const BAR_Y_AXIS_TEXT_X_GAP_S = 4;
export const BAR_Y_AXIS_TEXT_X_GAP_ML = 8;
export const BAR_CHART_PADDING_LEFT_ML = 8;
export const BAR_CHART_CONTAINER_PADDING_BOTTOM_ML = 16;
export const BAR_Y_AXIS_ITEM_Y_GAP_ML = 8;
export const BAR_Y_GAP_S = 4;
export const BAR_Y_GAP_ML = 12;
export const BAR_Y_GAP_WITH_OPTION_IMG_ML = 64;
export const BAR_Y_AXISES_WIDTHS = {
  // breakpoint size
  [IBreakpoint.medium]: {
    // card size
    S: 148,
    M: 304,
    L: 472,
  },
  [IBreakpoint.large]: {
    S: 176,
    M: 332,
    L: 514,
  },
};

// export const BAR_Y_AXIS_WIDTH_S = 148; // 176
// export const BAR_Y_AXIS_WIDTH_M = 304; // 332
// export const BAR_Y_AXIS_WIDTH_L = 472; // 514
export const T2B_TEXT_RIGHT_PADDING = 10;
export const BAR_OPTION_X_AXIS = {
  inverse: true,
  axisLabel: {
    margin: 2,
    show: true,
    fontFamily: "Manrope",
    color: "#c8cad0",
    fontSize: 12,
    lineHeight: 16,
    fontWeight: 400,
  },
  splitLine: {
    show: true,
    lineStyle: {
      color: "#6C7080",
      width: 1,
    },
  },
};
export const BAR_OPTION_Y_AXIS = {
  inverse: true,
  show: true,
  axisTick: {
    show: false,
  },
};
export const BAR_SERIES = {
  type: "bar" as any,
  barWidth: 16,
  barCategoryGap: 12,
  itemStyle: {
    color: "#25B4C8",
  },
};
