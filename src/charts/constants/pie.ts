import { Breakpoint } from "../types";

export const PIE_HIDDEN_AXISES = {
  xAxis: {
    splitLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
    axisLine: {
      show: false,
    },
  },
  yAxis: {
    axisLabel: {
      show: false,
    },
    type: "value" as any,
    splitLine: {
      show: false,
    },
    axisLine: {
      show: false,
    },
    axisTick: {
      show: false,
    },
  },
};

export const PIE_LEGEND_ITEM_TEXT_X_GAP = 4;
export const PIE_LEGEND_ITEM_Y_GAP_ML = 8;
export const PIE_LEGEND_ICON_X_PADDING = 4;
export const PIE_LEGEND_ICON_RADIUS = 6;
export const PIE_CHART_CONTAINER_Y_PADDING = 4;
export const PIE_MAX_SYMBOLS = {
  // breakpoint size
  [Breakpoint.medium]: {
    small: 10,
    medium: {
      withoutOptionImgs: {
        default: 36,
        withQuestionImg: 15,
      },
      withOptionImgs: {
        default: 24,
        withQuestionImg: 4,
      },
    },
    large: {
      withoutOptionImgs: {
        default: 70,
        withQuestionImg: 50,
      },
      withOptionImgs: {
        default: 50,
        withQuestionImg: 33,
      },
    },
  },
  [Breakpoint.large]: {
    small: 16,
    medium: {
      withoutOptionImgs: {
        default: 42,
        withQuestionImg: 18,
      },
      withOptionImgs: {
        default: 28,
        withQuestionImg: 7,
      },
    },
    large: {
      withoutOptionImgs: {
        default: 72,
        withQuestionImg: 52,
      },
      withOptionImgs: {
        default: 58,
        withQuestionImg: 40,
      },
    },
  },
};
