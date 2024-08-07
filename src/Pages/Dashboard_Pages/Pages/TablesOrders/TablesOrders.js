import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import { BsEye } from "react-icons/bs";
import { getData } from "../../../../axiosConfig/API";
import Filtration from "../../Models/Filtration/TablesOrders";
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";

export default function TableOrders() {
  const componentRef = useRef();
  const [tableOrders, setTableOrders] = useState([]);
  const [modalVisibleToggle, setModalVisibleToggle] = useState(false);

  const fetchTableOrders = useCallback(async () => {
    try {
      const result = await getData("admin/orders");
      setTableOrders(result);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    fetchTableOrders();
  }, [fetchTableOrders]);

  const handleModalToggle = () => {
    setModalVisibleToggle(!modalVisibleToggle);
    document.body.style.overflow = modalVisibleToggle ? "visible" : "hidden";
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "ORDER TYPE",
      dataIndex: "PaymentType",
      key: "PaymentType",
    },
    {
      title: "CUSTOMER",
      key: "customer.id",
      render: (text, record) => record.customer.name,
    },
    {
      title: "AMOUNT",
      dataIndex: "total_cost",
      key: "total_cost",
    },
    {
      title: "DATE",
      dataIndex: "created_at",
      key: "created_at",
    },
    {
      title: "STATUS",
      key: "status",
      render: (text, item) => (
        <UpdateMultiStatus
          url={`admin/orders/${item.id}`}
          item={item}
          updated={fetchTableOrders}
          list={[
            { value: "Not Started", label: "Not Started" },
            { value: "In Progress", label: "In Progress" },
            { value: "Cancelled", label: "Cancelled" },
            { value: "Accepted", label: "Accepted" },
          ]}
        />
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <>
          <Link
            to={`/admin/dashboard/delivery-order/show/${item.id}`}
            className="eyeIcon"
            data-tooltip="view"
            style={{ "--c": "#1772FF", "--bg": "#E2EDFB" }}
          >
            <BsEye />
          </Link>
        </>
      ),
    },
  ];

  return (
    <div className="DataTable">
      {/* breadcrumb feature */}
      <Breadcrumb />

      {/* Filtration */}
      <Filtration handleModalToggle={handleModalToggle} />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={tableOrders}
          pagination={tableOrders.length > 10}
        />
      </div>
    </div>
  );
}
