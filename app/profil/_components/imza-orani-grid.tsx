import { DataGrid } from "devextreme-react";
import React from "react";
import type { IBarChartData } from "./bar-chart";
import { MultipleBarChartComp } from "./bar-chart-multiple";

interface IProps {
  data: IBarChartData[];
}

export default function ImzaOranıGrid({ data }: IProps) {
  return (
    <>
      <div>
        <DataGrid dataSource={data} />
      </div>
      <div className="mt-4">
        <MultipleBarChartComp
          chartDescription="Gelen taleplerin kaçına imza atıldığını gösterir. "
          chartLabel="İmza Atma Oranı"
          data={data}
          firstQuantityLabel="Gelen İmza Sayısı"
          firstQuantityValue="imzaSayısı"
          secondQuantityLabel="Atılan İmza Sayısı"
          secondQuantityValue="imzaAtilanTalepSayısı"
        />
      </div>
    </>
  );
}
