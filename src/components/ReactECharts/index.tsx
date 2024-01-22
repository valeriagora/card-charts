"use client";
import React, {
  useRef,
  useEffect,
  RefObject,
  useState,
  useCallback,
  memo,
} from "react";
import { isEqual } from "lodash";
import { init, getInstanceByDom } from "echarts";
import type { CSSProperties } from "react";
import type { EChartsOption, ECharts, SetOptionOpts } from "echarts";
import * as echarts from "echarts/core";
import { SVGRenderer, CanvasRenderer } from "echarts/renderers";

echarts.use([SVGRenderer, CanvasRenderer]);
export interface ReactEChartsProps {
  option: EChartsOption;
  style?: CSSProperties;
  settings?: SetOptionOpts;
  loading?: boolean;
  withImage?: boolean;
  //
  containerRef: RefObject<HTMLDivElement | null>;
  onChartInit?: (chartInstance: ECharts) => void;
  onRenderEnded?: (chartInstance: ECharts) => void;
}

export function usePrevious(value: any) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

const ReactECharts = function ReactECharts({
  option,
  style,
  settings = {
    notMerge: true,
  },
  loading = false,
  containerRef,
  // onChartInit,
  onRenderEnded,
}: ReactEChartsProps): JSX.Element {
  const chartInstance = useRef<ECharts | null>(null);
  const chartRef = useRef<HTMLDivElement | null>(null);
  const prevOption = usePrevious(option);

  const onFinished = useCallback(() => {
    console.log("onFinished");
    // const isOptionsEqual = isEqual(prevOption, option);
    // console.log("isOptionsEqual", isOptionsEqual);
    // !isOptionsEqual &&
    onRenderEnded instanceof Function &&
      chartInstance.current &&
      onRenderEnded(chartInstance.current);
  }, [
    onRenderEnded,
    // , option, prevOption
  ]);

  useEffect(() => {
    // Initialize chart
    let chart: ECharts | undefined;
    if (chartRef.current !== null) {
      chart = init(chartRef.current, null, { renderer: "svg" });
      chartInstance.current = chart;
      // onChartInit instanceof Function && onChartInit(chart);
    }

    const ref = containerRef?.current;
    const observer = new ResizeObserver(([{ target }]) => {
      chart?.resize();
    });
    if (ref) {
      observer.observe(ref);
    }
    // chart?.on("finished", onFinished);
    return () => {
      chart?.dispose();
      // chart?.off("finished", onFinished);
      ref && observer.unobserve(ref);
    };
  }, [containerRef, onFinished]);
  useEffect(() => {
    // console.log("register finished callback");
    chartInstance.current?.on("finished", onFinished);
    return () => {
      chartInstance.current?.off("finished", onFinished);
    };
  }, [onFinished]);

  useEffect(() => {
    // Update chart
    console.log("update chart option", option);
    // if prev options is equal to current option,
    // do not update
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      chart?.clear();
      // console.log("setOption");
      chart?.setOption(option, settings);
      // onRenderEnded instanceof Function && onRenderEnded(chart);
    }
  }, [option, settings, prevOption]); // Whenever theme changes we need to add option and setting due to it being deleted in cleanup function

  useEffect(() => {
    // Update chart
    if (chartRef.current !== null) {
      const chart = getInstanceByDom(chartRef.current);
      loading === true ? chart?.showLoading() : chart?.hideLoading();
    }
  }, [loading]);

  return (
    <>
      <div
        ref={chartRef}
        style={{
          width: "100%",
          height: "100%",
          ...style,
        }}
      />
    </>
  );
};

export { ReactECharts };
