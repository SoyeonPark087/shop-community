import { useEffect, useMemo, useState } from "react";
import Drawer from "./Drawer";
import "./Cart.css";

const formatPrice = (price) =>
  `₩ ${new Intl.NumberFormat("ko-KR").format(price)}`;

export default function Cart({
  open,
  onClose,
  items = [],
}) {
  const [cartItems, setCartItems] = useState(items);
  const [selectedIds, setSelectedIds] = useState([]);

  useEffect(() => {
    setCartItems(items);
    setSelectedIds(items.map((item) => item.id));
  }, [items]);

  const isEmpty = cartItems.length === 0;

  const allChecked =
    cartItems.length > 0 &&
    selectedIds.length === cartItems.length;

  const productTotal = useMemo(() => {
    return cartItems.reduce(
      (sum, item) =>
        sum + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const shippingFee = 0;

  const totalPrice =
    productTotal + shippingFee;

  const handleToggleAll = () => {
    if (allChecked) {
      setSelectedIds([]);
    } else {
      setSelectedIds(
        cartItems.map((item) => item.id)
      );
    }
  };

  const handleToggleItem = (id) => {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((itemId) => itemId !== id)
        : [...prev, id]
    );
  };

  const handleQuantity = (
    id,
    amount
  ) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;

        return {
          ...item,
          quantity: Math.max(
            1,
            item.quantity + amount
          ),
        };
      })
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );

    setSelectedIds((prev) =>
      prev.filter((itemId) => itemId !== id)
    );
  };

  const handleRemoveSelected = () => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !selectedIds.includes(item.id)
      )
    );

    setSelectedIds([]);
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      title="Cart"
    >
      {isEmpty ? (
        <div className="cart-content__empty">
          <p>Your bag is empty.</p>
        </div>
      ) : (
        <div className="cart-content">
          {/* 전체 선택 */}
          <div className="cart-select-all">
            <label className="cart-check">
              <input
                type="checkbox"
                checked={allChecked}
                onChange={handleToggleAll}
              />

              <span className="cart-check__box" />

              <span>
                All ({cartItems.length})
              </span>
            </label>

            <button
              type="button"
              className="cart-remove-selected"
              onClick={handleRemoveSelected}
              disabled={
                selectedIds.length === 0
              }
            >
              Remove Selected
            </button>
          </div>

          {/* 상품 목록 */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <article
                className="cart-item"
                key={item.id}
              >
                <label className="cart-check cart-item__check">
                  <input
                    type="checkbox"
                    checked={selectedIds.includes(
                      item.id
                    )}
                    onChange={() =>
                      handleToggleItem(item.id)
                    }
                  />

                  <span className="cart-check__box" />
                </label>

                <img
                  className="cart-item__image"
                  src={item.image}
                  alt={item.name}
                />

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
                    <button
                      type="button"
                      onClick={() =>
                        handleQuantity(
                          item.id,
                          -1
                        )
                      }
                    >
                      −
                    </button>

                    <span>
                      {item.quantity}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        handleQuantity(
                          item.id,
                          1
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <button
                  type="button"
                  className="cart-item__remove"
                  onClick={() =>
                    handleRemoveItem(item.id)
                  }
                  aria-label={`${item.name} 삭제`}
                >
                  ×
                </button>

                <strong className="cart-item__price">
                  {formatPrice(
                    item.price *
                      item.quantity
                  )}
                </strong>
              </article>
            ))}
          </div>

          {/* 금액 */}
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

          {/* 하단 버튼 */}
          <div className="cart-actions">
            <button
              type="button"
              className="cart-actions__all"
            >
              Checkout All
            </button>

            <button
              type="button"
              className="cart-actions__selected"
              disabled={
                selectedIds.length === 0
              }
            >
              Checkout Selected
            </button>

            <button
              type="button"
              className="cart-actions__continue"
              onClick={onClose}
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </Drawer>
  );
}