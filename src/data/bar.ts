import { ReactEChartsProps } from "@/components/ReactECharts";
import {
  ECharts,
  CustomSeriesRenderItemParams,
  SeriesOption,
  CustomSeriesRenderItemAPI,
} from "echarts";
import {
  BAR_CHART_ML_BOTTOM_PADDING,
  BAR_CHART_S_BOTTOM_PADDING,
  OPTION_IMAGE_HEIGHT,
  IMAGE_OPTIONS_X_GAP,
} from "../app/bar/page";
import { CardSize } from "../app/bar/page";

export async function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, _) => {
    const reader = new FileReader();
    reader.onloadend = () => resolve(reader.result as string);
    reader.readAsDataURL(blob);
  });
}
export const getSvgBlob = async (chartInstance: ECharts) => {
  const svgRows = (chartInstance.renderToSVGString() as string).split("\n");
  svgRows.splice(
    1,
    0,
    '<defs><style type="text/css">@import url(http://fonts.googleapis.com/css?family=Manrope);</style></defs>'
  );
  const blob = new Blob([svgRows.join("\n")], { type: "image/svg+xml" });
  const base64 = await blobToBase64(blob);
  return base64;
};
export const getBase64Image = (url: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      canvas.width = img.width;
      canvas.height = img.height;
      if (ctx) {
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL("image/png");
        resolve(dataURL);
      }
    };
    img.onerror = (error) => reject(error);
  });
};

export const getSmOption: ReactEChartsProps["option"] = (
  data: {
    labels: { [key: string]: string }[];
    values: number[];
  },
  hasOverflow: boolean
) => ({
  backgroundColor: "#222430",
  show: true,
  grid: {
    top: 0,
    bottom: hasOverflow ? BAR_CHART_S_BOTTOM_PADDING : 0,
    right: "50%",
  },
  xAxis: {
    name: "",
    inverse: true,
    axisLabel: {
      show: false,
    },
    splitLine: {
      show: true,
      lineStyle: {
        color: "#6C7080",
        width: 1,
      },
    },
  },
  yAxis: {
    inverse: true,
    axisLabel: {
      margin: 8,
      formatter: (name: string, idx: number) => {
        const spacing = "  ";
        const percents = data.values[idx];
        const label = `{percents|${percents}%}${spacing}{name|${name}}`;
        return label;
      },
      rich: {
        percents: {
          fontSize: "14px",
          fontFamily: "Manrope",
          color: "#C8CAD0",
        },
        name: {
          fontSize: "14px",
          fontFamily: "Manrope",
          color: "#6c7080",
        },
      },
      textStyle: {
        fontSize: 14,
        fontWeight: 500,
        color: "#6C7080",
      },
      width: 130,
      overflow: "truncate",
    },
    data: Object.values(data.labels),
    position: "right",
    type: "category",
    axisLine: {
      show: true,
      lineStyle: {
        color: "#6C7080",
        width: 1,
      },
    },
    axisTick: {
      show: false,
    },
  },
  series: [
    {
      data: data.values,
      type: "bar",
      barWidth: 16,
      itemStyle: {
        color: "#25B4C8",
      },
    },
  ],
});

const renderOptionImage = function (
  param: any,
  api: any,
  maxXAxisValue: number
) {
  const xAxisStartPx = param.coordSys.x;
  const size = api.size([maxXAxisValue, 1]);
  return {
    type: "group",
    children: [
      {
        type: "image",
        style: {
          image: api.value(2),
          x: 2,
          y: 2,
          width: 72,
          height: 72,
        },
        position: [size[0] + xAxisStartPx + 8, size[1] * param.dataIndex],
      },
    ],
  };
};

const ML_CARD_HORIZONTAL_PADDING = 20;
const L_ROW_MAX_HEIGHT = 60;
const L_CONTAINER_WIDTH = 992 - ML_CARD_HORIZONTAL_PADDING * 2;
const M_CONTAINER_WIDTH = 656 - ML_CARD_HORIZONTAL_PADDING * 2;
const GRID_BOTTOM_PADDING = 16;
const T2B_TEXT_RIGHT_PADDING = 10;

