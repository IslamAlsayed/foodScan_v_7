import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Componenets/Dashboard/Features/Breadcrumb";

import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import EditOffer from "../../Models/Edit/EditOffer";
import axios from "axios";
import Filtration from "../../Models/Filtration/Offers";
import AddRow from "../../Models/AddRow/Offers";

export default function Offers() {
  const componentRef = useRef();
  const [offers, setOffers] = useState([]);

  const [updated, setUpdated] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const AdminToken = JSON.parse(localStorage.getItem("AdminToken")) || null;

  const fetchOffers = useCallback(async () => {
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/admin/offers",
        {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${AdminToken}`,
          },
        }
      );

      if (response) setOffers(response.data.data);
    } catch (error) {
      console.error("Error fetching offers:", error);
    }
  }, []);

  useEffect(() => {
    fetchOffers(1);
  }, [fetchOffers]);

  useEffect(() => {
    if (updated) fetchOffers(1);
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
      title: "AMOUNT",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "START DATE",
      dataIndex: "start_date",
      key: "start_date",
    },
    {
      title: "END DATE",
      dataIndex: "end_date",
      key: "end_date",
    },
    {
      title: "STATUS",
      key: "status",
      render: (text, item) =>
        item.status === "active" ? (
          <span style={{ "--c": "#35B263", "--bg": "#DCFCE7" }}>
            {item.status}
          </span>
        ) : (
          <span style={{ "--c": "#ff4f20", "--bg": "#ffe8e8" }}>
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
            to={`/admin/dashboard/offer/show/${item.key}`}
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
          <Link
            to="#"
            className="trashIcon"
            data-tooltip="delete"
            style={{ "--c": "#F15353", "--bg": "#FECACA" }}
          >
            <BiTrash />
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
        {/* <Table columns={columns} dataSource={data} pagination={true} /> */}

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
