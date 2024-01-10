"use client";
import { ReactECharts } from "@/components/ReactECharts";
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { DndCard } from "../page";
import {
  getSmOption,
  getMdOption,
  getLgOption,
  getBase64Image,
  getSvgBlob,
} from "@/data/bar";
import { url } from "../pie/page";
import { Button } from "@mui/material";
import { styled } from "@mui/material";
import { ECharts } from "echarts";
import Image from "next/image";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";

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

export const OPTION_IMAGE_HEIGHT = 72;
export const IMAGE_OPTIONS_X_GAP = 8;
export const IMAGE_OPTIONS_LINE_Y_GAP = 8;
export const BAR_CHART_ML_BOTTOM_PADDING = 18;
export const BAR_CHART_S_BOTTOM_PADDING = 20;
export const BAR_CHART_S_OPTION_HEIGHT = 20;
export const BAR_CHART_S_OVERFLOW_INFO_HEIGHT = 20;

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
    // border: "1px solid pink",
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
  console.log("hasOverflow", hasOverflow);

  // needed to set the fixed height of chart container and show overflow text
  return (
    <BarChartContainer
      size={size}
      optionsCount={optionsCount}
      ref={ref}
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

const imageUrls = [
  "https://images.unsplash.com/photo-1702744473287-4cc284e97206?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682686580391-615b1f28e5ee?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1702893576128-21feb60299d1?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1703028408829-ba45aa14b782?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1519925610903-381054cc2a1c?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682687218147-9806132dc697?q=80&w=2875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1703615318360-788893a586d8?q=80&w=2785&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682687982029-edb9aecf5f89?q=80&w=2942&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1704192761191-757e0ccc5186?q=80&w=2944&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1704587422648-43f456047a72?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682687220795-796d3f6f7000?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1704419278767-09bc3a98581c?q=80&w=2875&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];

const urlToBase64 = async (url: string) => {
  let result = await getBase64Image(url);
  return result;
};
export enum CardSize {
  small = "small",
  medium = "medium",
  large = "large",
}
interface IBarProps {
  labels: { [key: string]: string };
  values: number[];
  imageOptionUrls?: string[];
  cardSize: CardSize;
}
const barLabels = {
  exciting:
    "Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting Exciting",
  intriguing:
    "Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing IntriguingIntriguingIntriguing",
  closeEnded: "Close-ended",
  boring: "Boring",
  engaging: "Engaging",
  option1: "Option 1",
  option2: "Option 2",
  option3: "Option 3",
  option4: "Option 4",
  option5: "Option 5",
  option6: "Option 6",
  option7: "Option 7",
};
const barValues = [50, 20, 5, 24, 1, 2, 3, 4, 5, 6, 7, 8];
function Bar({
  labels = barLabels,
  values = barValues,
  imageOptionUrls = undefined,
  // imageOptionUrls = imageUrls,
  cardSize = CardSize.large,
}: IBarProps) {
  const [barData, setBarData] = useState<{
    labels: { [key: string]: string };
    values: number[];
    images?: string[];
  }>({
    labels,
    values,
    images: cardSize === CardSize.small ? undefined : imageUrls,
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
        images: imageUrls,
      });
    }
    if (size === CardSize.medium && mdHasOverflow) {
      setBarData({
        values: withImageOptions ? values.slice(0, 4) : values.slice(0, 11),
        labels: withImageOptions
          ? Object.fromEntries(Object.entries(labels).slice(0, 4))
          : Object.fromEntries(Object.entries(labels).slice(0, 11)),
        images: imageUrls,
      });
    }
    if (size === CardSize.small && smHasOverflow) {
      setBarData({
        values: values.slice(0, 5),
        labels: Object.fromEntries(Object.entries(labels).slice(0, 5)),
        images: undefined,
      });
    }
  }, [size, smHasOverflow, mdHasOverflow, withImageOptions, values, labels]);

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
          const base64Images = imageUrls.map(
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

export default Bar;
