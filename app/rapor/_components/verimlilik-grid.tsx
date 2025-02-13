import { DataGrid } from "devextreme-react";
import React from "react";
import { BarChartComp, type IBarChartData } from "./bar-chart";

interface IProps {
  data: IBarChartData[];
}

export default function VerimlilikGrid({ data }: IProps) {
  return (
    <>
      <div>
        <DataGrid dataSource={data} />
      </div>
      <div className="mt-4">
        <BarChartComp
          barColor="#21ff8c"
          chartDescription="En verimli kişiler (Gelen talepleri ortalama ne kadar sürede yanıtladığını gösterir.)"
          chartLabel="Verimlilik Tablosu"
          data={data}
          quantityLabel="Verimlilik Sıralaması"
          quantityValue="averageResponseTime"
        />
      </div>
    </>
  );
}
