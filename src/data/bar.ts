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

export const getMdOption = (
  data: {
    labels: { [key: string]: string };
    values: number[];
    images?: string[];
  },
  withImage: boolean,
  withImageOptions: boolean,
  hasOverflow: boolean
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
        lineHeight: 20,
        fontWeight: 500,
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
  withImageOptions: boolean
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
        lineHeight: 20,
        fontWeight: 500,
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
          ? withImageOptions
            ? 260
            : 340
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
    ],
  };
};
