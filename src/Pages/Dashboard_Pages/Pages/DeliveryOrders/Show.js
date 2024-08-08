import "./Style.css";
import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { PrinterOutlined } from "@ant-design/icons";
import { MdDateRange } from "react-icons/md";
import ImageTest from "../../../../assets/global/profile.png";
import Swal from "sweetalert2";
import { getData, updateData } from "../../../../axiosConfig/API";

export default function Show() {
  const { id } = useParams();
  const [deliveryOrder, setDeliveryOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(null);

  const fetchOrder = useCallback(async (id) => {
    if (!id) return;
    try {
      const result = await getData(`admin/orders/${id}`);
      setDeliveryOrder(result);
      setStatus(result.status);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error.response?.data?.message);
    }
  }, []);

  useEffect(() => {
    fetchOrder(id);
  }, []);

  const handleStatusChange = async (e) => {
    e.preventDefault();

    let newStatus = e.target.value;

    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to update the status order?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, save it!",
      cancelButtonText: "No, cancel",
    }).then(async (result) => {
      if (result.isConfirmed) {
        setLoading(true);

        const formData = new FormData();
        formData.append("status", newStatus);
        formData.append("_method", "patch");

        try {
          const response = await updateData(
            `admin/orders/${id}`,
            formData,
            false
          );

          if (response) {
            setLoading(false);
            setStatus(newStatus);
          }
        } catch (error) {
          if (error.response && error.response.status === 422) {
            Swal.fire("Error!", "Validation error occurred.", "error");
          } else {
            Swal.fire("Error!", error.response.data.message, "error");
          }
        }
      }
    });
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="Show">
      <div className="head">
        <div className="details">
          <h4 className="id">
            <label>order id:</label>
            <b>#{id}</b>
            <span className={deliveryOrder.PaymentType}>
              {deliveryOrder.PaymentType}
            </span>
            <span className={status}>{status}</span>
          </h4>

          <div className="date">
            <span className="fs-6">
              <MdDateRange />
            </span>
            <label>{deliveryOrder.created_at}</label>
          </div>

          <div className="payment_type">
            <label>payment type:</label>
            <b>{deliveryOrder.PaymentType}</b>
          </div>

          <div className="order_type">
            <label>order type:</label>
            <b>{"dining table"}</b>
          </div>

          <div className="delivery_time">
            <label>delivery time:</label>
            <b>{deliveryOrder.created_at}</b>
          </div>

          <div className="table_id">
            <label>table id:</label>
            <b>{deliveryOrder.DiningTable_id}</b>
          </div>
        </div>

        <div className="options">
          <select name="payment_type" id="payment_type">
            <option
              value="Paid"
              selected={deliveryOrder.PaymentType === "Paid"}
            >
              Paid
            </option>
            <option
              value="Not Paid"
              selected={deliveryOrder.PaymentType === "Not Paid"}
            >
              Not Paid
            </option>
          </select>

          <select
            name="status"
            id="status"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="Not Started">Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Cancelled">Cancelled</option>
            <option value="Accepted">Accepted</option>
          </select>

          <button className="btn btn-primary" onClick={handlePrint}>
            <PrinterOutlined />
            print invoice
          </button>
        </div>
      </div>

      <div className="body d-flex">
        <div className="sections sections-left">
          <div className="title">
            <b>order details</b>
          </div>

          <div className="section">
            <div className="cards">
              <div className="card" data-id="1">
                <div className="card-img">
                  <img src={ImageTest} alt="image" />
                </div>
                <div className="card-text">
                  <p className="name fw-bold">kung peo chicken</p>
                  <p className="quantity">
                    quantity choice: <span className="fw-bold">6 pcs</span>
                  </p>
                  <b className="total">$12.2</b>
                </div>
              </div>

              <div className="card" data-id="2">
                <div className="card-img">
                  <img src={ImageTest} alt="image" />
                </div>
                <div className="card-text">
                  <p className="name fw-bold">kung peo chicken</p>
                  <p className="quantity">
                    quantity choice: <span className="fw-bold">6 pcs</span>
                  </p>
                  <b className="total">$12.2</b>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sections sections-right">
          <div className="section">
            <div className="title">
              <b>subTotal</b>
              <b>${deliveryOrder.total_cost}</b>
            </div>

            <div className="details">
              <b>total</b>
              <b>${deliveryOrder.total_cost}</b>
            </div>
          </div>

          <div className="section">
            <div className="title">
              <b>subTotal</b>
              <b>${deliveryOrder.total_cost}</b>
            </div>

            <div className="details">
              <b>total</b>
              <b>${deliveryOrder.total_cost}</b>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
