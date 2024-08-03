import "../DataTable.css";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { Table } from "antd";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Breadcrumb from "../../../../Componenets/Dashboard/Features/Breadcrumb";

import { FiEdit } from "react-icons/fi";
import { BsEye } from "react-icons/bs";
import { BiTrash } from "react-icons/bi";
import Swal from "sweetalert2";
import EditCategory from "../../Models/Edit/EditCategory";
import { getData, deleteData } from "../../../../axiosConfig/API";
import Filtration from "../../Models/Filtration/Categories";
import AddRow from "../../Models/AddRow/Categories";

export default function Categories() {
  const componentRef = useRef();
  const [categories, setCategories] = useState([]);

  const [updated, setUpdated] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const fetchCategories = useCallback(async () => {
    try {
      const result = await getData("categories");
      setCategories(result);
    } catch (error) {
      console.warn(error.response.data.error);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
    if (updated) fetchCategories();
    setUpdated(false);
  }, [updated, fetchCategories]);

  const handleModalClose = () => {
    setModalVisible(false);
    setEditItem(null);
    setUpdated(true);
    document.body.style.overflow = "visible";
  };

  const handleEdit = (item) => {
    setEditItem(item);
    setModalVisible(true);
    document.body.style.overflow = "hidden";
  };

  const handleDelete = async (id) => {
    Swal.fire({
      title: "Delete category",
      text: "Are you sure you want to delete this category?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete category",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const handleResponse = (responseData) => responseData;

        try {
          const response = await deleteData(`categories/${id}`);

          if (response) {
            Swal.fire("Category!", response.message, "success");

            setCategories((prevData) =>
              prevData.filter((data) => data.id !== id)
            );
          }
        } catch (error) {
          console.warn(error.response.data.error);
          Swal.fire("Error!", error.response.data.error, "error");
        }
      }
    });
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
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
      title: "ACTION",
      key: "action",
      render: (text, item) => (
        <>
          <Link
            to={`/admin/dashboard/categories/show/${item.id}`}
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
            onClick={() => handleDelete(item.id)}
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
        <Table columns={columns} dataSource={categories} pagination={true} />

        {modalVisible && (
          <EditCategory
            visible={modalVisible}
            item={editItem}
            modalClose={handleModalClose}
          />
        )}
      </div>
    </div>
  );
}