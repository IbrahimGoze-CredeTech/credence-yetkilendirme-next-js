import { DataGrid } from "devextreme-react";
import React from "react";
import { BarChartData } from "./bar-chart";
import { MultipleBarChartComp } from "./bar-chart-multiple";

interface Props {
  data: BarChartData[];
}

export default function ImzaOranıGrid({ data }: Props) {
  return (
    <>
      <div>
        <DataGrid dataSource={data}></DataGrid>
      </div>
      <div className="mt-4">
        <MultipleBarChartComp
          chartLabel={"İmza Atma Oranı"}
          chartDescription="Gelen taleplerin kaçına imza atıldığını gösterir. "
          data={data}
          firstQuantityValue="imzaSayısı"
          firstQuantityLabel="Gelen İmza Sayısı"
          secondQuantityValue="imzaAtilanTalepSayısı"
          secondQuantityLabel="Atılan İmza Sayısı"
        />
      </div>
    </>
  );
}
