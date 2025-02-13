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

export const description = "A bar chart with a label";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  imzaSayısı: {
    label: "İmza Sayısı",
    color: "#3b82f6",
  },
  yaratılanTalepSayısı: {
    label: "Yaratılan Talep Sayısı",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

export interface IBarChartData {
  ad: string;
  soyad: string;
  quantityData: number;
}

interface IChartData {
  chartLabel: string;
  chartDescription?: string;
  data: IBarChartData[];
  quantityValue: string;
  quantityLabel: string;
  barColor?: string;
}

export function BarChartComp({
  chartLabel,
  chartDescription,
  data,
  quantityValue,
  quantityLabel,
  barColor = "#3b82f6",
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

            // tickFormatter={(value) => value}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar
              dataKey={quantityValue}
              fill={barColor}
              label={quantityLabel}
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
