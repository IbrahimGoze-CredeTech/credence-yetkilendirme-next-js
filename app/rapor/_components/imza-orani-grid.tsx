import { DataGrid } from "devextreme-react";
import React from "react";
import { MultipleBarChartComp } from "./bar-chart-multiple";
import { IImzaOraniMatris } from "@/types";

interface Props {
  // data: MultipleBarChartData[];
  data: IImzaOraniMatris[];
}

export default function ImzaOraniGrid({ data }: Props) {
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
          firstQuantityValue="ImzaAtanma"
          firstQuantityLabel="Atanan Imza Sayısı"
          secondQuantityValue="ImzaAtma"
          secondQuantityLabel="Atılan İmza Sayısı"
        />
      </div>
    </>
  );
}
