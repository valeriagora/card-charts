export interface IPieBarData {
  name: string;
  value: number;
}
export interface IChartOptionsOverflow {
  [CardSize.small]: {
    default: number;
    withImgOptions: number;
  };
  [CardSize.medium]: {
    default: number;
    withImgOptions: number;
  };
}
export interface PieData {
  value: number;
  name: string;
}
export enum CardSize {
  small = "S",
  medium = "M",
  large = "L",
}
export type CustomLegendItem = [number, number, string];
export type CustomLegend = CustomLegendItem[];
export type CustomLegendWithImageItem = [number, number, string, string];
export type CustomLegendWithImage = CustomLegendWithImageItem[];

export interface ICardDimensions {
  small: {
    width: number;
    height: number;
  };
  medium: {
    width: number;
    height: number;
  };
  large: {
    width: number;
    height: string;
  };
}
export enum IBreakpoint {
  medium = "MEDIUM_BREAKPOINT",
  large = "LARGE_BREAKPOINT",
}
