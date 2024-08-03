import "./DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import Breadcrumb from "../../../Componenets/Dashboard/Features/Breadcrumb";

import { getData } from "../../../axiosConfig/API";
import Filtration from "../Models/Filtration/SalesReports";

export default function SalesReports() {
  const componentRef = useRef();
  const [salesReports, setSalesReports] = useState([]);

  const fetchSalesReports = useCallback(async () => {
    try {
      const result = await getData("admin/transactions");
      setSalesReports(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchSalesReports();
  }, [fetchSalesReports]);

  const columns = [
    {
      title: "SALE ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "START DATE",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "END DATE",
      dataIndex: "updated_at",
      key: "updated_at",
    },
    {
      title: "PAYMENT METHOD",
      dataIndex: "payment_method",
      key: "payment_method",
    },
    {
      title: "ORDER SERIAL",
      dataIndex: "order_id",
      key: "order_id",
    },
    {
      title: "AMOUNT",
      key: "amount",
      render: (text, item) =>
        parseFloat(item.amount) > 0 ? (
          <span style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}>
            {item.amount}
          </span>
        ) : (
          <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>
            {item.amount}
          </span>
        ),
    },
  ];

  return (
    <div className="DataTable">
      {/* breadcrumb feature */}
      <Breadcrumb />

      {/* Filtration */}
      <Filtration />

      <div className="tableItems" ref={componentRef}>
        <Table columns={columns} dataSource={salesReports} pagination={true} />
      </div>
    </div>
  );
}
