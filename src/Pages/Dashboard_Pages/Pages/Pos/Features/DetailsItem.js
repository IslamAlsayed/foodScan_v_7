import "./DetailsItem.css";
import { useEffect, useState } from "react";
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from "react-icons/ai";

export default function DetailsItem({ visible, cartItem, modalClose }) {
  const [staticModalVisible, setStaticModalVisible] = useState(false);
  const [id, setId] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [size, setSize] = useState("medium");
  const [addonQuantity, setAddonQuantity] = useState(1);
  const [notes, setNotes] = useState("");

  useEffect(() => {
    setId(cartItem.id);
    setStaticModalVisible(visible);
  }, [cartItem]);

  const handleQuantityChange = (event) => {
    setQuantity(quantity + Number(event.target.value));
  };

  const handleAddonsQuantityChange = (event) => {
    setAddonQuantity(addonQuantity + Number(event.target.value));
  };

  const addItemToStore = () => {
    let updateItems;
    const cartItems = JSON.parse(localStorage.getItem("cartItems") || []);
    const statusExistItem = cartItems.find((order) => order.id == cartItem.id);

    if (statusExistItem) {
      updateItems = cartItems.map((item) => {
        if (item.id === cartItem.id) {
          const sizes = item.sizes || [];
          if (!sizes.includes(size)) {
            return {
              ...item,
              sizes: [...sizes, size],
              quantity: item.quantity + quantity,
              addonQuantity: item.addonQuantity + addonQuantity,
            };
          } else {
            return {
              ...item,
              quantity: item.quantity + quantity,
              addonQuantity: item.addonQuantity + addonQuantity,
            };
          }
        } else {
          return item;
        }
      });
    } else {
      const newItem = {
        ...cartItem,
        id,
        quantity,
        sizes: [size],
        addonQuantity,
        notes,
      };
      updateItems = [...cartItems, newItem];
    }

    localStorage.setItem("cartItems", JSON.stringify(updateItems));

    const event = new Event("storageUpdated");
    window.dispatchEvent(event);

    handleModalReset();
    modalClose();
  };

  const handleModalReset = () => {
    setQuantity(1);
    setSize("medium");
    setAddonQuantity(1);
    setNotes("");
  };

  return (
    <div className={`DetailsItem ${staticModalVisible ? "visible" : ""}`}>
      <form className="modal-content">
        <i className="fas fa-xmark xmarkModalClose" onClick={modalClose}></i>
        <div className="modal-body">
          <div className="item">
            <div className="item-img">
              <img src={cartItem.image} alt={cartItem.title} />
            </div>
            <div className="item-text">
              <b>{"cartItem name"}</b>
              <p>
                {
                  "cartItem description cartItem description cartItem description cartItem description cartItem description cartItem description"
                }
              </p>
              <b>${cartItem.price}</b>
            </div>
          </div>

          <div className="quantity">
            <label>quantity</label>
            <div>
              <AiOutlinePlusCircle onClick={() => setQuantity(quantity + 1)} />
              <input
                type="number"
                name="quantity"
                value={quantity}
                onChange={handleQuantityChange}
              />
              <AiOutlineMinusCircle
                onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}
              />
            </div>
          </div>

          <div className="sizes">
            <label>size</label>
            <div>
              <div className="size">
                <input
                  type="radio"
                  name="size"
                  id="small"
                  value="small"
                  checked={size === "small"}
                  onChange={(e) => setSize(e.target.value)}
                />
                <label htmlFor="small">small</label>
              </div>

              <div className="size">
                <input
                  type="radio"
                  name="size"
                  id="medium"
                  value="medium"
                  checked={size === "medium"}
                  onChange={(e) => setSize(e.target.value)}
                />
                <label htmlFor="medium">medium</label>
              </div>

              <div className="size">
                <input
                  type="radio"
                  name="size"
                  id="large"
                  value="large"
                  checked={size === "large"}
                  onChange={(e) => setSize(e.target.value)}
                />
                <label htmlFor="large">large</label>
              </div>
            </div>
          </div>

          <div className="addons">
            <label>addons</label>

            <div className="addon">
              <div className="addon-img">
                <img src={cartItem.image} alt="" />
              </div>
              <div className="addon-text">
                <p>cappuccino</p>
                <p>$1.20</p>
                <div className="quantity">
                  <AiOutlinePlusCircle
                    onClick={() => setAddonQuantity(addonQuantity + 1)}
                  />
                  <input
                    type="number"
                    name="addon_quantity"
                    value={addonQuantity}
                    onChange={handleAddonsQuantityChange}
                  />
                  <input type="hidden" name="addon_price" value={"1.5"} />
                  <AiOutlineMinusCircle
                    onClick={() =>
                      setAddonQuantity(
                        addonQuantity > 1 ? addonQuantity - 1 : 1
                      )
                    }
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="notes">
            <label>special instructions</label>
            <textarea
              className="form-control"
              name="notes"
              placeholder="add note like extra mayo, cheese etc..!"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <button
            type="button"
            className="btn form-control mt-3 fw-bold"
            onClick={addItemToStore}
          >
            <span>add to cart - ${cartItem.price}</span>
          </button>
        </div>
      </form>
    </div>
  );
}
