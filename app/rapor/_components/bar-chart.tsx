"use client"

import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

export const description = "A bar chart with a label"

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
} satisfies ChartConfig

export interface ChartDataItem {
  ad: string;
  soyad: string;
  quantityData: number;
}

interface ChartData {
  data: ChartDataItem[],
  quantityValue: string,
  quantityLabel: string,
}

export function BarChartComp({ data, quantityValue, quantityLabel }: ChartData) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Bar Chart - Label</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="max-h-[500px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={600}
              height={300}
              barSize={50}
              accessibilityLayer
              data={data}
              margin={{
                top: 20,
              }}
            >
              <CartesianGrid vertical={true} />
              <XAxis
                dataKey="ad"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value, index) => { const item = data[index]; return `${item.ad} ${item.soyad}` }}
              />
              <ChartTooltip
                cursor={false}
                content={<ChartTooltipContent />}
              />
              <Bar dataKey={quantityValue} label={quantityLabel} fill="#3b82f6" radius={8}>
                <LabelList
                  position="top"
                  offset={12}
                  className="fill-foreground"
                  fontSize={12}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
