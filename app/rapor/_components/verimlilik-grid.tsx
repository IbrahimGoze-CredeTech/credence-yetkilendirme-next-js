import { DataGrid } from "devextreme-react";
import React from "react";
import { BarChartData } from "./bar-chart";
import { MultipleBarChartComp } from "./bar-chart-multiple";

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
        <MultipleBarChartComp
          chartLabel={"Verimlilik Sıralaması"}
          chartDescription="En verimli çalışan kişiler (gelen taleplere ortalama kaç dakikada yanıt verildiğini gösterir.)"
          data={data}
          firstQuantityValue="averageResponseTime" //imza sayısı eklenecek
          firstQuantityLabel="Gelen İmza Sayısı"
          secondQuantityValue="averageResponseTime"
          secondQuantityLabel="Gelen Talepleri Yanıtlama Süresi Ortalaması"
        />
      </div>
    </>
  );
}
