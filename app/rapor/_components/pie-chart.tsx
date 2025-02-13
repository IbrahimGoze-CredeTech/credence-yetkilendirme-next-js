"use client";

import { Cell, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// import type {
//   ChartConfig
// } from "@/components/ui/chart";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent
} from "@/components/ui/chart";

const chartConfig = {
  RolAtama: {
    label: "Rol Atama",
    color: "#FF5733",
  },
  RolCikarma: {
    label: "Rol Çıkarma",
    color: "#33FF57",
  },
  YetkiEdit: {
    label: "Yetki Edit",
    color: "#3357FF",
  },
  KisiSayfaEdit: {
    label: "Kişi Sayfa Edit",
    color: "#F4D03F",
  },
  KisiSayfaAtama: {
    label: "Kişi Sayfa Atama",
    color: "#A569BD",
  },
  RolSayfaAtama: {
    label: "Rol Sayfa Atama ",
    color: "#F1948A",
  },
  RolSayfaCikarma: {
    label: "Rol Sayfa Çıkarma ",
    color: "#FF0000",
  },

  KisiSayfaCikarma: {
    label: "Kişi Sayfa Çıkarma ",
    color: "#000080",
  },
  RolYetkiEdit: {
    label: "Rol Yetki Edit ",
    color: "#206020",
  },
} satisfies ChartConfig;

type ChartKeysType = keyof typeof chartConfig;

interface IDataItem {
  talepTipi: ChartKeysType;
  talepCount: number;
}

interface IProps {
  data: IDataItem[];
}

export function PieChartComp({ data }: IProps) {

  return (
    <Card className="flex flex-col p-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Talep Tipi</CardTitle>
        <CardDescription>
          Yaratılan son 100 talebin tiplerine göre grafiği
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          className="mx-auto aspect-square max-h-[250px]"
          config={chartConfig}
        >
          <PieChart>
            <ChartTooltip
              content={<ChartTooltipContent hideLabel />}
              cursor={false}
            />
            <Pie
              data={data}
              dataKey="talepCount"
              innerRadius={60}
              nameKey="talepTipi"
              outerRadius={80}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  fill={chartConfig[entry.talepTipi]?.color}
                  key={`cell-${index}`}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex justify-center mt-4 space-x-4">
          {Object.keys(chartConfig).map((key) => (
            <div className="flex items-center space-x-2" key={key}>
              <span
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor: chartConfig[key as ChartKeysType].color,
                }}
              />
              <span className="text-sm font-medium">
                {chartConfig[key as ChartKeysType].label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
