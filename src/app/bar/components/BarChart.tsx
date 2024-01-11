"use client";
import { ReactECharts } from "@/components/ReactECharts";
import React, {
  forwardRef,
  LegacyRef,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { DndCard } from "@/components/DndCard";
import {
  getSmOption,
  getMdOption,
  getLgOption,
  getBase64Image,
  getSvgBlob,
} from "@/data/bar";
import { url } from "../../../data/constants";
import { Button } from "@mui/material";
import { styled } from "@mui/material";
import { ECharts } from "echarts";
import Image from "next/image";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import {
  OPTION_IMAGE_HEIGHT,
  IMAGE_OPTIONS_LINE_Y_GAP,
  BAR_CHART_ML_BOTTOM_PADDING,
} from "../constants";
import { CardSize } from "../types";

const barContainerHeights = {
  small: 120,
  medium: 344,
  large: "auto",
};
const OverflowInfo = styled("div")({
  position: "absolute",
  bottom: 0,
  right: 0,
  display: "flex",
  alignItems: "center",
  gap: 4,
  fontWeight: 500,
  fontSize: 12,
  lineHeight: "20px",
  fontFamily: '"Manrope", sans-serif',
  color: "#6C7080",
});

const BarChartContainer = styled("div")<{
  optionsCount: number;
  size: CardSize;
  withImageOptions: boolean;
}>(({ optionsCount, size, withImageOptions }) => {
  const maxHeight = barContainerHeights[size];
  return {
    position: "relative",
    width: "100%",
    height:
      size === CardSize.large
        ? withImageOptions
          ? OPTION_IMAGE_HEIGHT * optionsCount +
            IMAGE_OPTIONS_LINE_Y_GAP * (optionsCount - 1) +
            BAR_CHART_ML_BOTTOM_PADDING
          : optionsCount * 60 + 28
        : maxHeight,
  };
});

interface IBarOptionsOverflow {
  small: {
    simple: number;
    withImgOptions: number;
  };
  medium: {
    simple: number;
    withImgOptions: number;
  };
}
const barOptionsOverflow: IBarOptionsOverflow = {
  small: { simple: 5, withImgOptions: 5 },
  medium: {
    simple: 11,
    withImgOptions: 4,
  },
};

const BarContainer = forwardRef(function Container(
  {
    optionsCount,
    children,
    size,
    withImageOptions,
    hasOverflow,
  }: {
    optionsCount: number;
    children: ReactNode;
    size: CardSize;
    withImageOptions: boolean;
    hasOverflow: boolean;
  },
  ref
) {
  // needed to set the fixed height of chart container and show overflow text
  return (
    <BarChartContainer
      size={size}
      optionsCount={optionsCount}
      ref={ref as LegacyRef<HTMLDivElement>}
      withImageOptions={withImageOptions}
    >
      {children}
      {hasOverflow && (
        <OverflowInfo>
          {withImageOptions && size !== CardSize.large
            ? barOptionsOverflow[size].withImgOptions
            : barOptionsOverflow[size as CardSize.small | CardSize.medium]
                .simple}{" "}
          / {optionsCount} options{" "}
          <Image width={16} height={16} src={"/info.svg"} alt="info" />
        </OverflowInfo>
      )}
    </BarChartContainer>
  );
});

const urlToBase64 = async (url: string) => {
  let result = await getBase64Image(url);
  return result;
};

interface IBarProps {
  labels: { [key: string]: string };
  values: number[];
  imageOptionUrls?: string[];
  cardSize: CardSize;
}
function BarChart({ labels, values, imageOptionUrls, cardSize }: IBarProps) {
  const [barData, setBarData] = useState<{
    labels: { [key: string]: string };
    values: number[];
    images?: string[];
  }>({
    labels,
    values,
    images: cardSize === CardSize.small ? undefined : imageOptionUrls,
  });

  const [imageUrl, setImageUrl] = useState("");
  const [showT2B, setShowT2B] = useState(false);

  const withImage = !!imageUrl;
  const withImageOptions = !!(imageOptionUrls && imageOptionUrls.length);
  const smHasOverflow = values.length > 5;
  const mdHasOverflow = withImageOptions
    ? values.length > 4
    : values.length > 11;

  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);
  const [size, setSize] = useState<CardSize>(cardSize);
  const [isChartDownloading, setIsChartDownloading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (size === CardSize.large) {
      setBarData({
        values,
        labels,
        images: imageOptionUrls,
      });
    }
    if (size === CardSize.medium && mdHasOverflow) {
      setBarData({
        values: withImageOptions ? values.slice(0, 4) : values.slice(0, 11),
        labels: withImageOptions
          ? Object.fromEntries(Object.entries(labels).slice(0, 4))
          : Object.fromEntries(Object.entries(labels).slice(0, 11)),
        images: imageOptionUrls,
      });
    }
    if (size === CardSize.small && smHasOverflow) {
      setBarData({
        values: values.slice(0, 5),
        labels: Object.fromEntries(Object.entries(labels).slice(0, 5)),
        images: undefined,
      });
    }
  }, [
    size,
    smHasOverflow,
    mdHasOverflow,
    withImageOptions,
    values,
    labels,
    imageOptionUrls,
  ]);

  const toggleImg = () => {
    setImageUrl(imageUrl ? "" : url);
  };
  const toggleT2B = () => {
    setShowT2B(!showT2B);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value as CardSize);
  };

  const onRenderEnded = () => {
    // save as svg for chart with option images
    isChartDownloading && chartInstance && downloadChart(chartInstance);
  };

  const onChartInit = (chartInstance: ECharts) => {
    setChartInstance(chartInstance);
  };
  const downloadChart = async (chartInstance: ECharts) => {
    const url = await getSvgBlob(chartInstance);
    const anchorElement = document.createElement("a");
    anchorElement.href = url;
    anchorElement.download = `chart.svg`;
    document.body.appendChild(anchorElement);
    anchorElement.click();
    setIsChartDownloading(false);
  };

  const saveAsImage = useCallback(async () => {
    if (chartInstance) {
      if (withImageOptions) {
        // upload base64 images
        const base64Promises: Promise<string>[] = [];
        for (const url of imageOptionUrls) {
          base64Promises.push(urlToBase64(url));
        }
        const getBase64Promises = async () =>
          await Promise.all(base64Promises).then((values) => values);

        const base64Urls = await getBase64Promises();
        if (base64Urls.length) {
          const base64Images = imageOptionUrls.map(
            (imageUrl, idx) => base64Urls[idx]
          );
          setBarData((prev) => ({
            ...prev,
            images: cardSize === CardSize.small ? undefined : base64Images,
          }));
          setIsChartDownloading(true);
        }
        return;
      }
      // save as svg without option images
      downloadChart(chartInstance);
    }
  }, [chartInstance, withImageOptions, imageOptionUrls, cardSize]);
  const overflows = {
    small: smHasOverflow,
    medium: mdHasOverflow,
    large: false,
  };
  const small = getSmOption(barData, overflows[size]);
  const medium = getMdOption(
    barData,
    withImage,
    withImageOptions,
    overflows[size],
    showT2B
  );
  const large = getLgOption(barData, withImage, withImageOptions, showT2B);
  const options = {
    small,
    medium,
    large,
  };
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
      <DndCard size={size} imageUrl={imageUrl}>
        <BarContainer
          ref={containerRef}
          size={size}
          optionsCount={values.length}
          // optionsCount={barData.values.length}
          hasOverflow={overflows[size]}
          withImageOptions={withImageOptions}
        >
          <ReactECharts
            containerRef={containerRef}
            option={options[size]}
            onChartInit={onChartInit}
            onRenderEnded={onRenderEnded}
          />
        </BarContainer>
      </DndCard>
    </div>
  );
}

export default BarChart;
