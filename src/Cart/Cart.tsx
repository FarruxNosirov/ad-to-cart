import React, { FC } from "react";
import CartItem from "../CartItem/CartItem";
import { CartItemType } from "../App";
import { Wrapper } from "./Cart.style";

type CartProps = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromeCart: (id: number) => void;
};

const Cart: React.FC<CartProps> = ({
  cartItems,
  addToCart,
  removeFromeCart,
}) => {
  const calkulator = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount * item.price, 0);
  return (
    <Wrapper>
      <h2>Your shoping Cart</h2>
      {cartItems.length === 0 ? <p>No items in cart</p> : null}
      {cartItems.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          addToCart={addToCart}
          removeFromeCart={removeFromeCart}
        />
      ))}
      <h2>total:${calkulator(cartItems).toFixed(2)}</h2>
    </Wrapper>
  );
};

export default Cart;
