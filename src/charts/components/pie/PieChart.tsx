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
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getSmOption, getMdOption, getLgOption } from "@/charts/options/pie";
import { DndCard } from "@/charts/components/shared/DndCard";
import { CardSize, CustomLegend } from "@/charts/types";
import { ECharts } from "echarts";
import {
  breakWord,
  getBase64Image,
  getSvgBlob,
  hasOptionsOverflow,
  isBase64Image,
  registerCoverShape,
} from "@/charts/utils";
import {
  L_LEGEND_MAX_SYMBOLS_COUNT,
  L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT,
  OPTION_MARGIN_BOTTOM,
  TEXT_LINE_HEIGHT,
  MIN_L_CHART_HEIGHT,
  url,
} from "@/charts/constants/shared";
import { PieData } from "@/charts/types";
import { ChartContainer } from "@/charts/components/shared/ChartContainer";
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

const customSeriesData: CustomLegend = pieData.map(({ value, name }, idx) => [
  value,
  idx + 1,
  name,
]);

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
  const optionsLines = pieChartData.reduce((total: number[], current: any) => {
    const { name } = current;
    const linesCount = breakWord(
      `${name}`,
      questionImageUrl
        ? L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT
        : L_LEGEND_MAX_SYMBOLS_COUNT
    ).length;
    total.push(linesCount);
    return total;
  }, []);
  const optionHeights = optionsLines.map((lines) => lines * TEXT_LINE_HEIGHT);

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
  const urlToBase64 = async (url: string) => {
    let result = await getBase64Image(url);
    return result;
  };
  const saveAsImage = useCallback(async () => {
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
  }, [downloadQueue, isQuestionImageReady, chartInstance]);
  const small = getSmOption(pieChartData, pieLegendData);
  const medium = getMdOption(pieChartData, pieLegendData, questionImageUrl);
  const large = getLgOption(
    pieChartData,
    pieLegendData,
    questionImageUrl,
    optionHeights,
    optionsLines,
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
        <ChartContainer
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
        </ChartContainer>
      </DndCard>
    </>
  );
}

export default PieChartWithImageOptions;
