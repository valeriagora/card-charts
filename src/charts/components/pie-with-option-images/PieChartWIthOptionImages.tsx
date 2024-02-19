"use client";
import {
  ReactECharts,
  ReactEChartsProps,
} from "@/charts/components/shared/ReactECharts";
import {
  Button,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  FormLabel,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  getMdOption,
  getLgOption,
} from "@/charts/options/pie-with-option-images";
import { getSmOption } from "@/charts/options/pie";
import {
  OPTION_IMAGE_SIDE,
  TEXT_LINE_HEIGHT,
  MIN_CHART_HEIGHT_L,
} from "@/charts/constants/shared";
import {
  PIE_LEGEND_ITEM_Y_GAP_ML,
  PIE_MAX_SYMBOLS,
} from "@/charts/constants/pie";
import { DndCard } from "@/charts/components/shared/DndCard";
import {
  CardSize,
  CustomLegendWithImage,
  CustomLegendWithImageItem,
  IBreakpoint,
  IPieBarData,
} from "@/charts/types";
import { ECharts } from "echarts";
import { ChartContainer } from "@/charts/components/shared/ChartContainer";
import {
  breakWord,
  getSvgBlob,
  hasOptionsOverflow,
  isBase64Image,
  registerCoverShape,
  resizeImageBase64,
  urlToBase64,
} from "@/charts/utils";

interface IPieChartWithOptionImages {
  data: IPieBarData[];
  legendData: CustomLegendWithImage;
  cardSize: CardSize;
  questionImage: string;
}
function PieChartWIthOptionImages({
  data,
  legendData,
  cardSize = CardSize.small,
  questionImage,
}: IPieChartWithOptionImages) {
  useEffect(() => {
    registerCoverShape();
  }, []);
  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);
  const onChartInit = useCallback((chartInstance: ECharts) => {
    setChartInstance(chartInstance);
  }, []);
  const [pieLegendData, setPieLegendData] = useState(legendData);
  const [isSvgExporting, setIsSvgExporting] = useState(false);
  const [questionImageUrl, setQuestionImageUrl] = useState("");
  const [isQuestionImageReady, setIsQuestionImageReady] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [downloadQueue, setDownloadQueue] = useState<string[]>([]);
  const [areBase64ImagesReady, setBase64ImagesReady] = useState(false);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const breakpoint = IBreakpoint[matches ? "large" : "medium"];
  const optionsWithImagesLines = data.reduce(
    (total: number[], current: any) => {
      const { name } = current;
      const largeMaxSymbols = PIE_MAX_SYMBOLS[breakpoint].large.withOptionImgs;
      const linesCount = breakWord(
        `${name}`,
        questionImageUrl
          ? largeMaxSymbols.withQuestionImg
          : largeMaxSymbols.default
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
    PIE_LEGEND_ITEM_Y_GAP_ML * (optionHeights.length - 1);
  const lContainerHeight =
    largeContainerHeight < MIN_CHART_HEIGHT_L
      ? MIN_CHART_HEIGHT_L
      : largeContainerHeight;
  const [size, setSize] = useState<CardSize>(cardSize);
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
    setIsSvgExporting(false);
  };

  const saveAsImage = useCallback(async () => {
    setIsSvgExporting(true);
    const isQuestionImageReady = questionImageUrl
      ? isBase64Image(questionImageUrl)
      : true;
    if (size !== CardSize.small && !areBase64ImagesReady) {
      const base64Promises: Promise<string>[] = [];
      const optionImageUrls: string[] = pieLegendData.map(
        (item: CustomLegendWithImageItem) => item[3]
      );
      for (const url of optionImageUrls) {
        const b64 = urlToBase64(url).then((base64: string) =>
          resizeImageBase64(base64, 200)
        );
        base64Promises.push(b64);
      }
      const getBase64Promises = async () =>
        await Promise.all(base64Promises).then((values) => {
          return values;
        });

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
      }
    }
    if (size !== CardSize.small && !isQuestionImageReady) {
      const base64 = urlToBase64(questionImageUrl).then((base64: string) =>
        resizeImageBase64(base64, 200)
      );
      const base64QImg = await Promise.resolve(base64);
      base64QImg && setQuestionImageUrl(base64QImg);
    }
    if (size === CardSize.small) {
      chartInstance && downloadChart(chartInstance);
    } else {
      setDownloadQueue([...downloadQueue, "download"]);
    }
  }, [
    downloadQueue,
    chartInstance,
    size,
    questionImageUrl,
    areBase64ImagesReady,
    isQuestionImageReady,
  ]);
  const onRenderEnded = useCallback(() => {
    const areBase64ImagesReady = pieLegendData.every(
      (legendItem: [number, number, string, string]) =>
        isBase64Image(legendItem[3] as string)
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
  const small = useMemo(
    () => getSmOption(data, pieLegendData, breakpoint),
    [data, pieLegendData, breakpoint]
  );
  const medium = useMemo(
    () => getMdOption(data, pieLegendData, questionImageUrl, breakpoint),
    [data, pieLegendData, questionImageUrl, breakpoint]
  );
  const large = useMemo(
    () =>
      getLgOption(
        data,
        pieLegendData,
        questionImageUrl,
        optionHeights,
        optionsWithImagesLines,
        lContainerHeight,
        breakpoint
      ),
    [
      data,
      pieLegendData,
      questionImageUrl,
      optionHeights,
      optionsWithImagesLines,
      lContainerHeight,
      breakpoint,
    ]
  );
  const options = useMemo(
    () => ({
      S: small,
      M: medium,
      L: large,
    }),
    [small, medium, , large]
  );

  return (
    <>
      <Button
        sx={{ marginBottom: 4, display: "block" }}
        variant="contained"
        onClick={toggleImg}
        disabled={size === CardSize.small || isSvgExporting}
      >
        Toggle image
      </Button>
      <Button
        sx={{ marginBottom: 4, display: "block" }}
        variant="contained"
        onClick={saveAsImage}
        disabled={isSvgExporting}
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
            disabled={isSvgExporting}
          />
          <FormControlLabel
            value={CardSize.medium}
            control={<Radio />}
            label="Medium"
            disabled={isSvgExporting}
          />
          <FormControlLabel
            value={CardSize.large}
            control={<Radio />}
            label="Large"
            disabled={isSvgExporting}
          />
        </RadioGroup>
      </FormControl>
      <DndCard size={size}>
        <ChartContainer
          size={size}
          ref={containerRef}
          height={size === CardSize.large ? lContainerHeight : undefined}
          optionsCount={data.length}
          hasOverflow={hasOptionsOverflow(size, data.length, true)}
          withOptionImages
          breakpoint={breakpoint}
        >
          <ReactECharts
            onChartInit={onChartInit}
            onRenderEnded={onRenderEnded}
            containerRef={containerRef}
            option={options[size] as ReactEChartsProps["option"]}
          />
        </ChartContainer>
      </DndCard>
    </>
  );
}

export default PieChartWIthOptionImages;
