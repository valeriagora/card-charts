"use client";
import { ReactECharts } from "@/components/ReactECharts";
import {
  Button,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  FormLabel,
  styled,
} from "@mui/material";
import React, {
  forwardRef,
  LegacyRef,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { getSmOption, getMdOption, getLgOption } from "@/options/pie";
import { DndCard } from "@/components/DndCard";
import { CardSize } from "@/types";
import { ECharts } from "echarts";
import {
  breakWord,
  getBase64Image,
  getSvgBlob,
  isBase64Image,
  registerCoverShape,
} from "@/utils";
import {
  L_LEGEND_MAX_SYMBOLS_COUNT,
  L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT,
  OPTION_MARGIN_BOTTOM,
  OPTION_IMAGE_SIDE,
  TEXT_LINE_HEIGHT,
  MIN_L_CHART_HEIGHT,
  chartBoxDimensions,
  pieOptionsOverflow,
  url,
} from "@/constants";
import { OverflowInfo } from "@/components/styledComponents";
import { default as NextImage } from "next/image";
import { PieData } from "@/types";

export function resizeImageBase64(base64Str: string, maxWidth: number): Promise<string> {
  return new Promise((resolve, reject) => {
    // Create an Image object
    const img = new Image();
    img.onload = () => {
      // Get the aspect ratio
      const scaleFactor = maxWidth / img.width;
      const scaledHeight = img.height * scaleFactor;

      // Create a canvas and set the new dimensions
      const canvas = document.createElement('canvas');
      canvas.width = maxWidth;
      canvas.height = scaledHeight;

      // Draw the scaled image on the canvas
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, maxWidth, scaledHeight);

      // Convert the canvas to a Base64 string and resolve the promise
      resolve(canvas.toDataURL());
    };
    img.onerror = reject;

    // Set the source of the image to the input Base64 string
    img.src = base64Str;
  });
}


const pieData: PieData[] = [
  {
    value: 25,
    name: "Pie chart without options images Other Search Engine Search Engine Search Search Engine Search Engine Search Engine Search Engine  ",
  },
  {
    value: 15,
    name: "Option 1 Option 1 Test test test test test test Test test test test test test Test test test test test test Test test test test test test Test test test test test test",
  },
  {
    value: 2,
    name: "Option 2  Test test test test test test Option 2 Option 2 Option 2 Option 2Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2",
  },
  {
    value: 3,
    name: "Option 3",
  },
  {
    value: 5,
    name: "Option 4 Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test",
  },
  {
    value: 25,
    name: "Pie chart without options images Other Search Engine Search Engine Search Search Engine Search Engine Search Engine Search Engine  ",
  },
  {
    value: 15,
    name: "Option 1 Option 1 Test test test test test test Test test test test test test Test test test test test test Test test test test test test Test test test test test test",
  },
  {
    value: 2,
    name: "Option 2  Test test test test test test Option 2 Option 2 Option 2 Option 2Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2 Option 2",
  },
  {
    value: 3,
    name: "Option 3",
  },
  {
    value: 5,
    name: "Option 4 Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test",
  },
  {
    value: 15,
    name: "Last 4 Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test",
  },
  {
    value: 3,
    name: "Overflow 4 Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test  Test test test test test test",
  },
];

type PieLegend = [number, number, string][];
const customSeriesData: PieLegend = pieData.map(({ value, name }, idx) => [
  value,
  idx + 1,
  name,
]);
interface IPieContainerProps {
  size: CardSize;
  height: number;
  hasOverflow: boolean;
  optionsCount: number;
  children: ReactNode;
}
const PieContainer = forwardRef(function Container(
  { size, height, hasOverflow, optionsCount, children }: IPieContainerProps,
  ref
) {
  return (
    <PieChartContainer
      size={size}
      height={height}
      ref={ref as LegacyRef<HTMLDivElement>}
    >
      {children}
      {hasOverflow && (
        <OverflowInfo>
          {size !== CardSize.large &&
            pieOptionsOverflow[size as CardSize.small | CardSize.medium]
              .default}
          / {optionsCount} options{" "}
          <NextImage width={16} height={16} src={"/info.svg"} alt="info" />
        </OverflowInfo>
      )}
    </PieChartContainer>
  );
});
const PieChartContainer = styled("div")<{
  size: CardSize;
  height?: number;
}>(({ size, height }) => {
  const width: number = chartBoxDimensions[size].width;
  return {
    position: "relative",
    width,
    border: "1px solid slateblue",
    boxSizing: "border-box",
    height:
      size === CardSize.large && height
        ? height > MIN_L_CHART_HEIGHT
          ? height
          : MIN_L_CHART_HEIGHT
        : chartBoxDimensions[size].height,
  };
});

