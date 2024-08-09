import React from "react";
import Swal from "sweetalert2";
import { BiTrash } from "react-icons/bi";
import { deleteData } from "../../../../axiosConfig/API";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

export default function DeleteRecord({ url, refreshed }) {
  const handleDeleteRecord = async () => {
    Swal.fire({
      title: "Delete!",
      text: "Are you sure you want to delete this record?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#28a745",
      cancelButtonColor: "#dc3545",
      confirmButtonText: "Yes, delete record",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const response = await deleteData(url);
          if (response.status === "success") {
            refreshed();
            Swal.fire("Deleted!", response.message, "success");
          }
        } catch (error) {
          Swal.fire("Error!", error.response?.data?.message, "error");
        }
      }
    });
  };

  return (
    <Link
      to="#"
      className="trashIcon"
      data-tooltip="delete"
      onClick={() => handleDeleteRecord()}
      style={{ "--c": "#F15353", "--bg": "#FECACA" }}
    >
      <BiTrash />
    </Link>
  );
}
