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
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { DataItem } from "@/utils"

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

interface AreaChartProps {
  data: DataItem[]
  chartLabel: string,
  chartDescription?: string,
  quantityValue: string,
  quantityLabel: string,
}

export function AreaChartComp({ data, chartLabel, chartDescription, quantityValue, quantityLabel }: AreaChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{chartLabel}</CardTitle>
        <CardDescription>
          {chartDescription}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[300px]">
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
              tickMargin={8}
              tickSize={6}
              tickFormatter={(value) => value}
            />
            <YAxis tickMargin={12} />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="line" />}
            />
            <Area
              dataKey={quantityValue}
              label={quantityLabel}
              type="natural"
              fill="#3b82f6"
              fillOpacity={0.4}
              dot={{
                fill: "#3b82f6",
                opacity: 1,
              }}
              stroke="#3b82f6"
              activeDot={{
                r: 6,
              }}
            >
              <LabelList
                position="top"
                offset={12}
                className="fill-foreground"
                fontSize={12} />
            </Area>
          </AreaChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>

      </CardFooter>
    </Card>
  )
}
