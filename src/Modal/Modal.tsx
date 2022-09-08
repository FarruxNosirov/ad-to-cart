import React from "react";
import styled from "styled-components";
import { CartItemType } from "../App";
import ModalCart from "./ModalCart";

const Wrapper = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  width: 500px;
  padding: 20px;
  top: 0;
  position: fixed;
  right: -100%;
  z-index: 100;
  background-color: white;
  height: 100%;
  transition: all 0.5s ease-in-out;
  .close {
    cursor: pointer;
    text-align: right;
  }
`;
type ModalType = {
  cartItems: CartItemType[];
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
  openModalHandler: () => void;
  cartOpen: boolean;
};

const Modal: React.FC<ModalType> = ({
  cartItems,
  addToCart,
  removeFromCart,
  openModalHandler,
  cartOpen,
}) => {
  return (
    <Wrapper style={{ right: cartOpen ? "0%" : "-100%" }}>
      <div className="close" onClick={openModalHandler}>
        X
      </div>
      <h2>Your Shoping Cart</h2>
      {cartItems.length === 0 ? <p>No yor in cart </p> : null}
      <div className="container">
        {cartItems.map((item) => {
          return (
            <ModalCart
              key={item.id}
              item={item}
              addToCart={addToCart}
              removeFromCart={removeFromCart}
            />
          );
        })}
      </div>
    </Wrapper>
  );
};

export default Modal;
