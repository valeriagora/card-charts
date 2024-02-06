import { ECharts, graphic } from "echarts";
import {
  IMAGE_OPTION_BG_RADIUS,
  L_CHART_WIDTH,
  M_CHART_WIDTH,
  pieColors,
  QUESTION_IMAGE_SIDE,
  RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
} from "./constants";

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
export const getLegendIconColor = (colors: string[], index: number) => {
  const remainder = index % colors.length;
  return pieColors[remainder];
};
export function truncate(text: string, symbolsCount: number) {
  if (text.length <= symbolsCount) return text;
  return text.slice(0, symbolsCount) + "...";
}
export function breakWord(string: string, symbolsCount: number) {
  const spacing = " ";
  const splittedBySpacing = string.split(spacing);
  return splittedBySpacing.reduce(
    (total, current, idx) => {
      let lastElem = total[total.length - 1];
      const nextLength = lastElem.length + ` ${current}`.length;
      if (nextLength <= symbolsCount) {
        total[total.length - 1] += `${idx ? spacing : ""}${current}`;
      } else {
        total.push(`${current}`);
      }
      return total;
    },
    [""]
  );
}
export const isBase64Image = (img: string) => img.startsWith("data:image");
export const getQuestionImage = (
  questionImageUrl: string,
  coordSysHeight: number,
  size: string
) => {
  const chartWidth = size === "medium" ? M_CHART_WIDTH : L_CHART_WIDTH;
  return [
    {
      type: RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
      shape: {
        width: QUESTION_IMAGE_SIDE,
        height: QUESTION_IMAGE_SIDE,
        x: chartWidth - QUESTION_IMAGE_SIDE,
        y: (coordSysHeight - QUESTION_IMAGE_SIDE) / 2,
      },
      style: {
        fill: "#1a1a25",
      },
    },
    {
      type: "image",
      style: {
        x: 0,
        image: questionImageUrl,
        y: 0,
        width: QUESTION_IMAGE_SIDE,
        height: QUESTION_IMAGE_SIDE,
      },
      position: [
        chartWidth - QUESTION_IMAGE_SIDE,
        (coordSysHeight - QUESTION_IMAGE_SIDE) / 2,
      ],
    },
  ];
};
export const registerCoverShape = () => {
  const RectangleWithRadius = graphic.extendShape({
    buildPath: function (ctx, shape) {
      const { x, y, height } = shape;
      ctx.beginPath();
      ctx.moveTo(x + IMAGE_OPTION_BG_RADIUS, y);
      ctx.lineTo(x + height - IMAGE_OPTION_BG_RADIUS, y);
      ctx.quadraticCurveTo(
        x + height,
        y,
        x + height,
        y + IMAGE_OPTION_BG_RADIUS
      );
      ctx.lineTo(x + height, y + height - IMAGE_OPTION_BG_RADIUS);
      ctx.quadraticCurveTo(
        x + height,
        y + height,
        x + height - IMAGE_OPTION_BG_RADIUS,
        y + height
      );
      ctx.lineTo(x + IMAGE_OPTION_BG_RADIUS, y + height);
      ctx.quadraticCurveTo(
        x,
        y + height,
        x,
        y + height - IMAGE_OPTION_BG_RADIUS
      );
      ctx.lineTo(x, y + IMAGE_OPTION_BG_RADIUS);
      ctx.quadraticCurveTo(x, y, x + IMAGE_OPTION_BG_RADIUS, y);
      ctx.closePath();
    },
  });
  graphic.registerShape(
    RECTANGLE_WITH_RADIUS_CUSTOM_SHAPE,
    RectangleWithRadius
  );
};
