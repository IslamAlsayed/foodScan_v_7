import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import EditOffer from "../../Models/Edit/EditOffer";
import Filtration from "../../Models/Filtration/Offers";
import AddRow from "../../Models/AddRow/Offers";
import { getData } from "../../../../axiosConfig/API";

export default function Offers() {
  const componentRef = useRef();
  const [offers, setOffers] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchOffers = useCallback(async () => {
    try {
      const result = await getData("admin/offers");
      setOffers(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

  useEffect(() => {
    if (updated) fetchOffers();
    setUpdated(false);
  }, [updated, fetchOffers]);

  const handleModalClose = () => {
    setModalVisible(false);
    setEditItem(null);
    setUpdated(true);
    document.body.style.overflow = "visible";
  };

  const handleEdit = async (item) => {
    setEditItem(item);
    setModalVisible(true);
    document.body.style.overflow = "hidden";
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "DISCOUNT",
      dataIndex: "discount",
      key: "discount",
    },
    {
      title: "START DATE",
      dataIndex: "startDate",
      key: "startDate",
    },
    {
      title: "END DATE",
      dataIndex: "endDate",
      key: "endDate",
    },
    {
      title: "STATUS",
      key: "status",
      render: (text, item) => (
        <span className={item.status === "active" ? "active" : "inactive"}>
          {item.status}
        </span>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <>
          <Link
            to={`/admin/dashboard/offer/show/${item.id}`}
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

      {/* Add Row */}
      <AddRow />

      <div className="tableItems" ref={componentRef}>
        <Table columns={columns} dataSource={offers} pagination={true} />

        {modalVisible && (
          <EditOffer
            visible={modalVisible}
            item={editItem}
            modalClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
}
