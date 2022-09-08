import { useState } from "react";
import { useQuery } from "react-query";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import { Badge, StyleButton, Wrapper } from "./App.style";
import Item from "./Item/Item";
import Modal from "./Modal/Modal";

export type CartItemType = {
  id: number;
  price: number;
  category: string;
  description: string;
  image: string;
  title: string;
  amount: number;
};
const getProducts = async (): Promise<CartItemType[]> => {
  return await (await fetch(`https://fakestoreapi.com/products`)).json();
};

// App//

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  console.log(data);

  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  const handleAddToCart = (clickedItem: CartItemType) => {
    setCartItems((prev) => {
      const isItemInCart = prev.find((item) => item.id === clickedItem.id);
      if (isItemInCart) {
        return prev.map((item) =>
          item.id === clickedItem.id
            ? { ...item, amount: item.amount + 1 }
            : item
        );
      }
      return [...prev, { ...clickedItem, amount: 1 }];
    });
  };

  const getTotalItems = (items: CartItemType[]) =>
    items.reduce((asc: number, item) => asc + item.amount, 0);

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) =>
      prev.reduce((ack, item) => {
        if (item.id === id) {
          if (item.amount === 1) return ack;
          return [...ack, { ...item, amount: item.amount - 1 }];
        } else {
          return [...ack, item];
        }
      }, [] as CartItemType[])
    );
  };

  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) {
    return <div>Something went wrong...</div>;
  }
  const openModalHandler = () => {
    setCartOpen((a) => !a);
  };
  return (
    <Wrapper>
      <Modal
        cartOpen={cartOpen}
        openModalHandler={openModalHandler}
        cartItems={cartItems}
        addToCart={handleAddToCart}
        removeFromCart={handleRemoveFromCart}
      />
      <StyleButton onClick={openModalHandler}>
        {cartItems.length > 0 ? (
          <Badge>{getTotalItems(cartItems)}</Badge>
        ) : null}

        <AddShoppingCart />
      </StyleButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
