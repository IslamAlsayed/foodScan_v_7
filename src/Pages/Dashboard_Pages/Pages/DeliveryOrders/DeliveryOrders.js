import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Componenets/Dashboard/Features/Breadcrumb";

import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import EditDeliveryOrder from "../../Models/Edit/EditDeliveryOrder";
import { getData } from "../../../../axiosConfig/API";
import Filtration from "../../Models/Filtration/DeliveryOrders";

export default function DeliveryOrders() {
  const componentRef = useRef();
  const [deliveryOrders, setDeliveryOrders] = useState([]);

  const [updated, setUpdated] = useState(false);
  const [editOrder, setEditOrder] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchDeliveryOrders = useCallback(async () => {
    try {
      const result = await getData("admin/orders");
      setDeliveryOrders(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchDeliveryOrders();
    if (updated) fetchDeliveryOrders();
    setUpdated(false);
  }, [updated, fetchDeliveryOrders]);

  const handleModalClose = () => {
    setModalVisible(false);
    setEditOrder(null);
    setUpdated(true);
    document.body.style.overflow = "visible";
  };

  const handleEdit = (order) => {
    setEditOrder(order);
    setModalVisible(true);
    document.body.style.overflow = "hidden";
  };

  const columns = [
    {
      title: "ORDER ID",
      dataIndex: "id",
      key: "id",
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
        <span className={item.status}>{item.status}</span>
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
          <Link
            to="#"
            className="editIcon"
            data-tooltip="edit"
            onClick={() => handleEdit(item)}
            style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}
          >
            <FiEdit />
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
      <Filtration />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={deliveryOrders}
          pagination={true}
        />

        {modalVisible && (
          <EditDeliveryOrder
            visible={modalVisible}
            order={editOrder}
            modalClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
}