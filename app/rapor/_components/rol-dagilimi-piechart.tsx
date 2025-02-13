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
//   ChartConfig} from "@/components/ui/chart";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Grafik yapılandırması
const chartConfig = {
  "Egitim Grubu": { label: "Eğitim Grubu", color: "#0088FE" },
  Operator: { label: "Operatör", color: "#00C49F" },
  sa: { label: "sa", color: "#FFBB28" },
  "Hukuk Bilgilendirme": { label: "Hukuk Bilgilendirme", color: "#FF8042" },
  "Yazilim Muduru": { label: "Yazilim Muduru", color: "#FF6384" },
  Avukat: { label: "Avukat", color: "#33FF57" },
  "Departman Muduru": { label: "Departman Müdürü", color: "#F1948A" },
  "Yazilim Calisani": { label: "Yazılım Çalışanı", color: "#FF0000" },
} satisfies ChartConfig;

type ChartKeysType = keyof typeof chartConfig;

interface IDataItem {
  rolAdi: ChartKeysType; // Rol tipi adı
  kisiCount: number; // Rol tipine göre talep sayısı
}

interface IProps {
  data: IDataItem[]; // Grafik için kullanılan veri
}

export function RolDagilimiPieChart({ data }: IProps) {
  // Pie grafiğinde kullanılan verinin konsola yazdırılması

  return (
    <Card className="flex flex-col p-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Rol Dağılımı</CardTitle>
        <CardDescription>Rol Dağılım Grafiği</CardDescription>
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
              dataKey="kisiCount"
              innerRadius={60}
              nameKey="rolAdi"
              outerRadius={80}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  fill={chartConfig[entry.rolAdi]?.color}
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

export default RolDagilimiPieChart;
