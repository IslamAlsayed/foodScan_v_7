import "../Invoice.css";
import React, { useEffect, useState } from "react";
import { PrinterOutlined } from "@ant-design/icons";

export default function Invoice({ visible, item, modalClose }) {
  const [staticModalVisible, setStaticModalVisible] = useState(false);
  const [invoiceItem, setInvoiceItem] = useState(false);
  const [cartItemTotal, setCartItemTotal] = useState(false);
  const storeCartItem = JSON.parse(localStorage.getItem("cartItems")) || null;

  useEffect(() => {
    setStaticModalVisible(visible);
  }, [item]);

  useEffect(() => {
    setInvoiceItem(storeCartItem);

    let total = storeCartItem.reduce(
      (prev, item) => prev + item.price * item.quantity,
      0
    );

    setCartItemTotal(total);
    console.log("invoiceItem", invoiceItem);
  }, []);

  const handlePrintInvoice = () => {
    window.print();
  };

  return (
    <div className={`modal-overlay ${staticModalVisible ? "visible" : ""}`}>
      <div className="modal-container">
        <div className="modal-content">
          <div className="options">
            <button className="btn btn-danger" onClick={modalClose}>
              cancel
            </button>
            <span className="itemTotal">total ${cartItemTotal}</span>
            <button className="btn btn-success" onClick={handlePrintInvoice}>
              <PrinterOutlined />
              print invoice
            </button>
          </div>

          <div className="message-qrCode">
            foodScan - qrCode restaurant menu maker and contactless menu
            ordering system
          </div>

          <div className="restaurant-address">
            <p>{"house:25, road no:2, block a, mirpur-1, dhaka 1216"}</p>
            <p>tel: {"+4545344545"}</p>
          </div>

          <div className="id_date">
            <p className="fw-bold">
              <span>order id</span>
              <span>{"#48448646"}</span>
            </p>
            <p className="fw-bold">
              <span>{"02-05-2024"}</span>
              <span>{"11:54 pm"}</span>
            </p>
          </div>

          <div className="menu">
            <table>
              <thead>
                <tr>
                  <th>qty</th>
                  <th>title</th>
                  <th>size</th>
                  <th>price</th>
                </tr>
              </thead>
              <tbody>
                {invoiceItem
                  ? invoiceItem.map((item, index) => (
                      <tr key={index}>
                        <td>{item.quantity}</td>
                        <td>{item.title}</td>
                        <td>{item.size}</td>
                        <td>${item.price * item.price}</td>
                      </tr>
                    ))
                  : false}
              </tbody>
            </table>
          </div>

          <div className="total">
            <div className="row">
              <div className="col">
                <span>DISCOUNT</span>
                <span>${"0.0"}</span>
              </div>

              <div className="col">
                <span>TOTAL TAX</span>
                <span>${"0.45"}</span>
              </div>
            </div>
            <div className="row">
              <div className="col">
                <span>SUBTOTAL</span>
                <span>${cartItemTotal}</span>
              </div>

              <div className="col">
                <span>TOTAL</span>
                <span>${cartItemTotal}</span>
              </div>
            </div>
          </div>

          <div className="messageThank">
            <p>thank you</p>
            <p>please come again</p>
          </div>
        </div>
      </div>
    </div>
  );
}
