"use client"

import { Area, AreaChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
// import type {
//   ChartConfig
// } from "@/components/ui/chart";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import type { IDataItem } from "@/utils"

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  talepSayisi: {
    label: "Talep Sayısı",
    color: "#3b82f6",
  },
} satisfies ChartConfig

interface IAreaChartProps {
  data: IDataItem[]
  chartLabel: string,
  chartDescription?: string,
  quantityValue: string,
  quantityLabel: string,
}

export function AreaChartComp({ data, chartLabel, chartDescription, quantityValue, quantityLabel }: IAreaChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartLabel}</CardTitle>
        <CardDescription>
          {chartDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer className="min-h-[300px]" config={chartConfig}>
          <AreaChart
            accessibilityLayer
            data={data}
            // width={600}
            // height={600}
            margin={{
              left: 12,
              right: 12,
              top: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => value}
              tickMargin={8}
              tickSize={6}
            />
            <YAxis tickMargin={12} />
            <ChartTooltip
              content={<ChartTooltipContent indicator="line" />}
              cursor={false}
            />
            <Area
              activeDot={{
                r: 6,
              }}
              dataKey={quantityValue}
              dot={{
                fill: "#3b82f6",
                opacity: 1,
              }}
              fill="#3b82f6"
              fillOpacity={0.4}
              label={quantityLabel}
              stroke="#3b82f6"
              type="natural"
            >
              <LabelList
                className="fill-foreground"
                fontSize={12}
                offset={12}
                position="top" />
            </Area>
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter />
    </Card>
  )
}
