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
import UpdateMultiStatus from "../Actions/UpdateMultiStatus";

export default function Offers() {
  const componentRef = useRef();
  const [offers, setOffers] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [modalVisibleToggle, setModalVisibleToggle] = useState(false);
  const [modalEditVisibleToggle, setModalEditVisibleToggle] = useState(false);

  const fetchOffers = useCallback(async () => {
    try {
      const result = await getData("admin/offers");
      setOffers(result);
    } catch (error) {
      console.error(error.response.data.message);
    }
  }, []);

  useEffect(() => {
    fetchOffers();
  }, [fetchOffers]);

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
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
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
      render: (text, item) => (
        <UpdateMultiStatus
          url={`admin/offers/${item.id}`}
          item={item}
          updated={fetchOffers}
          list={[
            { value: 1, label: "active" },
            { value: 0, label: "inactive" },
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
      <Filtration handleModalToggle={handleModalToggle} />

      {/* Add Row */}
      <AddRow
        visible={modalVisibleToggle}
        visibleToggle={handleModalToggle}
        updated={fetchOffers}
      />

      {/* Edit Row */}
      <EditOffer
        visible={modalEditVisibleToggle}
        visibleToggle={handleModalEditToggle}
        item={editItem}
        updated={fetchOffers}
      />

      <div className="tableItems" ref={componentRef}>
        <Table columns={columns} dataSource={offers} pagination={true} />
      </div>
    </div>
  );
}
