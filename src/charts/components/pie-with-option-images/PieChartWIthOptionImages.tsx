"use client";
import { ReactECharts } from "@/charts/components/shared/ReactECharts";
import {
  Button,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  FormLabel,
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
import {
  getMdOption,
  getLgOption,
} from "@/charts/options/pie-with-option-images";
import { getSmOption } from "@/charts/options/pie";
import {
  chartOptionsOverflow,
  L_LEGEND_IMAGE_OPTIONS_MAX_SYMBOLS_COUNT,
  L_LEGEND_IMAGE_OPTIONS_WITH_IMAGE_MAX_SYMBOLS_COUNT,
  OPTION_MARGIN_BOTTOM,
  OPTION_IMAGE_SIDE,
  TEXT_LINE_HEIGHT,
  MIN_L_CHART_HEIGHT,
} from "@/charts/constants/shared";
import { DndCard } from "@/charts/components/shared/DndCard";
import { CardSize, CustomLegendWithImage } from "@/charts/types";
import { ECharts } from "echarts";
import { ChartContainer } from "@/charts/components/shared/ChartContainer";
import {
  breakWord,
  getSvgBlob,
  isBase64Image,
  registerCoverShape,
  resizeImageBase64,
  urlToBase64,
} from "@/charts/utils";
import { OverflowInfo } from "@/charts/components/shared/styledComponents";
import Image from "next/image";
import { PieData } from "@/charts/types";

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
    <ChartContainer
      size={size}
      height={height}
      ref={ref as LegacyRef<HTMLDivElement>}
    >
      {children}
      {hasOverflow && (
        <OverflowInfo>
          {size !== CardSize.large &&
            chartOptionsOverflow[size as CardSize.small | CardSize.medium]
              .withImgOptions}
          / {optionsCount} options{" "}
          <Image width={16} height={16} src={"/info.svg"} alt="info" />
        </OverflowInfo>
      )}
    </ChartContainer>
  );
});

const hasOptionsOverflow = (
  size: CardSize,
  length: number,
  withImageOptions: boolean = false
) => {
  if (size === CardSize.large) return false;
  return withImageOptions
    ? length > chartOptionsOverflow[size].withImgOptions
    : length > chartOptionsOverflow[size].default;
};
function PieChartWIthOptionImages({
  cardSize = CardSize.small,
  questionImage,
  pieData,
  legendData,
}: any) {
  useEffect(() => {
    registerCoverShape();
  }, []);
  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);
  const onChartInit = useCallback((chartInstance: ECharts) => {
    setChartInstance(chartInstance);
  }, []);
  const [pieChartData, setPieChartData] = useState<PieData[]>(pieData);
  const [pieLegendData, setPieLegendData] = useState(legendData);
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
          ? L_LEGEND_IMAGE_OPTIONS_WITH_IMAGE_MAX_SYMBOLS_COUNT
          : L_LEGEND_IMAGE_OPTIONS_MAX_SYMBOLS_COUNT
      ).length;
      total.push(linesCount);
      return total;
    },
    []
  );
  const L_MAX_LINES = Math.floor(OPTION_IMAGE_SIDE / TEXT_LINE_HEIGHT);
  const optionHeights = optionsWithImagesLines.map((lines) => {
    if (lines > L_MAX_LINES) {
      return lines * TEXT_LINE_HEIGHT;
    }
    return OPTION_IMAGE_SIDE;
  });

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
    const url = await getSvgBlob(chartInstance);
    const anchorElement = document.createElement("a");
    anchorElement.href = url;
    anchorElement.download = `pie-chart-${size}.svg`;
    document.body.appendChild(anchorElement);
    anchorElement.click();
  };

  const saveAsImage = useCallback(async () => {
    if (size !== CardSize.small && !areBase64ImagesReady) {
      const base64Promises: Promise<string>[] = [];
      const optionImageUrls: string[] = pieLegendData.map((item) => item[3]);
      for (const url of optionImageUrls) {
        base64Promises.push(
          urlToBase64(url).then((base64: string) =>
            resizeImageBase64(base64, 200)
          )
        );
      }
      const getBase64Promises = async () =>
        await Promise.all(base64Promises).then((values) => values);
      const base64Urls = await getBase64Promises();
      if (base64Urls.length) {
        setPieLegendData((prev: any) => {
          const newData = prev.map(
            (item: CustomLegendWithImage, idx: number) => [
              ...item.slice(0, 3),
              base64Urls[idx],
            ]
          );
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
      const base64 = urlToBase64(questionImageUrl).then((base64: string) =>
        resizeImageBase64(base64, 200)
      );
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
    const areBase64ImagesReady = pieLegendData.every((legendItem) =>
      isBase64Image(legendItem[3])
    );
    const isQuestionImageReady = questionImageUrl
      ? isBase64Image(questionImageUrl)
      : true;

    setIsQuestionImageReady(isQuestionImageReady);
    setBase64ImagesReady(!!areBase64ImagesReady);
  }, [pieLegendData, questionImageUrl]);
  useEffect(() => {
    if (
      downloadQueue.length &&
      areBase64ImagesReady &&
      chartInstance &&
      isQuestionImageReady
    ) {
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
          hasOverflow={hasOptionsOverflow(size, pieChartData.length, true)}
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

export default PieChartWIthOptionImages;
