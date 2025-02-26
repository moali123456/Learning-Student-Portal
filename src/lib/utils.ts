import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import {
  ChartData,
  ChartDataParams,
  DoughnutData,
  DoughnutDataParams,
} from "../models/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function generateChartData(params: ChartDataParams): ChartData {
  const { total, inline, above, below, title } = params;

  // Validate input to ensure the total matches the sum of inline, above, and below
  if (inline + above + below !== total) {
    throw new Error(
      `The sum of inline, above, and below must equal total.${inline} ${above} ${below}`
    );
  }

  return {
    labels: [title],
    datasets: [
      {
        label: "Below expecting",
        data: [(below / total) * 100],
        backgroundColor: "red",
      },
      {
        label: "In line with curriculum expectations",
        data: [(inline / total) * 100],
        backgroundColor: "yellow",
      },
      {
        label: "Above curriculum expectations",
        data: [(above / total) * 100],
        backgroundColor: "green",
      },
    ],
  };
}
export function generateDoughnutData(params: DoughnutDataParams): DoughnutData {
  const { total, inline, above, below } = params;

  // Validate input to ensure the total matches the sum of inline, above, and below
  if (inline + above + below !== total) {
    throw new Error("The sum of inline, above, and below must equal total.");
  }

  return {
    labels: [
      "Below expecting",
      "In line with curriculum expectations",
      "Above curriculum expectations",
    ],
    datasets: [
      {
        data: [
          (below / total) * 100,
          (inline / total) * 100,
          (above / total) * 100,
        ],
        backgroundColor: ["red", "yellow", "green"],
        borderWidth: 1,
      },
    ],
  };
}
