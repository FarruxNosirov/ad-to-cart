import React from "react";
import Button from "@material-ui/core/Button";
import { FC } from "react";
import { CartItemType } from "../App";
import { Wrapper } from "./Item.style";

type ItemProps = {
  item: CartItemType;
  handleAddToCart: (clickedItem: CartItemType) => void;
};
const Item: React.FC<ItemProps> = ({ item, handleAddToCart }) => (
  <Wrapper>
    <img src={item.image} alt={item.title} />
    <div>
      <h3>{item.title}</h3>
      <p>{item.description}</p>
      <h3>${item.price}</h3>
    </div>
    <button onClick={() => handleAddToCart(item)}>ADD TO CART</button>
  </Wrapper>
);

export default Item;
