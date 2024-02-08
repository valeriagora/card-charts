"use client";
import { ReactECharts } from "@/components/ReactECharts";
import React, {
  forwardRef,
  LegacyRef,
  ReactNode,
  use,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { DndCard } from "@/components/DndCard";
import {
  breakWord,
  getBarsContainerHeight,
  getBase64Image,
  getSvgBlob,
  hasOptionsOverflow,
  isBase64Image,
  registerCoverShape,
} from "@/utils";
import { getSmOption, getMdOption, getLgOption } from "@/options/bar";
import {
  chartOptionsOverflow,
  L_LEGEND_MAX_SYMBOLS_COUNT,
  L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT,
  MIN_L_CHART_HEIGHT,
  OPTION_MARGIN_BOTTOM,
  TEXT_LINE_HEIGHT,
  url,
} from "@/constants";
import { Button, Card } from "@mui/material";
import { styled } from "@mui/material";
import { ECharts } from "echarts";
import Image from "next/image";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import {
//   OPTION_IMAGE_HEIGHT,
//   IMAGE_OPTIONS_LINE_Y_GAP,
//   BAR_CHART_ML_BOTTOM_PADDING,
// } from "@/constants";
import { CardSize, CustomLegend } from "@/types";
import { OverflowInfo } from "@/components/styledComponents";
import { ChartContainer } from "@/components/ChartContainer";
import { M_BAR_MAX_OPTIONS, S_BAR_MAX_OPTIONS } from "@/constants/bar";

const OPTION_IMAGE_HEIGHT = 72;
const IMAGE_OPTIONS_LINE_Y_GAP = 8;
const BAR_CHART_ML_BOTTOM_PADDING = 28;
const barContainerHeights = {
  small: 120, // 124
  medium: 336, // 328, 344
  large: "auto",
};

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

const BarsContainer = styled("div", {
  shouldForwardProp: (prop) => prop !== "height",
})<{ height: number }>(({ height }) => ({
  width: "100%",
  height,
  border: "1px solid pink",
}));
// interface IBarOptionsOverflow {
//   small: {
//     simple: number;
//     withImgOptions: number;
//   };
//   medium: {
//     simple: number;
//     withImgOptions: number;
//   };
// }
// const barOptionsOverflow: IBarOptionsOverflow = {
//   small: { simple: 5, withImgOptions: 5 },
//   medium: {
//     simple: 11,
//     withImgOptions: 4,
//   },
// };

// const BarContainer = forwardRef(function Container(
//   {
//     optionsCount,
//     children,
//     size,
//     withImageOptions,
//     hasOverflow,
//   }: {
//     optionsCount: number;
//     children: ReactNode;
//     size: CardSize;
//     withImageOptions: boolean;
//     hasOverflow: boolean;
//   },
//   ref
// ) {
//   // needed to set the fixed height of chart container and show overflow text
//   return (
//     <BarChartContainer
//       size={size}
//       optionsCount={optionsCount}
//       ref={ref as LegacyRef<HTMLDivElement>}
//       withImageOptions={withImageOptions}
//     >
//       {children}
//       {hasOverflow && (
//         <OverflowInfo>
//           {withImageOptions && size !== CardSize.large
//             ? barOptionsOverflow[size].withImgOptions
//             : barOptionsOverflow[size as CardSize.small | CardSize.medium]
//                 .simple}{" "}
//           / {optionsCount} options{" "}
//           <Image width={16} height={16} src={"/info.svg"} alt="info" />
//         </OverflowInfo>
//       )}
//     </BarChartContainer>
//   );
// });

const urlToBase64 = async (url: string) => {
  let result = await getBase64Image(url);
  return result;
};

interface IBarProps {
  data: { name: string; value: number }[];
  legendData: CustomLegend[];
  cardSize: CardSize;
}
function BarChart({ data, legendData, cardSize }: IBarProps) {
  const [barChartData, setBarChartData] = useState(data);
  const [barLegendData, setBarLegendData] =
    useState<CustomLegend[]>(legendData);
  const [questionImageUrl, setQuestionImageUrl] = useState("");
  const [showT2B, setShowT2B] = useState(false);
  const [isQuestionImageReady, setIsQuestionImageReady] = useState(false);

  const withImage = !!questionImageUrl;
  // const smHasOverflow = values.length > 5;
  // const mdHasOverflow = withImageOptions
  //   ? values.length > 4
  //   : values.length > 11;

  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);
  const [size, setSize] = useState<CardSize>(cardSize);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [downloadQueue, setDownloadQueue] = useState<string[]>([]);
  const [areBase64ImagesReady, setBase64ImagesReady] = useState(false);

  // useEffect(() => {
  //   if (size === CardSize.large) {
  //     setBarData({
  //       values,
  //       labels,
  //       images: imageOptionUrls,
  //     });
  //   }
  //   if (size === CardSize.medium && mdHasOverflow) {
  //     setBarData({
  //       values: withImageOptions ? values.slice(0, 4) : values.slice(0, 11),
  //       labels: withImageOptions
  //         ? Object.fromEntries(Object.entries(labels).slice(0, 4))
  //         : Object.fromEntries(Object.entries(labels).slice(0, 11)),
  //       images: imageOptionUrls,
  //     });
  //   }
  //   if (size === CardSize.small && smHasOverflow) {
  //     setBarData({
  //       values: values.slice(0, 5),
  //       labels: Object.fromEntries(Object.entries(labels).slice(0, 5)),
  //       images: undefined,
  //     });
  //   }
  // }, [
  //   size,
  //   smHasOverflow,
  //   mdHasOverflow,
  //   withImageOptions,
  //   values,
  //   labels,
  //   imageOptionUrls,
  // ]);
  useEffect(() => {
    registerCoverShape();
  }, []);

  const toggleImg = () => {
    setQuestionImageUrl(questionImageUrl ? "" : url);
  };
  const toggleT2B = () => {
    setShowT2B(!showT2B);
  };

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value as CardSize);
  };

  const onRenderEnded = () => {
    const isQuestionImageReady = isBase64Image(questionImageUrl);
    // base 64 images are ready & component re-rendered
    setIsQuestionImageReady(!!isQuestionImageReady);
  };

  const downloadChart = async (chartInstance: ECharts) => {
    const url = await getSvgBlob(chartInstance);
    const anchorElement = document.createElement("a");
    anchorElement.href = url;
    anchorElement.download = `chart.svg`;
    document.body.appendChild(anchorElement);
    anchorElement.click();
  };

  const saveAsImage = useCallback(async () => {
    // if (withImageOptions) {
    // upload base64 images
    // const base64Promises: Promise<string>[] = [];
    // for (const url of imageOptionUrls) {
    //   base64Promises.push(urlToBase64(url));
    // }
    // const getBase64Promises = async () =>
    //   await Promise.all(base64Promises).then((values) => values);
    // const base64Urls = await getBase64Promises();
    // if (base64Urls.length) {
    //   setBarData((prev) => ({
    //     ...prev,
    //     images: cardSize === CardSize.small ? undefined : base64Urls,
    //   }));
    //   setDownloadQueue([...downloadQueue, "download"]);
    // }
    // return;
    // save as svg without option images
    // downloadChart(chartInstance);
    // }
    // }, [withImageOptions, imageOptionUrls, cardSize, downloadQueue]);
    // const overflows = useMemo(() => {
    //   const smHasOverflow = values.length > 5;
    //   const mdHasOverflow = withImageOptions
    //     ? values.length > 4
    //     : values.length > 11;
    //   return {
    //     small: smHasOverflow,
    //     medium: mdHasOverflow,
    //     large: false,
  }, []);
  // }, [values.length, withImageOptions]);
  const optionsLines = barChartData.reduce((total: number[], current: any) => {
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
  const optionHeights = optionsLines.map(
    (lines: number) => lines * TEXT_LINE_HEIGHT
  );
  const largeContainerHeight =
    optionHeights.reduce(
      (total: number, height: number) => (total += height),
      0
    ) +
    OPTION_MARGIN_BOTTOM * (optionHeights.length - 1);
  const lContainerHeight =
    largeContainerHeight < MIN_L_CHART_HEIGHT
      ? MIN_L_CHART_HEIGHT
      : largeContainerHeight;
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
    [barChartData, size, withImage, showT2B]
  );
  const large = useMemo(
    () =>
      getLgOption(
        barChartData,
        barLegendData,
        withImage,
        hasOptionsOverflow(size, barChartData.length),
        showT2B,
        questionImageUrl,
        optionHeights,
        optionsLines,
        lContainerHeight
      ),
    [barChartData, barLegendData, withImage, showT2B]
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
    if (downloadQueue.length && areBase64ImagesReady && chartInstance) {
      downloadChart(chartInstance);
      setDownloadQueue((prev) => prev.slice(0, -1));
    }
  }, [downloadQueue, areBase64ImagesReady, chartInstance]);

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
          height={size === CardSize.large ? lContainerHeight : undefined}
          optionsCount={barChartData.length}
          hasOverflow={hasOptionsOverflow(size, barChartData.length)}
        >
          <BarsContainer
            height={
              size === CardSize.large
                ? lContainerHeight
                : getBarsContainerHeight(size, barChartData.length)
            }
          >
            <ReactECharts
              containerRef={containerRef}
              option={options[size]}
              onChartInit={onChartInit}
              onRenderEnded={onRenderEnded}
            />
          </BarsContainer>
        </ChartContainer>
      </DndCard>
    </div>
  );
}

export default BarChart;
