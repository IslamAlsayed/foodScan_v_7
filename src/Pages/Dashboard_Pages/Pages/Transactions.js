import "./DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import Breadcrumb from "../../../Components/Dashboard/Features/Breadcrumb";
import { getData } from "../../../axiosConfig/API";
import Filtration from "../Models/Filtration/Transactions";

export default function Transactions() {
  const componentRef = useRef();
  const [transactions, setTransaction] = useState([]);

  const fetchTransactions = useCallback(async () => {
    try {
      const result = await getData("admin/transactions");
      setTransaction(result);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "DATE",
      dataIndex: "created_at",
      key: "created_at",
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
      render: (text, item) => (
        <span
          className={
            parseFloat(item.amount) === 0
              ? "not_value"
              : parseFloat(item.amount) > 0
              ? "active"
              : "inactive"
          }
        >
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
        <Table columns={columns} dataSource={transactions} pagination={true} />
      </div>
    </div>
  );
}
