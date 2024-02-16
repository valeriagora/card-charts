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
import { getSmOption, getMdOption, getLgOption } from "@/charts/options/pie";
import { DndCard } from "@/charts/components/shared/DndCard";
import {
  CardSize,
  CustomLegend,
  IBreakpoint,
  IPieBarData,
} from "@/charts/types";
import { ECharts } from "echarts";
import {
  breakWord,
  getSvgBlob,
  hasOptionsOverflow,
  isBase64Image,
  registerCoverShape,
  resizeImageBase64,
  urlToBase64,
} from "@/charts/utils";
import {
  TEXT_LINE_HEIGHT,
  MIN_CHART_HEIGHT_L,
} from "@/charts/constants/shared";
import {
  pieMaxSymbols,
  PIE_LEGEND_ITEM_Y_GAP_ML,
} from "@/charts/constants/pie";
import { PieData } from "@/charts/types";
import { ChartContainer } from "@/charts/components/shared/ChartContainer";

interface IPieChartProps {
  data: IPieBarData[];
  legendData: CustomLegend;
  cardSize: CardSize;
  questionImage: string;
}
function PieChart({
  data,
  legendData,
  cardSize = CardSize.small,
  questionImage,
}: IPieChartProps) {
  useEffect(() => {
    registerCoverShape();
  }, []);
  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);
  const [isSvgExporting, setIsSvgExporting] = useState(false);
  const onChartInit = useCallback((chartInstance: ECharts) => {
    setChartInstance(chartInstance);
  }, []);
  const [questionImageUrl, setQuestionImageUrl] = useState("");
  const [isQuestionImageReady, setIsQuestionImageReady] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [downloadQueue, setDownloadQueue] = useState<string[]>([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"), {
    noSsr: true,
  });
  const optionsLines = data.reduce((total: number[], current: any) => {
    const { name } = current;
    const largeMaxSymbols = pieMaxSymbols.large.withoutOptionImgs;
    const linesCount = breakWord(
      `${name}`,
      questionImageUrl
        ? largeMaxSymbols.withQuestionImg
        : largeMaxSymbols.default
    ).length;
    total.push(linesCount);
    return total;
  }, []);
  const optionHeights = optionsLines.map((lines) => lines * TEXT_LINE_HEIGHT);

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
    isQuestionImageReady,
  ]);
  const onRenderEnded = useCallback(() => {
    const isQuestionImageReady = questionImageUrl
      ? isBase64Image(questionImageUrl)
      : true;
    setIsQuestionImageReady(isQuestionImageReady);
  }, [legendData, questionImageUrl]);
  useEffect(() => {
    if (downloadQueue.length && chartInstance && isQuestionImageReady) {
      setTimeout(() => {
        downloadChart(chartInstance);
        setDownloadQueue((prev) => prev.slice(0, -1));
      }, 1000);
    }
  }, [downloadQueue, isQuestionImageReady, chartInstance]);
  const breakpoint = IBreakpoint[matches ? "large" : "medium"];
  const small = useMemo(
    () => getSmOption(data, legendData, breakpoint),
    [data, legendData, breakpoint]
  );
  const medium = useMemo(
    () => getMdOption(data, legendData, questionImageUrl, breakpoint),
    [data, legendData, questionImageUrl, breakpoint]
  );
  const large = useMemo(
    () =>
      getLgOption(
        data,
        legendData,
        questionImageUrl,
        optionHeights,
        optionsLines,
        lContainerHeight,
        breakpoint
      ),
    [
      data,
      legendData,
      questionImageUrl,
      optionHeights,
      optionsLines,
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
    [small, medium, large]
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
        <ChartContainer
          size={size}
          ref={containerRef}
          height={size === CardSize.large ? lContainerHeight : undefined}
          optionsCount={data.length}
          hasOverflow={hasOptionsOverflow(size, data.length, false)}
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

export default PieChart;
