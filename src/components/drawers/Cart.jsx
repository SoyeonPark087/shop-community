import { useState } from "react";
import Drawer from "./Drawer";
import "./Cart.css";

const won = new Intl.NumberFormat("ko-KR");
const formatPrice = (price) => `₩ ${won.format(price)}`;
const itemKey = (item) => JSON.stringify([item.id, item.option, item.color]);

export default function Cart({ open, onClose, items = [], onItemsChange }) {
  const [unselectedKeys, setUnselectedKeys] = useState([]);
  const selectedKeys = items.map(itemKey).filter((key) => !unselectedKeys.includes(key));
  const isEmpty = items.length === 0;
  const allChecked = !isEmpty && selectedKeys.length === items.length;
  const productTotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingFee = 0;
  const totalPrice = productTotal + shippingFee;

  const handleToggleAll = () => {
    setUnselectedKeys(allChecked ? items.map(itemKey) : []);
  };

  const handleToggleItem = (key) => {
    setUnselectedKeys((prev) =>
      prev.includes(key) ? prev.filter((value) => value !== key) : [...prev, key]
    );
  };

  const handleQuantity = (key, amount) => {
    onItemsChange((prev) => prev.map((item) =>
      itemKey(item) === key
        ? { ...item, quantity: Math.max(1, item.quantity + amount) }
        : item
    ));
  };

  const handleRemoveItem = (key) => {
    onItemsChange((prev) => prev.filter((item) => itemKey(item) !== key));
    setUnselectedKeys((prev) => prev.filter((value) => value !== key));
  };

  const handleRemoveSelected = () => {
    onItemsChange((prev) => prev.filter((item) => !selectedKeys.includes(itemKey(item))));
  };

  return (
    <Drawer open={open} onClose={onClose} title="Cart">
      {isEmpty ? (
        <div className="cart-content__empty">
          <p>Your bag is empty.</p>
        </div>
      ) : (
        <div className="cart-content">

          <div className="cart-select-all">
            <label className="cart-check">
              <input type="checkbox" checked={allChecked} onChange={handleToggleAll} />

              <span className="cart-check__box" />

              <span>
                All ({items.length})
              </span>
            </label>

            <button
              type="button"
              className="cart-remove-selected"
              onClick={handleRemoveSelected}
              disabled={selectedKeys.length === 0}
            >
              Remove Selected
            </button>
          </div>

          <div className="cart-items">
            {items.map((item) => (
              <article className="cart-item" key={itemKey(item)}>
                <label className="cart-check cart-item__check">
                  <input
                    type="checkbox"
                    checked={selectedKeys.includes(itemKey(item))}
                    onChange={() => handleToggleItem(itemKey(item))}
                  />

                  <span className="cart-check__box" />
                </label>

                <img className="cart-item__image" src={item.image} alt={item.name} />

                <div className="cart-item__info">
                  <h3>{item.name}</h3>

                  {item.nameKo && (
                    <p className="cart-item__name-ko">
                      {item.nameKo}
                    </p>
                  )}

                  <p className="cart-item__option">
                    Option {item.option}
                  </p>

                  <div className="cart-quantity">
                    <button type="button" onClick={() => handleQuantity(itemKey(item), -1)}>
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button type="button" onClick={() => handleQuantity(itemKey(item), 1)}>
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="cart-item__remove"
                  onClick={() => handleRemoveItem(itemKey(item))}
                  aria-label={`${item.name} 삭제`}
                >
                  ×
                </button>

                <strong className="cart-item__price">
                  {formatPrice(item.price * item.quantity)}
                </strong>
              </article>
            ))}
          </div>

          <div className="cart-summary">
            <div>
              <span>상품금액</span>
              <span>
                {formatPrice(productTotal)}
              </span>
            </div>

            <div>
              <span>배송비</span>
              <span>
                {formatPrice(shippingFee)}
              </span>
            </div>
          </div>

          <div className="cart-total">
            <strong>총 결제 금액</strong>

            <strong>
              {formatPrice(totalPrice)}
            </strong>
          </div>

          <div className="cart-actions">
            <button type="button" className="cart-actions__all">
              Checkout All
            </button>

            <button type="button" className="cart-actions__selected" disabled={selectedKeys.length === 0}>
              Checkout Selected
            </button>

            <button type="button" className="cart-actions__continue" onClick={onClose}>
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </Drawer>
  );
}
