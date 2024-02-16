"use client";
import { ReactECharts } from "@/charts/components/shared/ReactECharts";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DndCard } from "@/charts/components/shared/DndCard";
import {
  getSvgBlob,
  hasOptionsOverflow,
  isBase64Image,
  registerCoverShape,
  resizeImageBase64,
  urlToBase64,
} from "@/charts/utils";
import { getSmOption, getMdOption, getLgOption } from "@/charts/options/bar";
import { MIN_CHART_HEIGHT_L } from "@/charts/constants/shared";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { ECharts } from "echarts";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  CardSize,
  CustomLegend,
  IBreakpoint,
  IPieBarData,
} from "@/charts/types";
import { ChartContainer } from "@/charts/components/shared/ChartContainer";
import {
  BAR_HEIGHT,
  BAR_CHART_CONTAINER_PADDING_BOTTOM_ML,
  BAR_Y_GAP_ML,
} from "@/charts/constants/bar";

interface IBarProps {
  data: IPieBarData[];
  legendData: CustomLegend;
  cardSize: CardSize;
  questionImage: string;
}
function BarChart({ data, legendData, cardSize, questionImage }: IBarProps) {
  const [isSvgExporting, setIsSvgExporting] = useState(false);
  const [questionImageUrl, setQuestionImageUrl] = useState("");
  const [showT2B, setShowT2B] = useState(false);
  const [isQuestionImageReady, setIsQuestionImageReady] = useState(false);
  const withImage = !!questionImageUrl;
  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);
  const [size, setSize] = useState<CardSize>(cardSize);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [downloadQueue, setDownloadQueue] = useState<string[]>([]);
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up("lg"), {
    noSsr: true,
  });

  useEffect(() => {
    registerCoverShape();
  }, []);

  const toggleImg = () => {
    setQuestionImageUrl(questionImageUrl ? "" : questionImage);
  };
  const toggleT2B = () => {
    setShowT2B(!showT2B);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value as CardSize);
  };

  const onRenderEnded = useCallback(() => {
    const isQuestionImageReady = questionImageUrl
      ? isBase64Image(questionImageUrl)
      : true;
    setIsQuestionImageReady(isQuestionImageReady);
  }, [legendData, questionImageUrl]);

  const downloadChart = async (chartInstance: ECharts) => {
    const url = await getSvgBlob(chartInstance);
    const anchorElement = document.createElement("a");
    anchorElement.href = url;
    anchorElement.download = `bar-chart-${size}.svg`;
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
  const breakpoint = matches ? IBreakpoint.large : IBreakpoint.medium;
  const small = useMemo(
    () =>
      getSmOption(
        data,
        legendData,
        hasOptionsOverflow(size, data.length),
        breakpoint
      ),
    [data, size, breakpoint]
  );
  const medium = useMemo(
    () =>
      getMdOption(
        data,
        legendData,
        withImage,
        hasOptionsOverflow(size, data.length),
        showT2B,
        questionImageUrl,
        breakpoint
      ),
    [data, size, withImage, showT2B, isQuestionImageReady, breakpoint]
  );
  const lContainerHeight =
    BAR_CHART_CONTAINER_PADDING_BOTTOM_ML +
    BAR_HEIGHT * data.length +
    (data.length - 1) * BAR_Y_GAP_ML;
  const largeContainerHeight =
    lContainerHeight > MIN_CHART_HEIGHT_L
      ? lContainerHeight
      : MIN_CHART_HEIGHT_L;
  const large = useMemo(
    () =>
      getLgOption(
        data,
        legendData,
        withImage,
        showT2B,
        questionImageUrl,
        largeContainerHeight,
        breakpoint
      ),
    [data, legendData, withImage, showT2B, isQuestionImageReady, breakpoint]
  );
  const options = useMemo(
    () => ({
      S: small,
      M: medium,
      L: large,
    }),
    [small, medium, , large]
  );

  useEffect(() => {
    if (downloadQueue.length && chartInstance && isQuestionImageReady) {
      setTimeout(() => {
        downloadChart(chartInstance);
        setDownloadQueue((prev) => prev.slice(0, -1));
      }, 1000);
    }
  }, [downloadQueue, isQuestionImageReady, chartInstance]);
  const onChartInit = useCallback((chartInstance: ECharts) => {
    setChartInstance(chartInstance);
  }, []);

  return (
    <div
      style={{
        margin: "auto",
        width: 992,
        minHeight: "calc(100vh - 36.5px)",
        border: "2px solid #ddd",
      }}
    >
      <Button
        sx={{ marginBottom: 4, display: "block" }}
        variant="contained"
        onClick={toggleT2B}
        disabled={
          size === CardSize.small ||
          (size === CardSize.medium && withImage) ||
          isSvgExporting
        }
      >
        Toggle T2B/B2B
      </Button>
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
          ref={containerRef}
          size={size}
          height={size === CardSize.large ? largeContainerHeight : undefined}
          optionsCount={data.length}
          hasOverflow={hasOptionsOverflow(size, data.length)}
          breakpoint={breakpoint}
        >
          <ReactECharts
            containerRef={containerRef}
            option={options[size]}
            onChartInit={onChartInit}
            onRenderEnded={onRenderEnded}
          />
        </ChartContainer>
      </DndCard>
    </div>
  );
}

export default BarChart;
