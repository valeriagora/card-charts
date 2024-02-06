export interface IPieOptionsOverflow {
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
