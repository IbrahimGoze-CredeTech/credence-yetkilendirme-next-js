"use client";

import { Pie, PieChart, Cell } from "recharts";
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

// Grafik yapılandırması
const chartConfig = {
  EgitimGrubu: { label: "Egitim Grubu", color: "#0088FE" },
  Operator: { label: "Operator", color: "#00C49F" },
  Sa: { label: "sa", color: "#FFBB28" },
  HukukBilgilendirme: { label: "Hukuk Bilgilendirme", color: "#FF8042" },
  YazilimMuduru: { label: "Yazılım Muduru", color: "#FF6384" },
  Avukat: { label: "Avukat", color: "#33FF57" },
  DepartmanMuduru: { label: "Departman Muduru", color: "#F1948A" },
  YazilimCalisani: { label: "Yazilim Calisani", color: "#FF0000" },
} satisfies ChartConfig;

type ChartKeys = keyof typeof chartConfig;

interface DataItem {
  rolAdi: ChartKeys; // Rol tipi adı
  kisiCount: number; // Rol tipine göre talep sayısı
}

interface Props {
  data: DataItem[]; // Grafik için kullanılan veri
}

export function RolDagilimiPieChart({ data }: Props) {
  // Pie grafiğinde kullanılan verinin konsola yazdırılması
  console.log(data);

  return (
    <Card className="flex flex-col p-4">
      <CardHeader className="items-center pb-0">
        <CardTitle>Rol Dağılımı</CardTitle>
        <CardDescription>Rol Dağılım Grafiği</CardDescription>
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
              dataKey="kisiCount"
              nameKey="rolAdi"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={3}
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={chartConfig[entry.rolAdi]?.color}
                />
              ))}
            </Pie>
          </PieChart>
        </ChartContainer>
        <div className="flex justify-center mt-4 space-x-4">
          {Object.keys(chartConfig).map((key) => (
            <div key={key} className="flex items-center space-x-2">
              <span
                className="w-4 h-4 rounded"
                style={{
                  backgroundColor: chartConfig[key as ChartKeys].color,
                }}
              ></span>
              <span className="text-sm font-medium">
                {chartConfig[key as ChartKeys].label}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

export default RolDagilimiPieChart;
