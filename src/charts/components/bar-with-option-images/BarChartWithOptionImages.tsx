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
import { getSmOption } from "@/charts/options/bar";
import {
  getMdOption,
  getLgOption,
} from "@/charts/options/bar-with-option-images";
import { MIN_CHART_HEIGHT_L } from "@/charts/constants/shared";
import { Button } from "@mui/material";
import { ECharts } from "echarts";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { CardSize, CustomLegendWithImage } from "@/charts/types";
import { ChartContainer } from "@/charts/components/shared/ChartContainer";
import {
  BAR_CHART_CONTAINER_PADDING_BOTTOM_ML,
  BAR_Y_GAP_WITH_OPTION_IMG_ML,
} from "@/charts/constants/bar";

interface IBarProps {
  data: { name: string; value: number }[];
  legendData: CustomLegendWithImage;
  cardSize: CardSize;
  questionImage: string;
}
function BarChartWithOptionImages({
  data,
  legendData,
  cardSize,
  questionImage,
}: IBarProps) {
  const [barChartData, setBarChartData] = useState(data);
  const [barLegendData, setBarLegendData] =
    useState<CustomLegendWithImage>(legendData);
  const [isSvgExporting, setIsSvgExporting] = useState(false);
  const [questionImageUrl, setQuestionImageUrl] = useState("");
  const [showT2B, setShowT2B] = useState(false);
  const [isQuestionImageReady, setIsQuestionImageReady] = useState(false);
  const withImage = !!questionImageUrl;
  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);
  const [size, setSize] = useState<CardSize>(cardSize);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [downloadQueue, setDownloadQueue] = useState<string[]>([]);
  const [areBase64ImagesReady, setBase64ImagesReady] = useState(false);

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
    const areBase64ImagesReady = barLegendData.every((legendItem) =>
      isBase64Image(legendItem[3])
    );
    const isQuestionImageReady = questionImageUrl
      ? isBase64Image(questionImageUrl)
      : true;
    setIsQuestionImageReady(isQuestionImageReady);
    setBase64ImagesReady(!!areBase64ImagesReady);
  }, [barLegendData, questionImageUrl]);
  const downloadChart = async (chartInstance: ECharts) => {
    const url = await getSvgBlob(chartInstance);
    const anchorElement = document.createElement("a");
    anchorElement.href = url;
    anchorElement.download = `bar-chart.svg`;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    setIsSvgExporting(false);
  };
  const saveAsImage = useCallback(async () => {
    setIsSvgExporting(true);
    if (size !== CardSize.small && !areBase64ImagesReady) {
      const base64Promises: Promise<string>[] = [];
      const optionImageUrls: any[] = barLegendData.map((item) => item[3]);
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
        setBarLegendData((prev: any) => {
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
  const small = getSmOption(
    barChartData,
    barLegendData,
    hasOptionsOverflow(size, barChartData.length, true)
  );
  const medium = getMdOption(
    barChartData,
    barLegendData,
    withImage,
    hasOptionsOverflow(size, barChartData.length, true),
    showT2B,
    questionImageUrl
  );
  const lContainerHeight =
    BAR_CHART_CONTAINER_PADDING_BOTTOM_ML +
    BAR_Y_GAP_WITH_OPTION_IMG_ML * barChartData.length +
    16 * barChartData.length;
  const largeContainerHeight =
    lContainerHeight > MIN_CHART_HEIGHT_L
      ? lContainerHeight
      : MIN_CHART_HEIGHT_L;
  const large = getLgOption(
    barChartData,
    barLegendData,
    withImage,
    showT2B,
    questionImageUrl,
    largeContainerHeight
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
            disabled={isSvgExporting}
            value={CardSize.small}
            control={<Radio />}
            label="Small"
          />
          <FormControlLabel
            disabled={isSvgExporting}
            value={CardSize.medium}
            control={<Radio />}
            label="Medium"
          />
          <FormControlLabel
            disabled={isSvgExporting}
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
          hasOverflow={hasOptionsOverflow(size, barChartData.length, true)}
          withOptionImages
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

export default BarChartWithOptionImages;
