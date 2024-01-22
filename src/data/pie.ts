import { CardSize } from "@/app/bar/types";
import { ReactEChartsProps } from "@/components/ReactECharts";
import {
  SeriesOption,
  LegendComponentOption,
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
} from "echarts";
import { url } from "inspector";
import { getBase64Image } from "@/utils";

const urlToBase64 = async (url: string) => {
  let result = await getBase64Image(url);
  return result;
};

const pieLegendWidths = {
  small: 100,
  medium: [152, 290],
  large: [280, 440],
};
export const pieColors = [
  "#FF877C",
  "#25B4C8",
  "#D88ADA",
  "#9ECC7F",
  "#F9DE82",
  "#39519B",
];
const pieLegendFormatter = (data: any[]) => (name: string) => {
  const percents = data.find((item) => item.name === name)?.value;
  const label = `{value|${percents}%} {name|${name}}`;
  return label;
};
const pieTooltip = {
  trigger: "item" as "item" | "none" | "axis",
};
const PIE_LEGEND_ARROW_UP_PATH_D =
  "M12.1869 11.0119C12.0628 10.996 11.9372 10.996 11.8131 11.0119C11.6465 11.0331 11.4313 11.1131 11.0472 11.4215C10.6474 11.7426 10.1708 12.2213 9.45756 12.941L7.71025 14.7039C7.32148 15.0962 6.68832 15.099 6.29606 14.7103C5.90379 14.3215 5.90097 13.6883 6.28975 13.2961L8.03705 11.5331C8.05051 11.5195 8.06392 11.506 8.07728 11.4925C8.73969 10.8241 9.29584 10.2629 9.79492 9.86213C10.3198 9.44057 10.8776 9.11492 11.5602 9.02792C11.8522 8.99069 12.1478 8.99069 12.4398 9.02792C13.1224 9.11492 13.6802 9.44057 14.2051 9.86213C14.7042 10.2629 15.2603 10.8241 15.9227 11.4925L17.7103 13.2961C18.099 13.6883 18.0962 14.3215 17.7039 14.7103C17.3117 15.099 16.6785 15.0962 16.2897 14.7039L14.5424 12.941C13.8292 12.2213 13.3526 11.7426 12.9528 11.4215C12.5687 11.1131 12.3535 11.0331 12.1869 11.0119Z";
const PIE_LEGEND_ARROW_DOWN_PATH_D =
  "M5.81311 3.98814C5.93721 4.00395 6.06279 4.00395 6.1869 3.98814C6.35347 3.9669 6.56866 3.88694 6.95275 3.57848C7.35262 3.25735 7.82916 2.77869 8.54244 2.05902L10.2897 0.296055C10.6785 -0.0962077 11.3117 -0.0990325 11.7039 0.289745C12.0962 0.678524 12.099 1.31168 11.7103 1.70395L9.96295 3.46691C9.94949 3.48049 9.93608 3.49402 9.92272 3.50751C9.26031 4.17589 8.70416 4.73706 8.20508 5.13787C7.68015 5.55943 7.12239 5.88508 6.43977 5.97208C6.14776 6.0093 5.85224 6.0093 5.56023 5.97208C4.87761 5.88508 4.31985 5.55943 3.79492 5.13787C3.29584 4.73706 2.7397 4.1759 2.07731 3.50753L0.289746 1.70394C-0.099032 1.31168 -0.0962072 0.678522 0.296055 0.289744C0.688318 -0.0990334 1.32148 -0.0962086 1.71026 0.296054L3.45756 2.05902C4.17084 2.77869 4.64738 3.25735 5.04725 3.57848C5.43134 3.88694 5.64653 3.9669 5.81311 3.98814Z";

const pieLegend: LegendComponentOption = {
  type: "scroll",
  pageIcons: {
    vertical: [PIE_LEGEND_ARROW_UP_PATH_D, PIE_LEGEND_ARROW_DOWN_PATH_D],
  },
  pageIconColor: "#C8CAD0",
  pageIconInactiveColor: "#6C7080",
  pageIconSize: 10,
  icon: "circle",
  top: "center",
  orient: "vertical",
  inactiveColor: "#6C7080",
  itemGap: 10,
  itemHeight: 12,
  pageButtonGap: 10,
  pageTextStyle: {
    fontFamily: "Manrope",
    fontSize: 14,
    color: "#C8CAD0",
  },
};
const pieLegendTextStyle = {
  width: pieLegendWidths.small,
  overflow: "truncate",
  rich: {
    value: {
      fontFamily: "Manrope",
      color: "#fff",
      fontSize: 14,
    },
    name: {
      fontFamily: "Manrope",
      color: "#6C7080",
      fontSize: 14,
    },
  },
};

