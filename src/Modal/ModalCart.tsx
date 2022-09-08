import Button from "@material-ui/core/Button";
import React from "react";
import styled from "styled-components";
import { CartItemType } from "../App";

type ModalCartProps = {
  item: CartItemType;
  addToCart: (clickedItem: CartItemType) => void;
  removeFromCart: (id: number) => void;
};
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: Arial, Helvetica, sans-serif;
  border-bottom: qpx solid lightblue;
  padding-bottom: 20px;
  div {
    flex: 1;
  }
  .information,
  .Button {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  img {
    max-width: 80px;
    object-fit: cover;
    margin-left: 40px;
  }
`;
const ModalCart: React.FC<ModalCartProps> = ({
  item,
  addToCart,
  removeFromCart,
}) => {
  return (
    <Wrapper>
      <div>
        <h3>{item.title}</h3>
        <div className="information">
          <p>Price: ${item.price} </p>
          <p>Total: ${(item.price * item.amount).toFixed(2)} </p>
        </div>
        <div className="Button">
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => removeFromCart(item.id)}
          >
            -
          </Button>
          <p>{item.amount}</p>
          <Button
            size="small"
            disableElevation
            variant="contained"
            onClick={() => addToCart(item)}
          >
            +
          </Button>
        </div>
      </div>
      <img src={item.image} alt={item.title} />
    </Wrapper>
  );
};

export default ModalCart;