const hasOptionsOverflow = (
  size: CardSize,
  length: number,
  withImageOptions: boolean = false
) => {
  if (size === CardSize.large) return false;
  return withImageOptions
    ? length > pieOptionsOverflow[size].withImgOptions
    : length > pieOptionsOverflow[size].default;
};
function PieChartWithImageOptions({
  cardSize = CardSize.small,
  questionImage = url,
}: any) {
  useEffect(() => {
    registerCoverShape();
  }, []);
  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);
  const onChartInit = useCallback((chartInstance: ECharts) => {
    setChartInstance(chartInstance);
  }, []);
  const [pieChartData, setPieChartData] = useState<PieData[]>(pieData);
  const [pieLegendData, setPieLegendData] = useState(customSeriesData);
  const [questionImageUrl, setQuestionImageUrl] = useState("");
  const [isQuestionImageReady, setIsQuestionImageReady] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [downloadQueue, setDownloadQueue] = useState<string[]>([]);
  const [areBase64ImagesReady, setBase64ImagesReady] = useState(false);
  const optionsWithImagesLines = pieChartData.reduce(
    (total: number[], current: any) => {
      const { value, name } = current;
      const linesCount = breakWord(
        `${name}`,
        questionImageUrl
          ? L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT
          : L_LEGEND_MAX_SYMBOLS_COUNT
      ).length;
      total.push(linesCount);
      return total;
    },
    []
  );
  const optionHeights = optionsWithImagesLines.map(
    (lines) => lines * TEXT_LINE_HEIGHT
  );

  const largeContainerHeight =
    optionHeights.reduce((total, height) => (total += height), 0) +
    OPTION_MARGIN_BOTTOM * (optionHeights.length - 1);
  const lContainerHeight =
    largeContainerHeight < MIN_L_CHART_HEIGHT
      ? MIN_L_CHART_HEIGHT
      : largeContainerHeight;
  const [size, setSize] = useState(cardSize);
  const toggleImg = () => {
    setQuestionImageUrl(questionImageUrl ? "" : questionImage);
  };
  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value as CardSize);
  };
  const downloadChart = async (chartInstance: ECharts) => {
    console.log("downloadChart");
    const url = await getSvgBlob(chartInstance);
    const anchorElement = document.createElement("a");
    anchorElement.href = url;
    anchorElement.download = `pie-chart-${size}.svg`;
    document.body.appendChild(anchorElement);
    anchorElement.click();
  };
  const urlToBase64 = async (url: string) => {
    let result = await getBase64Image(url);
    return result;
  };
  const saveAsImage = useCallback(async () => {
    console.log("saveAsImage");
    if (size !== CardSize.small && !areBase64ImagesReady) {
      const base64Promises: Promise<string>[] = [];
      const optionImageUrls = pieLegendData.map((item) => item[3]);
      for (const url of optionImageUrls) {
        base64Promises.push(urlToBase64(url).then((base64) => resizeImageBase64(base64, 50)));
      }
      const getBase64Promises = async () =>
        await Promise.all(base64Promises).then((values) => values);
      const base64Urls = (await getBase64Promises());
      if (base64Urls.length) {
        setPieLegendData((prev: any) => {
          const newData = prev.map((item: PieLegend, idx: number) => [
            ...item.slice(0, 3),
            base64Urls[idx],
          ]);
          return newData;
        });
        setDownloadQueue([...downloadQueue, "download"]);
      }
      return;
    }
    const isQuestionImageReady = questionImageUrl
      ? isBase64Image(questionImageUrl)
      : true;
    if (size !== CardSize.small && !isQuestionImageReady) {
      const base64 = urlToBase64(questionImageUrl);
      const base64QImg = await Promise.resolve(base64);
      base64QImg && setQuestionImageUrl(base64QImg);
      setDownloadQueue([...downloadQueue, "download"]);

      return;
    }
    chartInstance && downloadChart(chartInstance);
  }, [
    downloadQueue,
    chartInstance,
    size,
    questionImageUrl,
    areBase64ImagesReady,
    isQuestionImageReady,
  ]);
  const onRenderEnded = useCallback(() => {
    const isQuestionImageReady = questionImageUrl
      ? isBase64Image(questionImageUrl)
      : true;

    setIsQuestionImageReady(isQuestionImageReady);
  }, [pieLegendData, questionImageUrl]);
  useEffect(() => {
    if (downloadQueue.length && chartInstance && isQuestionImageReady) {
      setTimeout(() => {
        downloadChart(chartInstance);
        setDownloadQueue((prev) => prev.slice(0, -1));
      }, 1000);
    }
  }, [
    downloadQueue,
    areBase64ImagesReady,
    isQuestionImageReady,
    chartInstance,
  ]);
  const small = getSmOption(pieChartData, pieLegendData);
  const medium = getMdOption(pieChartData, pieLegendData, questionImageUrl);
  const large = getLgOption(
    pieChartData,
    pieLegendData,
    questionImageUrl,
    optionHeights,
    optionsWithImagesLines,
    lContainerHeight
  );
  const options = {
    small,
    medium,
    large,
  };

  return (
    <>
      <Button
        sx={{ marginBottom: 4, display: "block" }}
        variant="contained"
        onClick={toggleImg}
        disabled={size === CardSize.small}
      >
        Toggle image
      </Button>
      <Button
        sx={{ marginBottom: 4, display: "block" }}
        variant="contained"
        onClick={saveAsImage}
      >
        Export as svg
      </Button>
      <FormControl>
        <FormLabel id="radio-buttons-group-label">Card size</FormLabel>
        <RadioGroup
          aria-labelledby="radio-buttons-group-label"
          value={size}
          onChange={handleSizeChange}
          name="radio-buttons-group"
        >
          <FormControlLabel
            value={CardSize.small}
            control={<Radio />}
            label="Small"
          />
          <FormControlLabel
            value={CardSize.medium}
            control={<Radio />}
            label="Medium"
          />
          <FormControlLabel
            value={CardSize.large}
            control={<Radio />}
            label="Large"
          />
        </RadioGroup>
      </FormControl>
      <DndCard size={size}>
        <PieContainer
          size={size}
          ref={containerRef}
          height={size === CardSize.large ? lContainerHeight : undefined}
          optionsCount={pieChartData.length}
          hasOverflow={hasOptionsOverflow(size, pieChartData.length, false)}
        >
          <ReactECharts
            onChartInit={onChartInit}
            onRenderEnded={onRenderEnded}
            containerRef={containerRef}
            option={options[size]}
          />
        </PieContainer>
      </DndCard>
    </>
  );
}

export default PieChartWithImageOptions;
