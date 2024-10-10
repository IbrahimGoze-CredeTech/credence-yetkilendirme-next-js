import { IDataGridOptions } from "devextreme-react/data-grid";
// import { roles } from "../modals/roller";

export const summaryDataGridConfig: IDataGridOptions = {
  id: "summarydatagrid",
  allowColumnReordering: true,
  allowColumnResizing: true,
  showBorders: false,
  columnAutoWidth: true,
  showRowLines: true,
  columns: [
    { dataField: "ad", caption: "Ad" },
    { dataField: "soyad", caption: "Soyad" },
    // {
    //   dataField: "roller",
    //   caption: "Rol",
    //   dataType: "string",
    //   filterOperations: ["contains"],
    //   lookup: {
    //     dataSource: roles,
    //     valueExpr: this,
    //     displayExpr: this,
    //   },
    // },
    { dataField: "departman", caption: "Departman" },
    { dataField: "id", caption: "id", visible: false },
  ],
};
