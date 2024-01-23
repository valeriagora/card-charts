"use client";
import { ReactECharts } from "@/components/ReactECharts";
import {
  Button,
  FormControlLabel,
  Radio,
  FormControl,
  RadioGroup,
  FormLabel,
  styled,
  colors,
} from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { smOption, getMdOption, getLgOption, pieColors } from "@/data/pie";
import { url } from "@/data/constants";
import { DndCard } from "@/components/DndCard";
import { CardSize } from "../../bar/types";
import { ECharts } from "echarts";
import { getBase64Image, getSvgBlob } from "@/utils";

const imageOptions = [
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
  "https://plus.unsplash.com/premium_photo-1697695568731-5b351d7aca4b?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682685797140-c17807f8f217?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1682685797857-97de838c192e?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://plus.unsplash.com/premium_photo-1663045856607-60692e1e5ec6?q=80&w=2938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
];
interface PieData {
  value: number;
  name: string;
  image: {
    key: string;
    value: string;
  };
}

const pieData: PieData[] = [
  {
    value: 10,
    name: "Search Engine Search Engine Search Engine Search Engine e Search Engine Search Engine Search Engine Engine Search Engine  Engine Search Engine",
  },
  {
    value: 20,
    name: "Search Engine",
  },
  {
    value: 25,
    name: "Other",
  },
  {
    value: 15,
    name: "Option 1",
  },
  {
    value: 2,
    name: "Option 2",
  },
  { value: 3, name: "Option 3" },
  { value: 5, name: "Option 4" },
  {
    value: 3,
    name: "Option 5 Search Engine Search Search Search Search Search Option 5 Search Engine Search Search Search Search Search Option 5 Search Engine Search Search Search Search Search",
  },
  {
    value: 2,
    name: "Option 6 Option 5 Search Engine Search Search Search Search Search Option 5 Search Engine Search Search Search Search Search Option 5 Search Engine Search Search Search Search Search",
  },
  {
    value: 2,
    name: "Option 7 Option 5 Search Engine Search Search Search Search Search Option 5 Search Engine Search Search Search Search Search Option 5 Search Engine Search Search Search",
  },
  { value: 2, name: "Option 11" },
  { value: 2, name: "Option 12" },
  { value: 1, name: "Option 13" },
  { value: 3, name: "Option 14" },
  { value: 4, name: "Option 15" },
  { value: 5, name: "Option 16" },
].map(({ name, value }, idx) => ({
  value,
  name,
  image: {
    key: `image${idx + 1}`,
    value: imageOptions[idx],
  },
}));
const customSeriesData: number[][] = Array(4)
  .fill(null)
  .map((v) => [0, 4, 0]);
const L_LEGEND_MAX_SYMBOLS_COUNT = 52;
const L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT = 35;
function chunk(str: string, size: number) {
  return str.match(new RegExp(".{1," + size + "}", "g"));
}
const LEGEND_OPTION_ITEM_GAP = 10;
const getContainerHeight = (withQuestionImage: boolean) =>
  pieData.reduce((tot, curr, idx) => {
    const chunks = chunk(
      curr.name,
      withQuestionImage
        ? L_LEGEND_WITH_IMAGE_MAX_SYMBOLS_COUNT
        : L_LEGEND_MAX_SYMBOLS_COUNT
    );
    tot += chunks.length;
    return tot;
  }, 0) *
    20 +
  LEGEND_OPTION_ITEM_GAP * pieData.length;

const MIN_L_CHART_HEIGHT = 188;
const PieChartContainer = styled("div")<{
  size: CardSize;
  height: number;
  withImageOptions: boolean;
}>(({ size, height, withImageOptions }) => {
  return {
    position: "relative",
    width: "100%",
    border: "1px solid slateblue",
    boxSizing: "border-box",
    // padding: "20px 0",
    height:
      size === CardSize.large
        ? height > MIN_L_CHART_HEIGHT
          ? height
          : MIN_L_CHART_HEIGHT
        : "100%",
    // minHeight: size === CardSize.large ? height : "auto",
  };
});
export const PIE_L_OPTION_HEIGHT = 20 * 3 + 8;
export const PIE_L_OPTION_WITH_IMAGE_HEIGHT = 72 + 8;

