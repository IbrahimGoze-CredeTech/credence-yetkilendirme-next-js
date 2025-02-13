import { DataGrid } from "devextreme-react";
import React from "react";
import type { IImzaOraniMatris } from "@/types";
import { MultipleBarChartComp } from "./bar-chart-multiple";

interface IProps {
  data: IImzaOraniMatris[];
}

export default function ImzaOraniGrid({ data }: IProps) {
  const chartData = data.map(item => ({
    Ad: item.Ad,
    Soyad: item.Soyad,
    ImzaAtma: item.ImzaAtma,
    ImzaAtanma: item.ImzaAtanma,
  }));

  return (
    <>
      <div>
        <DataGrid dataSource={data} />
      </div>
      <div className="mt-4">
        <MultipleBarChartComp
          chartDescription="Gelen taleplerin kaçına imza atıldığını gösterir. "
          chartLabel="İmza Atma Oranı"
          data={chartData}
          firstQuantityLabel="Atanan Imza Sayısı"
          firstQuantityValue="ImzaAtanma"
          secondQuantityLabel="Atılan İmza Sayısı"
          secondQuantityValue="ImzaAtma"
        />
      </div>
    </>
  );
}
