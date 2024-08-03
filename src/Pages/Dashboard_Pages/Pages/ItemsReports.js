import "./DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import Breadcrumb from "../../../Componenets/Dashboard/Features/Breadcrumb";

import { getData } from "../../../axiosConfig/API";
import Filtration from "../Models/Filtration/ItemsReports";

export default function ItemsReports() {
  const componentRef = useRef();
  const [itemsReports, setItemsReports] = useState([]);

  const fetchItemsReports = useCallback(async () => {
    try {
      const result = await getData("admin/ItemsReports");
      setItemsReports(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchItemsReports();
  }, [fetchItemsReports]);

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CATEGORY",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "TYPE",
      key: "type",
      render: (text, item) =>
        //   <span className={item.type === "vag" ? "active" : "inactive"}>
        //   {item.status === 1 ? "active" : "inactive"}
        // </span>

        item.type === "vag" ? (
          <span style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}>
            {item.type}
          </span>
        ) : (
          <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>
            {item.type}
          </span>
        ),
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
    },
  ];

  return (
    <div className="DataTable">
      {/* breadcrumb feature */}
      <Breadcrumb />

      {/* Filtration */}
      <Filtration />

      <div ref={componentRef}>
        <Table
          className="tableItems"
          columns={columns}
          dataSource={itemsReports}
          pagination={true}
        />
      </div>
    </div>
  );
}