const renderT2B = function (params, api, values, size, withImage = false) {
  const t2bPercents = values[0] + values[1];
  let b2bPercents = values[values.length - 1] + values[values.length - 2];
  let containerWidth =
    size === CardSize.large ? L_CONTAINER_WIDTH : M_CONTAINER_WIDTH;
  const optionHeight =
    size === CardSize.large
      ? L_ROW_MAX_HEIGHT
      : (344 - GRID_BOTTOM_PADDING) / values.length;
  const containerHeight = optionHeight * 2;
  const textWidth = 60;
  const iconHeight = 8;
  const fontSize = 14;
  if (withImage && size === CardSize.large) {
    const imageWidth = 120;
    const imageLeftMargin = 4;
    containerWidth -= imageWidth - imageLeftMargin;
  }
  const b2bYDistance = size === "large" ? values.length - 2 : values.length - 2;
  const b2bTextYDistance = values.length - 1;
  const showTop2Box = t2bPercents >= b2bPercents;
  const children = [
    {
      type: "rect",
      shape: {
        x: 0,
        y: showTop2Box ? 0 : optionHeight * b2bYDistance,
        width: containerWidth,
        height: containerHeight,
        r: 2,
      },
      style: {
        fill: "#1A1A25",
      },
    },
    {
      type: "rect",
      shape: {
        x: containerWidth - textWidth - T2B_TEXT_RIGHT_PADDING - iconHeight - 4,
        y: showTop2Box
          ? optionHeight - iconHeight / 2
          : optionHeight * b2bTextYDistance - iconHeight / 2,
        width: iconHeight,
        height: iconHeight,
        r: 1,
      },
      style: {
        fill: "#25B4C8",
      },
    },
    {
      type: "text",
      style: {
        text: `${showTop2Box ? "T2B" : "B2B"} ${
          showTop2Box ? t2bPercents : b2bPercents
        }%`,
        textFont: api.font({
          fontSize,
          fontWeight: 500,
          fontFamily: "Manrope, sans-serif",
        }),
        textAlign: "center",
        textVerticalAlign: "bottom",
        fill: "#fff",
      },
      position: [
        containerWidth - textWidth / 2 - T2B_TEXT_RIGHT_PADDING,
        showTop2Box
          ? optionHeight + fontSize / 2
          : optionHeight * b2bTextYDistance + fontSize / 2,
      ],
    },
  ];

  return {
    type: "group",
    children,
  };
};
export const getMdOption = (
  data: {
    labels: { [key: string]: string };
    values: number[];
    images?: string[];
  },
  withImage: boolean,
  withImageOptions: boolean,
  hasOverflow: boolean,
  showT2B: boolean
): ReactEChartsProps["option"] => {
  const imageOptionsSeries = withImageOptions
    ? {
        type: "custom",
        renderItem: (
          params: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) => renderOptionImage(params, api, Math.max(...data.values)),
        data: hasOverflow
          ? data.images?.slice(0, 4).map((image: string) => [0, 0, image])
          : data.images?.map((image: string) => [0, 0, image]),
        z: 1,
      }
    : undefined;
  const t2bSeries =
    showT2B && !withImage
      ? {
          type: "custom",
          renderItem: (params, api) =>
            renderT2B(params, api, data.values, CardSize.medium),
          data: [[]],
          z: -1,
        }
      : undefined;
  return {
    backgroundColor: "#222430",
    show: true,
    grid: {
      top: 0,
      bottom: BAR_CHART_ML_BOTTOM_PADDING,
      right: "50%",
    },
    xAxis: {
      name: "",
      inverse: true,
      axisLabel: {
        margin: 2,
        show: true,
        fontFamily: "Manrope",
        color: "#6C7080",
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
    },
    yAxis: {
      inverse: true,
      axisLabel: {
        margin: withImageOptions
          ? IMAGE_OPTIONS_X_GAP * 2 + OPTION_IMAGE_HEIGHT
          : 8,
        formatter: (name: string, idx: number) => {
          const spacing = "  ";
          const percents = data.values[idx];
          const label = `{percents|${percents}%}${spacing}{name|${name}}`;
          return label;
        },
        rich: {
          percents: {
            fontSize: "14px",
            fontFamily: "Manrope",
            color: "#C8CAD0",
          },
          name: {
            fontSize: "14px",
            fontFamily: "Manrope",
            color: "#6c7080",
          },
        },
        width: withImage
          ? withImageOptions
            ? 90
            : 210
          : showT2B
          ? 250
          : withImageOptions
          ? 250
          : 370,
        overflow: "truncate",
      },
      data: Object.values(data.labels),
      position: "right",
      type: "category",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#6C7080",
        },
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        data: data.values,
        type: "bar",
        barWidth: 16,
        itemStyle: {
          color: "#25B4C8",
        },
      },
      imageOptionsSeries as SeriesOption,
      t2bSeries as SeriesOption,
    ],
  };
};

export const getLgOption = (
  data: {
    labels: { [key: string]: string };
    values: number[];
    images?: string[];
  },
  withImage: boolean,
  withImageOptions: boolean,
  showT2B: boolean
): ReactEChartsProps["option"] => {
  const imageOptionsSeries = withImageOptions
    ? {
        type: "custom",
        renderItem: (
          params: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) => renderOptionImage(params, api, Math.max(...data.values)),
        data: data.images?.map((image: string) => [0, 0, image]),
        z: 1,
      }
    : undefined;
  const t2bSeries = showT2B
    ? {
        type: "custom",
        renderItem: (params, api) =>
          renderT2B(params, api, data.values, CardSize.large, withImage),
        data: [[]],
        z: -1,
      }
    : undefined;
  return {
    backgroundColor: "#222430",
    show: true,
    grid: {
      top: 0,
      bottom: BAR_CHART_ML_BOTTOM_PADDING,
      right: "50%",
    },
    xAxis: {
      inverse: true,
      axisLabel: {
        margin: 2,
        show: true,
        fontFamily: "Manrope",
        color: "#6C7080",
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
    },
    yAxis: {
      inverse: true,
      axisLabel: {
        margin: withImageOptions
          ? IMAGE_OPTIONS_X_GAP * 2 + OPTION_IMAGE_HEIGHT
          : 8,
        formatter: (name: string, idx: number) => {
          const spacing = "  ";
          const percents = data.values[idx];
          const label = `{percents|${percents}%}${spacing}{name|${name}}`;
          return label;
        },
        overflow: "break",
        rich: {
          percents: {
            fontSize: "14px",
            fontFamily: "Manrope",
            color: "#C8CAD0",
          },
          name: {
            fontSize: "14px",
            fontFamily: "Manrope",
            color: "#6c7080",
          },
        },
        width: withImage
          ? showT2B
            ? 270
            : withImageOptions
            ? 260
            : 340
          : showT2B
          ? 360
          : withImageOptions
          ? 380
          : 400,
      },
      data: Object.values(data.labels),
      position: "right",
      type: "category",
      axisLine: {
        show: true,
        lineStyle: {
          color: "#6C7080",
        },
      },
      axisTick: {
        show: false,
      },
    },
    series: [
      {
        data: data.values,
        type: "bar",
        barWidth: 16,
        itemStyle: {
          color: "#25B4C8",
        },
      },
      imageOptionsSeries as SeriesOption,
      t2bSeries as SeriesOption,
    ],
  };
};
