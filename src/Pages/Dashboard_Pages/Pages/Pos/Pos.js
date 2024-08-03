import "./Pos.css";
import "../DataTable.css";
import React, { useCallback, useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { AiFillShopping } from "react-icons/ai";
import { FaShoppingBag } from "react-icons/fa";
import subMenuItems from "../../store/subMenu";
import subMainMenu from "../../store/mainMenu";
import AddCustomer from "./Features/AddCustomer";
import CartItems from "./Features/CartItems";
import DetailsItem from "./Features/DetailsItem";
import { getData } from "../../../../axiosConfig/API";
// import { addMonths } from "react-datepicker/dist/date_utils";

export default function Pos() {
  const [cartItemTotal, setCartItemTotal] = useState(1);

  // const fetchMenu = useCallback(async () => {
  //   try {
  //     const result = await getData("AllItems");
  //     console.log("allItems", result);
  //   } catch (error) {
  //     console.warn(error.response.data.error);
  //   }
  // }, []);

  // const fetchSubMenu = useCallback(async () => {
  //   try {
  //     const result = await getData("products");
  //     console.log("products", result);
  //   } catch (error) {
  //     console.warn(error.response.data.error);
  //   }
  // }, []);

  // useEffect(() => {
  //   fetchMenu();
  //   fetchSubMenu();
  // }, [fetchMenu, fetchSubMenu]);

  useEffect(() => {
    const cartItem = JSON.parse(localStorage.getItem("cartItems")) || null;

    let total = cartItem.reduce(
      (prev, item) => prev + item.price * item.quantity,
      0
    );
    setCartItemTotal(total);
  }, [localStorage.getItem("cartItems")]);

  const [cartItem, setCartItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const addToCart = (item) => {
    setCartItem(item);
    setModalVisible(true);
    document.body.style.overflow = "hidden";
  };

  const handleModalClose = () => {
    setModalVisible(false);
    setCartItem(null);
    document.body.style.overflow = "visible";
  };

  const handleToggleClass = (element) => {
    var parent = document.getElementById(element);
    if (parent) parent.classList.toggle("show");
  };

  return (
    <div className="Pos">
      <div className="posMenuItem">
        <div className="posSearch">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="search by menu item"
            />
            <button
              className="btn btn-outline-secondary iconSearch"
              type="button"
            >
              <IoIosSearch />
            </button>
          </div>
        </div>

        <div className="posContent">
          <div className="subMenu mb-4">
            <div className="cards">
              {subMenuItems.map((item) => (
                <a href="#" className="card">
                  <img src={item.image} alt={item.title} />
                  <small className="card-title">{item.title}</small>
                </a>
              ))}
            </div>
          </div>

          <div className="mainMenu">
            <div className="cards">
              {subMainMenu.map((item) => (
                <div className="card" id={item.id}>
                  <div className="card-img">
                    <img src={item.image} alt={item.image} />
                  </div>
                  <div className="card-body p-2">
                    <p className="fw-bold pb-2">{item.title}</p>
                    <div>
                      <span className="fw-bold price">${item.price}</span>
                      <button
                        className="addCartBtn"
                        onClick={() => addToCart(item)}
                      >
                        <FaShoppingBag /> add
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <button
          className="btn btn-primary openPosCartItems"
          onClick={() => handleToggleClass("posCartItems")}
        >
          <AiFillShopping />
          <span className="fs-6 fw-bold">items - </span>
          <span className="fs-6 fw-bold">${cartItemTotal}</span>
        </button>
      </div>

      <CartItems />
      {modalVisible && (
        <DetailsItem
          visible={modalVisible}
          cartItem={cartItem}
          modalClose={handleModalClose}
        />
      )}
      <AddCustomer />
    </div>
  );
}
