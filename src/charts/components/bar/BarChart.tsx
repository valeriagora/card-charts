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
import {
  MIN_L_CHART_HEIGHT,
  OPTION_MARGIN_BOTTOM,
  TEXT_LINE_HEIGHT,
} from "@/charts/constants/shared";
import { Button } from "@mui/material";
import { ECharts } from "echarts";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { CardSize, CustomLegend } from "@/charts/types";
import { ChartContainer } from "@/charts/components/shared/ChartContainer";
import {
  BAR_HEIGHT,
  ML_GRID_BOTTOM_PADDING,
  ML_BAR_CHART_Y_GAP,
  // M_BAR_Y_PADDINGS,
} from "@/charts/constants/bar";

interface IBarProps {
  data: { name: string; value: number }[];
  legendData: CustomLegend;
  cardSize: CardSize;
  questionImage: string;
}
function BarChart({ data, legendData, cardSize, questionImage }: IBarProps) {
  const [barChartData, setBarChartData] = useState(data);
  const [barLegendData, setBarLegendData] = useState<CustomLegend>(legendData);
  const [questionImageUrl, setQuestionImageUrl] = useState("");
  const [showT2B, setShowT2B] = useState(false);
  const [isQuestionImageReady, setIsQuestionImageReady] = useState(false);
  const withImage = !!questionImageUrl;
  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);
  const [size, setSize] = useState<CardSize>(cardSize);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [downloadQueue, setDownloadQueue] = useState<string[]>([]);

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
  }, [barLegendData, questionImageUrl]);

  const downloadChart = async (chartInstance: ECharts) => {
    const url = await getSvgBlob(chartInstance);
    const anchorElement = document.createElement("a");
    anchorElement.href = url;
    anchorElement.download = `bar-chart-${size}.svg`;
    document.body.appendChild(anchorElement);
    anchorElement.click();
  };

  const saveAsImage = useCallback(async () => {
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
  const small = useMemo(
    () =>
      getSmOption(
        barChartData,
        barLegendData,
        hasOptionsOverflow(size, barChartData.length)
      ),
    [barChartData, size]
  );
  const medium = useMemo(
    () =>
      getMdOption(
        barChartData,
        barLegendData,
        withImage,
        hasOptionsOverflow(size, barChartData.length),
        showT2B,
        questionImageUrl
      ),
    [barChartData, size, withImage, showT2B, isQuestionImageReady]
  );
  const lContainerHeight =
    ML_GRID_BOTTOM_PADDING +
    BAR_HEIGHT * barChartData.length +
    (barChartData.length - 1) * ML_BAR_CHART_Y_GAP;
  // + M_BAR_Y_PADDINGS;
  const largeContainerHeight =
    lContainerHeight > MIN_L_CHART_HEIGHT
      ? lContainerHeight
      : MIN_L_CHART_HEIGHT;
  const large = useMemo(
    () =>
      getLgOption(
        barChartData,
        barLegendData,
        withImage,
        showT2B,
        questionImageUrl,
        largeContainerHeight
      ),
    [barChartData, barLegendData, withImage, showT2B, isQuestionImageReady]
  );
  const options = useMemo(
    () => ({
      small,
      medium,
      large,
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
          size === CardSize.small || (size === CardSize.medium && withImage)
        }
      >
        Toggle T2B/B2B
      </Button>
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
        <ChartContainer
          ref={containerRef}
          size={size}
          height={size === CardSize.large ? largeContainerHeight : undefined}
          optionsCount={barChartData.length}
          hasOverflow={hasOptionsOverflow(size, barChartData.length)}
        >
          {/* <BarsContainer
            height={
              size === CardSize.large
                ? 16 + 20 * barChartData.length + (barChartData.length - 1) * 8
                : getBarsContainerHeight(size, barChartData.length)
            }
          > */}
          <ReactECharts
            containerRef={containerRef}
            option={options[size]}
            onChartInit={onChartInit}
            onRenderEnded={onRenderEnded}
          />
          {/* </BarsContainer> */}
        </ChartContainer>
      </DndCard>
    </div>
  );
}

export default BarChart;