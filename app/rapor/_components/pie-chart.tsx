"use client";

import { Cell, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

const chartConfig = {
  RolAtama: {
    label: "Rol Atama",
    color: "hsl(var(--chart-1))",
  },
  RolCikarma: {
    label: "Rol Çıkarma",
    color: "#3b82f6",
  },
  YetkiEdit: {
    label: "Yetki Edit",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type ChartKeys = keyof typeof chartConfig;

interface DataItem {
  talepTipi: ChartKeys;
  talepCount: number;
}

interface Props {
  data: DataItem[];
}

export function PieChartComp({ data }: Props) {
  // console.log(data);

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Yaratilan Talep Tipleri</CardTitle>
        <CardDescription>Yaratilan son 100 Talep Tipi Grafigi</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={data}
              dataKey="talepCount"
              nameKey="talepTipi"
              innerRadius={50}
              paddingAngle={5}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.talepTipi].color}
                />
              ))}
            </Pie>
            <ChartLegend />
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter>
      </CardFooter>
    </Card>
  );
}
