import { CardSize } from "@/app/bar/types";
import { ReactEChartsProps } from "@/components/ReactECharts";
import {
  LegendComponentOption,
  CustomSeriesRenderItemAPI,
  CustomSeriesRenderItemParams,
  graphic,
} from "echarts";
import { getBase64Image } from "@/utils";
import {
  IMAGE_OPTION_BG_RADIUS,
  RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
} from "@/app/pie/constants";
import { pieColors } from "../constants";
import {
  renderLgLegendItem,
  renderMdLegendItem,
  renderSmLegendItem,
} from "@/app/pie-with-images/renderItem";

const urlToBase64 = async (url: string) => {
  let result = await getBase64Image(url);
  return result;
};

const pieLegendWidths = {
  small: 100,
  medium: [152, 290],
  large: [280, 440],
};
// export const pieColors = [
//   "#FF877C",
//   "#25B4C8",
//   "#D88ADA",
//   "#9ECC7F",
//   "#F9DE82",
//   "#39519B",
// ];
const pieTooltip = {
  show: false,
};
const pieSeries = {
  type: "pie",
  color: pieColors,
  label: {
    show: false,
  },
  emptyCircleStyle: {
    color: "#6C7080",
  },
  center: ["25%", "50%"],
  radius: [51, 91],
  name: "pie-series",
};
const hiddenAxises = {
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
    type: "value",
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
export const getSmOption = (pieData: any, pieLegendData: any) => {
  const hasOverflow = pieData.length > 4;
  const data = pieData;
  const legendData = hasOverflow ? pieLegendData.slice(0, 4) : pieLegendData;
  return {
    tooltip: pieTooltip,
    backgroundColor: "#222430",
    ...hiddenAxises,
    grid: {
      right: 0,
      top: 0,
      bottom: 0,
      left: 132,
    },
    series: [
      {
        type: "custom",
        renderItem: (
          param: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) => renderSmLegendItem(param, api, legendData.length),
        data: legendData,
      },
      {
        ...pieSeries,
        center: ["60px", "50%"],
        radius: [40, 56],
        data,
      },
    ],
  };
};
// eslint-desable
// export const getSmOption = (data: any): ReactEChartsProps["option"] => ({
//   tooltip: pieTooltip,
//   grid: {
//     ...pieGrid,
//     left: 124,
//   },
//   series: {
//     ...pieSeries,
//     center: ["60px", "50%"],
//     radius: [40, 56],
//     data,
//   },
//   legend: {
//     formatter: pieLegendFormatter(data),
//     ...pieLegend,
//     left: "50%",
//     textStyle: {
//       ...(pieLegendTextStyle as any),
//       width: pieLegendWidths[CardSize.small],
//     },
//   },
// });
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
const RectangleWithRadius = graphic.extendShape({
  buildPath: function (ctx, shape) {
    const { x, y, height } = shape;
    ctx.beginPath();
    ctx.moveTo(x + IMAGE_OPTION_BG_RADIUS, y);
    ctx.lineTo(x + height - IMAGE_OPTION_BG_RADIUS, y);
    ctx.quadraticCurveTo(x + height, y, x + height, y + IMAGE_OPTION_BG_RADIUS);
    ctx.lineTo(x + height, y + height - IMAGE_OPTION_BG_RADIUS);
    ctx.quadraticCurveTo(
      x + height,
      y + height,
      x + height - IMAGE_OPTION_BG_RADIUS,
      y + height
    );
    ctx.lineTo(x + IMAGE_OPTION_BG_RADIUS, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - IMAGE_OPTION_BG_RADIUS);
    ctx.lineTo(x, y + IMAGE_OPTION_BG_RADIUS);
    ctx.quadraticCurveTo(x, y, x + IMAGE_OPTION_BG_RADIUS, y);
    ctx.closePath();
  },
});
graphic.registerShape(RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE, RectangleWithRadius);
const renderLegendItem = (
  param: CustomSeriesRenderItemParams,
  api: CustomSeriesRenderItemAPI
) => {
  const xAxisStartPx = param.coordSys.x;
  const [_, ySizePx] = api.size([1, 1]) as number[];
  // console.log("y size px", ySizePx);
  return {
    type: RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
    shape: {
      width: 72,
      height: 72,
      x: xAxisStartPx + 12 + 12,
      y: ySizePx * param.dataIndex,
    },
    style: {
      fill: "#1a1a25",
    },
  };
};
export const getMdOption = (
  pieData: any,
  pieLegendData: any,
  questionImage: string
) => {
  const hasOverflow = pieData.length > 4;
  const data = hasOverflow ? pieData.slice(0, 4) : pieData;
  const legendData = hasOverflow ? pieLegendData.slice(0, 4) : pieLegendData;
  return {
    tooltip: pieTooltip,
    backgroundColor: "#222430",
    ...hiddenAxises,
    series: [
      {
        type: "custom",
        renderItem: (
          param: CustomSeriesRenderItemParams,
          api: CustomSeriesRenderItemAPI
        ) => renderMdLegendItem(param, api, questionImage, data.length),
        data: legendData,
      },
      {
        data: pieData,
        ...pieSeries,
      },
    ],
    grid: {
      left: "50%",
      right: 1,
      top: 0,
      bottom: 0,
    },
  };
};
export const getLgOption = (
  pieData: any,
  pieLegendData: any,
  questionImage: string,
  optionHeights: number[],
  optionsWithImagesLines: number[],
  containerHeight: number
) => ({
  tooltip: pieTooltip,
  backgroundColor: "#222430",
  ...hiddenAxises,
  series: [
    {
      type: "custom",
      renderItem: (
        param: CustomSeriesRenderItemParams,
        api: CustomSeriesRenderItemAPI
      ) =>
        renderLgLegendItem(
          param,
          api,
          questionImage,
          optionHeights,
          optionsWithImagesLines,
          containerHeight
        ),
      data: pieLegendData,
    },
    {
      data: pieData,
      ...pieSeries,
    },
  ],
  grid: {
    left: "50%",
    right: 1,
    top: 0,
    bottom: 0,
  },
});
// export const getMdOption = (
//   data: any[],
//   withImage: boolean,
//   pieLegendData: Array<Array<number>>
//   // imageOptionUrls?: string[]
// ): ReactEChartsProps["option"] => {
//   const withImageOptions = data.every((item) => item.image);
//   const imageOptions = withImageOptions
//     ? data.reduce(
//         (
//           total: any,
//           current: { image: { key: string; value: string } },
//           idx: number
//         ) => {
//           const { image } = current;
//           const styles = getMdImageOptionStyles(image.value);
//           const imageKey = data[idx].image.key;
//           total[imageKey] = styles;
//           return total;
//         },
//         {}
//       )
//     : [];
//   const imageOptionsBgs = {
//     type: "custom",
//     renderItem: (
//       param: CustomSeriesRenderItemParams,
//       api: CustomSeriesRenderItemAPI
//     ) => renderLegendItem(param, api),
//     data: pieLegendData,
//   };

//   return {
//     backgroundColor: "#222430",
//     tooltip: pieTooltip,
//     xAxis: {
//       splitLine: {
//         show: true,
//       },
//       axisLabel: {
//         show: true,
//       },
//       axisLine: {
//         show: true,
//       },
//       axisTick: {
//         show: true,
//       },
//     },
//     yAxis: {
//       splitLine: {
//         show: true,
//       },
//       axisLabel: {
//         show: true,
//       },
//       axisLine: {
//         show: true,
//       },
//       axisTick: {
//         show: true,
//       },
//     },
//     series: [
//       {
//         ...pieSeries,
//         center: ["25%", "50%"],
//         radius: [52, 92],
//         data,
//       },
//       imageOptionsBgs,
//       // imageOptionsSeries as SeriesOption,
//     ],
//     grid: {
//       ...pieGrid,
//       left: "50%",
//       bottom: 19,
//     },
//     legend: {
//       // formatter: (name: string) => {
//       //   const percents = data.find((item) => item.name === name)?.value;
//       //   const imageKey = data.find((item) => item.name === name).image.key;
//       //   const spacing = "   ";
//       //   const label = `{${imageKey}|}${spacing}{value|${percents}%} {name|${name}}`;
//       //   return label;
//       // },
//       ...pieLegend,
//       padding: 0,
//       left: "50%",
//       textStyle: {
//         ...(pieLegendTextStyle as any),
//         rich: {
//           value: {
//             fontFamily: "Manrope",
//             color: "#fff",
//             fontSize: 14,
//           },
//           name: {
//             fontFamily: "Manrope",
//             color: "#6C7080",
//             fontSize: 14,
//           },
//           ...imageOptions,
//         },
//         width: pieLegendWidths.medium[withImage ? 0 : 1],
//       },
//     },
//   };
// };

// image options custom series
// export const getLgOption = (
//   data: any[],
//   withImage: boolean,
//   imageOptionUrls?: string[]
// ): ReactEChartsProps["option"] => {
//   // const imageOptionsSeries = imageOptionUrls?.length
//   //   ? {
//   //       type: "custom",
//   //       renderItem: (
//   //         params: CustomSeriesRenderItemParams,
//   //         api: CustomSeriesRenderItemAPI
//   //       ) => renderOptionImage(params, api, Math.max(...values)),
//   //       data: imageOptionUrls?.map((image: string) => [0, 0, image]),
//   //       z: 1,
//   //     }
//   //   : undefined;
//   return {
//     tooltip: pieTooltip,
//     toolbox: {
//       show: true,
//       // z: 2,
//       left: 200,
//       // orient: "vertical",
//       feature: {
//         saveAsImage: {
//           show: true,
//         },
//       },
//     },
//     series: {
//       ...pieSeries,
//       center: ["25%", "50%"],
//       radius: [51, 91],
//       data,
//     },
//     grid: {
//       ...pieGrid,
//       left: "50%",
//     },
//     legend: {
//       formatter: pieLegendFormatter(data),
//       textStyle: {
//         ...(pieLegendTextStyle as any),
//         overflow: "break",
//         width: pieLegendWidths.large[withImage ? 0 : 1],
//         //
//         height: 20,
//         lineHeight: 20,
//       },
//       ...pieLegend,
//       // height: 700,
//       type: "plain",
//       left: "50%",
//       padding: 0,
//     },
//   };
// };
