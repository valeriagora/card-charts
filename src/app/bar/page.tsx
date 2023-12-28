"use client";
import { ReactECharts } from "@/components/ReactECharts";
import React, {
  forwardRef,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import { LargeCard, MediumCard, DndCard } from "../page";
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

const barContainerHeights = {
  sm: 120,
  md: 344,
  lg: "auto",
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
  size: "sm" | "md" | "lg";
  withImageOptions: boolean;
}>(({ optionsCount, size, withImageOptions }) => {
  const maxHeight = barContainerHeights[size];
  return {
    position: "relative",
    width: "100%",
    height:
      size === CardSize.lg
        ? withImageOptions
          ? 72 * optionsCount + 30
          : 40 * optionsCount
        : maxHeight,
  };
});

interface IBarOptionsOverflow {
  sm: {
    simple: number;
    withImgOptions: number;
  };
  md: {
    simple: number;
    withImgOptions: number;
  };
}
const barOptionsOverflow: IBarOptionsOverflow = {
  sm: { simple: 5, withImgOptions: 5 },
  md: {
    simple: 11,
    withImgOptions: 4,
  },
};

const BarContainer = forwardRef(function Container(
  {
    length,
    children,
    size,
    withImageOptions,
    hasOverflow,
  }: {
    length: number;
    children: ReactNode;
    size: "sm" | "md" | "lg";
    withImageOptions: boolean;
    hasOverflow: boolean;
  },
  ref
) {
  return (
    <BarChartContainer
      size={size}
      optionsCount={length}
      ref={ref}
      withImageOptions={withImageOptions}
    >
      {children}
      {hasOverflow && (
        <OverflowInfo>
          {withImageOptions && size !== "lg"
            ? barOptionsOverflow[size].withImgOptions
            : barOptionsOverflow[size as "sm" | "md"].simple}{" "}
          / {length} options{" "}
          <Image width={16} height={16} src={"/info.svg"} alt="1" />
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
];
const labels = [
  "exciting",
  "intriguing",
  "closeEnded",
  "boring",
  "engaging",
  "option1",
  "option2",
  "option3",
];

const urlToBase64 = async (url: string) => {
  let result = await getBase64Image(url);
  return result;
};
enum CardSize {
  sm = "sm",
  md = "md",
  lg = "lg",
}
interface IBarProps {
  imageOptionUrls?: string[];
  cardSize: CardSize;
}
function Bar({
  imageOptionUrls = imageUrls,
  cardSize = CardSize.lg,
}: IBarProps) {
  const imgs =
    imageOptionUrls && imageOptionUrls?.length
      ? labels.reduce((total: { [key: string]: string }, label, idx) => {
          total[label] = imageOptionUrls[idx];
          return total;
        }, {})
      : undefined;
  const [barData, setBarData] = useState<{
    labels: { [key: string]: string };
    values: number[];
    images?: { [key: string]: string };
  }>({
    labels: {
      exciting: "Exciting",
      intriguing:
        "Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing Intriguing",
      closeEnded: "Close-ended",
      boring: "Boring",
      engaging: "Engaging",
      option1: "Option 1",
      option2: "Option 2",
      option3: "Option 3",
    },
    values: [50, 20, 5, 24, 1, 2, 3, 4],
    images: imgs,
  });

  const [imageUrl, setImageUrl] = useState("");

  const withImage = !!imageUrl;
  const withImageOptions = !!(imageOptionUrls && imageOptionUrls.length);
  const smHasOverflow = barData.values.length > 5;
  const mdHasOverflow = withImageOptions
    ? barData.values.length > 4
    : barData.values.length > 11;

  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);
  const [size, setSize] = useState<CardSize>(cardSize);
  const [isChartDownloading, setIsChartDownloading] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const toggleImg = () => {
    setImageUrl(imageUrl ? "" : url);
  };

  const changeContainerSize = () => {
    setSize(CardSize.md);
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
          const base64Images = labels.reduce(
            (tot: { [key: string]: string }, curr: string, idx: number) => {
              tot[curr] = base64Urls[idx];
              return tot;
            },
            {}
          );
          setBarData((prev) => ({ ...prev, images: base64Images }));
          setIsChartDownloading(true);
        }
        return;
      }
      // save as svg without option images
      downloadChart(chartInstance);
    }
  }, [chartInstance, withImageOptions, imageOptionUrls]);
  const overflows = {
    sm: smHasOverflow,
    md: mdHasOverflow,
    lg: false,
  };
  const sm = getSmOption(barData, overflows[size]);
  const md = getMdOption(barData, withImage, withImageOptions, overflows[size]);
  const lg = getLgOption(barData, withImage, withImageOptions);
  const options = {
    sm,
    md,
    lg,
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
        onClick={toggleImg}
      >
        Toggle image
      </Button>
      <Button
        sx={{ marginBottom: 4, display: "block" }}
        variant="contained"
        onClick={changeContainerSize}
      >
        Change card size
      </Button>
      <Button
        sx={{ marginBottom: 4, display: "block" }}
        variant="contained"
        onClick={saveAsImage}
      >
        Upload chart
      </Button>
      <DndCard size={size} imageUrl={imageUrl}>
        <BarContainer
          ref={containerRef}
          size={size}
          length={barData.values.length}
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
      {/* <MediumCard imageUrl={imageUrl}>
        <BarContainer size="md" length={barData.length}>
          <ReactECharts
            option={getMdOption(barData, withImage, mdHasOverflow)}
          />
        </BarContainer>
      </MediumCard> */}
      {/* <LargeCard data={barData} imageUrl={imageUrl}>
        <BarContainer ref={containerRef} size="lg" length={barData.length}>
          <ReactECharts option={getLgOption(barData, withImage)} />
        </BarContainer>
      </LargeCard> */}
    </div>
  );
}

export default Bar;
