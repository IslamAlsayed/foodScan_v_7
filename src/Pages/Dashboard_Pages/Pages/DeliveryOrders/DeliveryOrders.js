import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { getData } from "../../../../axiosConfig/API";
import Filtration from "../../Models/Filtration/DeliveryOrders";
import EditDeliveryOrder from "../../Models/Edit/EditDeliveryOrder";
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";

export default function DeliveryOrders() {
  const componentRef = useRef();
  const [deliveryOrders, setDeliveryOrders] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [modalVisibleToggle, setModalVisibleToggle] = useState(false);
  const [modalEditVisibleToggle, setModalEditVisibleToggle] = useState(false);

  const fetchDeliveryOrders = useCallback(async () => {
    try {
      const result = await getData("admin/orders");
      setDeliveryOrders(result);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    fetchDeliveryOrders();
  }, [fetchDeliveryOrders]);

  const handleModalToggle = () => {
    setModalVisibleToggle(!modalVisibleToggle);
    document.body.style.overflow = modalVisibleToggle ? "visible" : "hidden";
  };

  const handleModalEditToggle = () => {
    setModalEditVisibleToggle(!modalEditVisibleToggle);
    document.body.style.overflow = modalEditVisibleToggle
      ? "visible"
      : "hidden";
  };

  const handleEdit = async (item) => {
    setEditItem(item);
    setModalEditVisibleToggle(!modalEditVisibleToggle);
    document.body.style.overflow = modalEditVisibleToggle
      ? "visible"
      : "hidden";
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
        <UpdateMultiStatus
          url={`admin/orders/${item.id}`}
          item={item}
          updated={fetchDeliveryOrders}
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
      <Filtration handleModalToggle={handleModalToggle} />

      {/* Edit Row */}
      <EditDeliveryOrder
        visible={modalEditVisibleToggle}
        visibleToggle={handleModalEditToggle}
        item={editItem}
        updated={fetchDeliveryOrders}
      />

      <div className="tableItems" ref={componentRef}>
        <Table
          columns={columns}
          dataSource={deliveryOrders}
          pagination={true}
        />
      </div>
    </div>
  );
}
