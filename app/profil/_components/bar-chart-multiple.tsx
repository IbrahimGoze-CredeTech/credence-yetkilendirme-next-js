"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import type {
//   ChartConfig} from "@/components/ui/chart";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart with a label";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#ff0066",
  },
  mobile: {
    label: "Mobile",
    color: "#3b82f6",
  },
} satisfies ChartConfig;

export interface IBarChartData {
  ad: string;
  soyad: string;
  quantityData: number;
  imzaSayısı?: string;
  averageResponseTime?: number;
  imzaAtilanTalepSayısı?: string;
}

interface IChartData {
  chartLabel: string;
  chartDescription?: string;
  data: IBarChartData[];
  firstQuantityValue: string;
  secondQuantityValue: string;
  firstQuantityLabel: string;
  secondQuantityLabel: string;
}

export function MultipleBarChartComp({
  chartLabel,
  chartDescription,
  data,
  firstQuantityLabel,
  secondQuantityLabel,
  firstQuantityValue,
  secondQuantityValue,
}: IChartData) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartLabel}</CardTitle>
        <CardDescription>{chartDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="max-h-[500px]" config={chartConfig}>
          <BarChart
            accessibilityLayer
            barSize={50}
            data={data}
            height={300}
            margin={{
              top: 50,
            }}
            width={600}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              axisLine={false}
              dataKey="ad"
              tickFormatter={(value, index) => {
                const item = data[index];
                return `${item.ad} ${item.soyad}`;
              }}
              tickLine={false}
              tickMargin={10}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar
              dataKey={firstQuantityValue}
              fill="#ff0066"
              label={firstQuantityLabel}
              radius={8}
            >
              <LabelList
                className="fill-foreground"
                fontSize={12}
                offset={12}
                position="top"
              />
            </Bar>
            <Bar
              dataKey={secondQuantityValue}
              fill="#3b82f6"
              label={secondQuantityLabel}
              radius={8}
            >
              <LabelList
                className="fill-foreground"
                fontSize={12}
                offset={12}
                position="top"
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
