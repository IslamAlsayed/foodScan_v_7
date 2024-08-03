import "../Models.css";
import React, { useEffect, useState, useRef } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { updateData } from "../../../../axiosConfig/API";

export default function EditOffer({ visible, item, modalClose }) {
  const imageRef = useRef(null);
  const [staticModalVisible, setStaticModalVisible] = useState(false);
  const [offer, setOffer] = useState({
    name: "",
    discount: "",
    startDate: "",
    endDate: "",
    image: null,
    status: 1,
  });

  useEffect(() => {
    setStaticModalVisible(visible);
    if (item) setOffer(item);
  }, [item]);

  const handleChange = (e) => {
    const { name, value, id, type, files } = e.target;

    setOffer((prevData) => {
      if (name === "status") {
        return {
          ...prevData,
          status: id === "active" ? 1 : 0,
        };
      }
      if (name === "image" && type === "file") {
        return {
          ...prevData,
          image: files[0],
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", offer.name);
    formData.append("discount", offer.discount);
    formData.append("startDate", offer.startDate);
    formData.append("endDate", offer.endDate);
    if (offer.image) formData.append("image", offer.image);
    formData.append("status", offer.status);

    try {
      const response = await updateData(
        `admin/offers/${item.id}`,
        formData,
        "put"
      );

      if (response.status === "success") {
        setOffer({
          name: "",
          discount: "",
          startDate: "",
          endDate: "",
          image_file: null,
          status: 1,
        });

        modalClose();

        if (imageRef.current) imageRef.current.value = null;

        Swal.fire("Updated!", response.message, "success");
      }
    } catch (error) {
      if (error.response && error.response.status === 422) {
        Swal.fire("Error!", "Validation error occurred.", "error");
      } else {
        Swal.fire("Error!", error.response.data.error, "error");
      }
    }
  };

  return (
    <div id="AddTable" className={staticModalVisible ? "visible" : ""}>
      <div className="modal-container">
        <div className="breadcrumb">
          <h3>{window.location.pathname.replace("/admin/dashboard/", "")}</h3>
          <div className="closeSidebar">
            <HiXMark onClick={() => modalClose()} />
          </div>
        </div>
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    name <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    id="name"
                    onChange={handleChange}
                    value={offer.name}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="discount" className="form-label">
                    discount <span className="star">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="discount"
                    id="discount"
                    onChange={handleChange}
                    value={offer.discount}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="startDate" className="form-label">
                    start date <span className="star">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="startDate"
                    id="startDate"
                    onChange={handleChange}
                    value={offer.startDate}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="endDate" className="form-label">
                    end date <span className="star">*</span>
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    name="endDate"
                    id="endDate"
                    onChange={handleChange}
                    value={offer.endDate}
                    required
                  />
                </div>
              </div>

              <div className="col-12">
                <div className="mb-3">
                  <label htmlFor="image" className="form-label">
                    image (548px,140px) <span className="star">*</span>
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    name="image"
                    id="image"
                    ref={imageRef}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="col-6">
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">
                    status
                  </label>
                  <div className="row">
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="active"
                        required
                        value="1"
                        checked={offer.status === 1}
                        onChange={handleChange}
                      />
                      <label htmlFor="active">active</label>
                    </div>
                    <div className="col d-flex gap-2 align-items-center">
                      <input
                        type="radio"
                        name="status"
                        id="inactive"
                        required
                        value="0"
                        checked={offer.status === 0}
                        onChange={handleChange}
                      />
                      <label htmlFor="inactive">inactive</label>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col d-flex gap-3">
                <button type="submit" className="btn btn-primary">
                  <FaCheckCircle />
                  <span className="ps-2">save</span>
                </button>
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => modalClose()}
                >
                  <HiXMark />
                  <span className="ps-2">close</span>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