const pieGrid = {
  right: 0,
  top: 0,
  bottom: 0,
};
const pieSeries: SeriesOption = {
  type: "pie",
  color: pieColors,
  label: {
    show: false,
  },
  emptyCircleStyle: {
    color: "#6C7080",
  },
};
// eslint-desable
export const smOption = (data: any): ReactEChartsProps["option"] => ({
  tooltip: pieTooltip,
  grid: {
    ...pieGrid,
    left: 124,
  },
  series: {
    ...pieSeries,
    center: ["60px", "50%"],
    radius: [40, 56],
    data,
  },
  legend: {
    formatter: pieLegendFormatter(data),
    ...pieLegend,
    left: "50%",
    textStyle: {
      ...(pieLegendTextStyle as any),
      width: pieLegendWidths[CardSize.small],
    },
  },
});
//
const getMdImageOptionStyles = (url: string) => {
  return {
    height: 72,
    width: 72,
    backgroundColor: {
      image: url,
    },
  };
};
// image options rich text + formatter
export const getMdOption = (
  data: any[],
  withImage: boolean
  // imageOptionUrls?: string[]
): ReactEChartsProps["option"] => {
  const withImageOptions = data.every((item) => item.image);
  const imageOptions = withImageOptions
    ? data.reduce(
        (
          total: any,
          current: { image: { key: string; value: string } },
          idx: number
        ) => {
          const { image } = current;
          const styles = getMdImageOptionStyles(image.value);
          const imageKey = data[idx].image.key;
          total[imageKey] = styles;
          return total;
        },
        {}
      )
    : [];

  return {
    backgroundColor: "#222430",
    tooltip: pieTooltip,
    series: [
      {
        ...pieSeries,
        center: ["25%", "50%"],
        radius: [52, 92],
        data,
      },
      // imageOptionsSeries as SeriesOption,
    ],
    grid: {
      ...pieGrid,
      left: "50%",
    },
    legend: {
      formatter: (name: string) => {
        const percents = data.find((item) => item.name === name)?.value;
        const imageKey = data.find((item) => item.name === name).image.key;
        const label = `{${imageKey}|}   {value|${percents}%} {name|${name}}`;
        return label;
      },
      ...pieLegend,
      left: "50%",
      textStyle: {
        ...(pieLegendTextStyle as any),
        rich: {
          value: {
            fontFamily: "Manrope",
            color: "#fff",
            fontSize: 14,
          },
          name: {
            fontFamily: "Manrope",
            color: "#6C7080",
            fontSize: 14,
          },
          ...imageOptions,
        },
        width: pieLegendWidths.medium[withImage ? 0 : 1],
      },
    },
  };
};

// image options custom series
export const getLgOption = (
  data: any[],
  withImage: boolean,
  imageOptionUrls?: string[]
): ReactEChartsProps["option"] => {
  // const imageOptionsSeries = imageOptionUrls?.length
  //   ? {
  //       type: "custom",
  //       renderItem: (
  //         params: CustomSeriesRenderItemParams,
  //         api: CustomSeriesRenderItemAPI
  //       ) => renderOptionImage(params, api, Math.max(...values)),
  //       data: imageOptionUrls?.map((image: string) => [0, 0, image]),
  //       z: 1,
  //     }
  //   : undefined;
  return {
    tooltip: pieTooltip,
    toolbox: {
      show: true,
      // z: 2,
      left: 200,
      // orient: "vertical",
      feature: {
        saveAsImage: {
          show: true,
        },
      },
    },
    series: {
      ...pieSeries,
      center: ["25%", "50%"],
      radius: [51, 91],
      data,
    },
    grid: {
      ...pieGrid,
      left: "50%",
    },
    legend: {
      formatter: pieLegendFormatter(data),
      textStyle: {
        ...(pieLegendTextStyle as any),
        overflow: "break",
        width: pieLegendWidths.large[withImage ? 0 : 1],
        //
        height: 20,
        lineHeight: 20,
      },
      ...pieLegend,
      // height: 700,
      type: "plain",
      left: "50%",
      padding: 0,
    },
  };
};
