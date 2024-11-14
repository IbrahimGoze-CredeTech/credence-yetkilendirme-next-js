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

export const description = "A multiple bar chart with a label";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#3b82f6",
  },
  mobile: {
    label: "Mobile",
    color: "#ff0066",
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
}: ChartData) {
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
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar
              dataKey={firstQuantityValue}
              label={firstQuantityLabel}
              fill="#3b82f6"
              radius={8}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
            <Bar
              dataKey={secondQuantityValue}
              label={secondQuantityLabel}
              fill="#ff0066"
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
