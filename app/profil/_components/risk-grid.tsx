import { DataGrid } from "devextreme-react";
import React from "react";
import { BarChartComp, type IBarChartData } from "./bar-chart";

interface IProps {
  data: IBarChartData[];
}

export default function RiskGrid({ data }: IProps) {
  return (
    <>
      <div>
        <DataGrid dataSource={data} />
      </div>
      <div className="mt-4">
        <BarChartComp
          barColor="#ff0000"
          chartDescription="En riskli kişiler (yetki sayısına göre risk sıralamasını gösterir.)"
          chartLabel="Risk Sıralaması"
          data={data}
          quantityLabel="Risk Sıralaması"
          quantityValue="totalRiskWeight"
        />
      </div>
    </>
  );
}
