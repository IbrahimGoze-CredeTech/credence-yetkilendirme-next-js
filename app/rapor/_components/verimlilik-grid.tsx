import { DataGrid } from "devextreme-react";
import React from "react";
import { BarChartComp, BarChartData } from "./bar-chart";

interface Props {
  data: BarChartData[];
}

export default function VerimlilikGrid({ data }: Props) {
  return (
    <>
      <div>
        <DataGrid dataSource={data}></DataGrid>
      </div>
      <div className="mt-4">
        <BarChartComp
          chartLabel={"Verimlilik Tablosu"}
          chartDescription="En verimli kişiler (Gelen talepleri ortalama ne kadar sürede yanıtladığını gösterir.)"
          data={data}
          quantityValue="averageResponseTime"
          quantityLabel="Verimlilik Sıralaması"
          barColor="#21ff8c"
        />
      </div>
    </>
  );
}
