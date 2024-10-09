"use client";
import DataGrid, { Column, FilterRow, HeaderFilter } from "devextreme-react/data-grid";
import { useEffect, useState, useCallback } from "react";
import { KisiOzet } from "../types";
import { roles } from "../modals/roller";
import { yetkilerAdi } from "../modals/yetkiler";
import { useModalContext } from "../context";

export default function SummaryDataGrid() {
  const [kisiOzet, setKisiOzet] = useState<KisiOzet[]>([]);
  const [events, setEvents] = useState<string[]>([]);
  const modalContext = useModalContext();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("http://192.168.30.90:98/api/Kisi/ozet-bilgi").then((response) => {
        if (!response.ok) throw new Error("Network response was not ok");
        return response.json();
      });
      console.log('kisiOzet: ', response);
      setKisiOzet(response);
    };
    fetchData();
  }, []);

  const logEvent = useCallback((eventName: string) => {
    setEvents((previousEvents) => [eventName, ...previousEvents]);
    console.log(`Event triggered: ${eventName}`);
  }, []);

  const rolesFilterOperations = ["contains", "endswith", "=", "startswith"];
  function rolesToFilterItem(item: string) {
    return {
      text: item,
      value: item
    };
  }

  const rolesHeaderFilter = {
    dataSource: {
      store: {
        type: "array",
        data: roles
      },
      map: rolesToFilterItem
    }
  };

  const yetkilerHeaderFilter = {
    dataSource: {
      store: {
        type: "array",
        data: yetkilerAdi
      },
      map: rolesToFilterItem
    }
  };

  function calculateFilterExpression(filterValue: string, selectedFilterOperation: string | null = '=') {
    const column = this;
    if (filterValue) {
      const selector = (data: KisiOzet) => {
        const applyOperation = (arg1: string, arg2: string, op: string) => {
          if (op === "=") return arg1 === arg2;
          if (op === "contains") return arg1.includes(arg2);
          if (op === "startswith") return arg1.startsWith(arg2);
          if (op === "endswith") return arg1.endsWith(arg2);
        };
        const values = column.calculateCellValue(data);
        return (
          values &&
          !!values.find((v: string) => applyOperation(v, filterValue, selectedFilterOperation ?? '='))
        );
      };
      return [selector, "=", true];
    }
    return column.defaultCalculateFilterExpression.apply(this, arguments);
  }

  const handleRowInserting = async (e) => {
    try {
      const response = await fetch("http://192.168.30.90:98/api/Kisi/ekle", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e.data),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const newRow = await response.json();
      setKisiOzet((prev) => [...prev, newRow]);
      logEvent('RowInserted');
    } catch (error) {
      console.error('Error adding new row:', error);
    }
  };

  const handleRowUpdating = async (e) => {
    try {
      const response = await fetch(`http://192.168.30.90:98/api/Kisi/guncelle/${e.key}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(e.data),
      });

      if (!response.ok) throw new Error('Network response was not ok');
      logEvent('RowUpdated');
    } catch (error) {
      console.error('Error updating row:', error);
    }
  };

  const handleRowRemoving = async (e) => {
    try {
      const response = await fetch(`http://192.168.30.90:98/api/Kisi/sil/${e.key}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error('Network response was not ok');
      setKisiOzet((prev) => prev.filter(kisi => kisi.id !== e.key));
      logEvent('RowRemoved');
    } catch (error) {
      console.error('Error removing row:', error);
    }
  };

  return (
    <>
      <DataGrid
        id="kisiOzet"
        keyExpr="id"
        dataSource={kisiOzet}
        showRowLines={true}
        showBorders={true}
        onRowClick={(e) => {
          modalContext.setId(e.data.id);
          modalContext.toggle();
        }}
        editing={{
          allowAdding: true, // Ekleme işlemlerine izin ver
          allowUpdating: true, // Güncelleme işlemlerine izin ver
          allowDeleting: true, // Silme işlemlerine izin ver
          mode: "popup", // Pop-up modda düzenleme
        }}
        onRowInserting={handleRowInserting}
        onRowUpdated={handleRowUpdating}
        onRowRemoving={handleRowRemoving}
      >
        <FilterRow visible={true} />
        <HeaderFilter visible={true} />

        <Column
          dataField="ad"
          caption="Ad"
          allowHeaderFiltering={false} />
        <Column
          dataField="soyad"
          caption="Soyad"
          allowHeaderFiltering={false} />
        <Column
          dataField="departman"
          caption="Departman"
          allowHeaderFiltering={false}
        />
        <Column
          dataField="roller"
          caption="Rol"
          dataType="string"
          headerFilter={rolesHeaderFilter}
          calculateFilterExpression={calculateFilterExpression}
          filterOperations={rolesFilterOperations}
        >
          <HeaderFilter dataSource={roles} />
        </Column>

        <Column
          dataField="yetkiler"
          caption="Yetki"
          dataType="string"
          calculateFilterExpression={calculateFilterExpression}
          filterOperations={rolesFilterOperations}
          headerFilter={yetkilerHeaderFilter}
        >
          <HeaderFilter dataSource={yetkilerAdi} />
        </Column>
      </DataGrid>

      {/* Eventleri listeleme */}
      <div>
        <h4>Event Log:</h4>
        <ul>
          {events.map((event, index) => (
            <li key={index}>{event}</li>
          ))}
        </ul>
      </div>
    </>
  );
}
