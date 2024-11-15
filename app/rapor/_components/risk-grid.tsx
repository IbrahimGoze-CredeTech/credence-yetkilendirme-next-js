import { DataGrid } from "devextreme-react";
import React from "react";
import { BarChartComp, BarChartData } from "./bar-chart";

interface Props {
  data: BarChartData[];
}

export default function RiskGrid({ data }: Props) {
  return (
    <>
      <div>
        <DataGrid dataSource={data}></DataGrid>
      </div>
      <div className="mt-4">
        <BarChartComp
          chartLabel={"Risk Sıralaması"}
          chartDescription="En riskli kişiler (yetki sayısına göre risk sıralamasını gösterir.)"
          data={data}
          quantityValue="totalRiskWeight"
          quantityLabel="Risk Sıralaması"
          barColor="#ff0000"
        />
      </div>
    </>
  );
}