// M WithOptions
function PieChartWithImageOptions({
  cardSize = CardSize.large,
  imageOptionUrls = imageOptions,
}: // imageOptionUrls = undefined,
any) {
  const withImageOptions = imageOptionUrls ? !!imageOptionUrls?.length : false;
  const [chartInstance, setChartInstance] = useState<ECharts | null>(null);
  const onChartInit = useCallback((chartInstance: ECharts) => {
    setChartInstance(chartInstance);
  }, []);
  const [pieChartData, setPieChartData] = useState<PieData[]>(pieData);
  const [pieLegendData, setPieLegendData] = useState(customSeriesData);
  console.log("legend data", pieLegendData);

  const [questionImage, setQuestionImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [downloadQueue, setDownloadQueue] = useState<string[]>([]);
  const [areBase64ImagesReady, setBase64ImagesReady] = useState(false);

  const [size, setSize] = useState(cardSize);
  const toggleImg = () => {
    setQuestionImage(questionImage ? "" : url);
  };
  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSize(event.target.value as CardSize);
  };
  console.log("items len", pieChartData.length);
  const onLegendScroll = (scrollDataIndex: number) => {
    console.log("scroll idx", scrollDataIndex);
    const itemsPerPage = 3;
    const pagesCount = Math.round(pieChartData.length / itemsPerPage); //
    console.log("pages count", pagesCount);
    const isLastPage = scrollDataIndex === itemsPerPage * (pagesCount - 1);
    console.log("is last page", isLastPage);
  };

  const downloadChart = async (chartInstance: ECharts) => {
    const url = await getSvgBlob(chartInstance);
    const anchorElement = document.createElement("a");
    anchorElement.href = url;
    anchorElement.download = `chart.svg`;
    document.body.appendChild(anchorElement);
    anchorElement.click();
  };
  const urlToBase64 = async (url: string) => {
    let result = await getBase64Image(url);
    return result;
  };
  const saveAsImage = useCallback(async () => {
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
        setPieChartData((prev) => {
          const newData = prev.map((item, idx) => ({
            ...item,
            image: {
              key: item.image?.key,
              value: base64Urls[idx],
            },
          }));
          return newData;
        });
        console.log("pie chart data set");
        setDownloadQueue([...downloadQueue, "download"]);
      }
      return;
      // save as svg without option images
      // downloadChart(chartInstance);
    }
  }, [withImageOptions, imageOptionUrls, downloadQueue]);
  const onRenderEnded = useCallback(() => {
    const areBase64ImagesReady = pieChartData.every((item) =>
      item.image.value.startsWith("data:image")
    );
    setBase64ImagesReady(!!areBase64ImagesReady);
    // option is actual when it has 2 series objects, custom legend & pie data
  }, [pieChartData]);
  useEffect(() => {
    if (downloadQueue.length && areBase64ImagesReady && chartInstance) {
      setTimeout(() => {
        downloadChart(chartInstance);
        setDownloadQueue((prev) => prev.slice(0, -1));
      }, 0);
    }
  }, [downloadQueue, areBase64ImagesReady, chartInstance]);

  const withImage = !!imageUrl;
  const small = smOption(pieChartData);
  const medium = getMdOption(pieChartData, withImage, pieLegendData);
  // console.log("MEDIUM OPTION", medium);
  const large = getLgOption(pieChartData, withImage, imageOptionUrls);
  const options = {
    small,
    medium,
    large,
  };
  const containerHeight = getContainerHeight(withImage);

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
      <DndCard size={size} imageUrl={questionImage}>
        <PieChartContainer
          size={size}
          ref={containerRef}
          height={
            size === CardSize.large
              ? withImageOptions
                ? pieData.length * 72
                : containerHeight
              : pieData.length * 60
          }
        >
          <ReactECharts
            onChartInit={onChartInit}
            onRenderEnded={onRenderEnded}
            onLegendScroll={onLegendScroll}
            containerRef={containerRef}
            option={options[size]}
          />
          {/* {size === CardSize.large && (
            <LargeLegend
              data={pieData}
              withImageOptions={withImageOptions}
              imageOptionUrls={imageOptionUrls}
            />
          )} */}
        </PieChartContainer>
      </DndCard>
    </>
  );
}

// const Flex = styled("div")(({ withImageOptions }) => ({
//   display: "flex",
//   gap: 4,
//   alignItems: "center",
//   minHeight: withImageOptions ? 72 : 60,
// }));
// const Icon = styled("div")(({ color }) => ({
//   width: 12,
//   height: 12,
//   minWidth: 12,
//   borderRadius: "50%",
//   background: color,
// }));
// const Percents = styled("div")({
//   color: "#fff",
// });
// const OptionText = styled("div")({
//   fontFamily: "Manrope",
//   fontSize: 14,
//   fontWeight: 500,
//   lineHeight: "20px",
//   color: "#c8cad0",
//   height: "100%",
//   width: "100%",
//   margin: 0,
// });
// const Image = styled("img")({
//   width: 72,
//   minWidth: 72,
//   height: 72,
//   objectFit: "contain",
//   boxSizing: "border-box",
//   border: "1px solid #ddd",
// });
// const LargeLegend = ({ data, withImageOptions, imageOptionUrls }: any) => {
//   return (
//     <div
//       style={{
//         display: "flex",
//         flexDirection: "column",
//         position: "absolute",
//         top: 0,
//         right: 0,
//         width: "50%",
//       }}
//     >
//       {data.map(({ value, name }, idx) => {
//         const remainder = idx % pieColors.length;
//         const color = pieColors[remainder];
//         const imageUrl = imageOptionUrls[idx];
//         return (
//           <Flex key={name} withImageOptions={withImageOptions}>
//             {withImageOptions && <Image src={imageUrl} />}
//             <Icon color={color} /> <Percents>{value}%</Percents>
//             <OptionText>{name}</OptionText>
//           </Flex>
//         );
//       })}
//     </div>
//   );
// };

export default PieChartWithImageOptions;
