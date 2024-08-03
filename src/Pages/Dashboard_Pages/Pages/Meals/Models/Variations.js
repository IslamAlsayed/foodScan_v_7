import "../../SubModels.css";
import React, { useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Row, Col } from "antd";
import { FaCheckCircle } from "react-icons/fa";
import { HiXMark } from "react-icons/hi2";
import Swal from "sweetalert2";
import { addData } from "../../../../../axiosConfig/API";

export default function Variations() {
  const id = useParams();
  const [meal, setMeal] = useState({
    size: "",
    number_of_piece: "",
    cost: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMeal({ ...meal, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("size", meal.size);
    formData.append("number_of_piece", meal.number_of_piece);
    formData.append("cost", meal.cost);

    const handleResponse = (responseData) => responseData;

    try {
      const response = await addData(
        `admin/meals/${id.id}/size-cost`,
        formData,
        handleResponse
      );

      if (response.status === "success") {
        setMeal({
          size: "",
          number_of_piece: "",
          cost: "",
        });

        Swal.fire("Saved!", response.message, "success");
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
    <div className="SubModel">
      <Row gutter={16}>
        <Col span={16}>
          <button
            type="button"
            className="btn btn-primary"
            data-bs-toggle="modal"
            data-bs-target="#addVariations"
          >
            add variations
          </button>
        </Col>
      </Row>

      <div
        className="modal fade"
        id="addVariations"
        tabIndex="-1"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        aria-labelledby="addVariationsLabel"
      >
        <div className="modal-dialog">
          <form className="modal-content" onSubmit={handleSubmit}>
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="addVariationsLabel">
                add variations
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <div className="row">
                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="size" className="form-label">
                      SIZE <span className="star">*</span>
                    </label>
                    <select
                      className="form-control"
                      name="size"
                      id="size"
                      value={meal.size}
                      onChange={handleChange}
                      required
                    >
                      <option value="">--</option>
                      <option value="1">small</option>
                      <option value="2">medium</option>
                      <option value="3">big</option>
                      <option value="4">family</option>
                    </select>
                  </div>
                </div>

                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="number_of_piece" className="form-label">
                      NUMBER OF PIECE <span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="number_of_piece"
                      id="number_of_piece"
                      value={meal.number_of_piece}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="col col-12 col-sm-6">
                  <div className="mb-3">
                    <label htmlFor="cost" className="form-label">
                      COST <span className="star">*</span>
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      name="cost"
                      id="cost"
                      value={meal.cost}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="submit" className="btn btn-primary">
                <FaCheckCircle />
                <span>save</span>
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                <HiXMark />
                <span>cancel</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
