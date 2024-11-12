"use client";

import { Cell, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
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
<<<<<<< HEAD
        <CardTitle>Rol Atama, Rol Çıkarma ve Yetki Edit</CardTitle>
=======
        <CardTitle>Yaratilan Talep Tipleri</CardTitle>
        <CardDescription>Yaratilan son 100 Talep Tipi Grafigi</CardDescription>
>>>>>>> 4b84e42028bdab2025fb2c6ce2b55f0d923953a7
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
<<<<<<< HEAD
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
=======
              innerRadius={50}
              paddingAngle={5}
>>>>>>> 4b84e42028bdab2025fb2c6ce2b55f0d923953a7
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
        <div className="flex justify-center mt-4 space-x-4">
          {Object.keys(chartConfig).map((key) => (
            <div key={key} className="flex items-center space-x-2">
              <span
                className="w-4 h-4 rounded"
                style={{ backgroundColor: chartConfig[key as ChartKeys].color }}
              ></span>
              <span className="text-sm font-medium">
                {chartConfig[key as ChartKeys].label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
<<<<<<< HEAD
=======
      <CardFooter>
      </CardFooter>
>>>>>>> 4b84e42028bdab2025fb2c6ce2b55f0d923953a7
    </Card>
  );
}
