import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Components/Dashboard/Features/Breadcrumb";
import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import EditMeal from "../../Models/Edit/EditMeal";
import { getData } from "../../../../axiosConfig/API";
import Filtration from "../../Models/Filtration/Meals";
import AddRow from "../../Models/AddRow/Meals";

export default function Meals() {
  const componentRef = useRef();
  const [meals, setMeals] = useState([]);
  const [updated, setUpdated] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchMeals = useCallback(async () => {
    try {
      const result = await getData("admin/meals");
      setMeals(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchMeals();
  }, [fetchMeals]);

  useEffect(() => {
    if (updated) fetchMeals();
    setUpdated(false);
  }, [updated, fetchMeals]);

  const handleEdit = async (item) => {
    try {
      const categories = await getData("categories");
      setEditItem({ ...item, categories });
      setModalVisible(true);
      document.body.style.overflow = "hidden";
    } catch (error) {
      console.warn(error.response.data.error);
    }
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setEditItem(null);
    setUpdated(true);
    document.body.style.overflow = "visible";
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CATEGORY",
      dataIndex: "category_name",
      key: "category_name",
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      render: (text, record) => (
        <img
          src={`http://127.0.0.1:8000/storage/${record.image}`}
          alt={record.name}
          style={{ width: "70px", height: "auto" }}
        />
      ),
    },
    {
      title: "STATUS",
      key: "status",
      render: (text, item) => (
        <span className={item.status === 1 ? "active" : "inactive"}>
          {item.status === 1 ? "active" : "inactive"}
        </span>
      ),
    },
    {
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <>
          <Link
            to={`/admin/dashboard/meals/show/${item.id}`}
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
        <Table columns={columns} dataSource={meals} pagination={true} />

        {modalVisible && (
          <EditMeal
            visible={modalVisible}
            item={editItem}
            modalClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
}
