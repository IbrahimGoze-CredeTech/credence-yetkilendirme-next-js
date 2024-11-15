"use client";

import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
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

export interface BarChartData {
  ad: string;
  soyad: string;
  quantityData: number;
}

interface ChartData {
  chartLabel: string;
  chartDescription?: string;
  data: BarChartData[];
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
}: ChartData) {
  // console.log("data in bar chart comp: ", data);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartLabel}</CardTitle>
        <CardDescription>{chartDescription}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[500px]">
          <BarChart
            width={600}
            height={300}
            barSize={50}
            accessibilityLayer
            data={data}
            margin={{
              top: 50,
            }}
          >
            <CartesianGrid vertical={true} />
            <XAxis
              dataKey="ad"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value, index) => {
                const item = data[index];
                return `${item.ad} ${item.soyad}`;
              }}

              // tickFormatter={(value) => value}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey={quantityValue}
              label={quantityLabel}
              fill={barColor}
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
