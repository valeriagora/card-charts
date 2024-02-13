export interface IChartOptionsOverflow {
  small: {
    default: number;
    withImgOptions: number;
  };
  medium: {
    default: number;
    withImgOptions: number;
  };
}
export interface PieData {
  value: number;
  name: string;
}
export enum CardSize {
  small = "small",
  medium = "medium",
  large = "large",
}
export type CustomLegendItem = [number, number, string];
export type CustomLegend = CustomLegendItem[];
export type CustomLegendWithImageItem = [number, number, string, string];
export type CustomLegendWithImage = CustomLegendWithImageItem[];
