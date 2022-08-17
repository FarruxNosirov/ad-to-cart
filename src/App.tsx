import { useState } from "react";
import { useQuery } from "react-query";
import Drawer from "@material-ui/core/Drawer";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import AddShoppingCart from "@material-ui/icons/AddShoppingCart";
import Badge from "@material-ui/core/Badge";
// style//
import { StyleButton, Wrapper } from "./App.style";
import Item from "./Item/Item";
import Cart from "./Cart/Cart";

// type

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

// App

const App = () => {
  const { data, isLoading, error } = useQuery<CartItemType[]>(
    "products",
    getProducts
  );
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([] as CartItemType[]);

  // getTotalItem
  const getTotalItem = (items: CartItemType[]) =>
    items.reduce((ack: number, item) => ack + item.amount, 0);
  // handleAddToCart
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

  // return
  return (
    <Wrapper>
      <Drawer anchor="right" open={cartOpen} onClose={() => setCartOpen(false)}>
        <Cart
          cartItems={cartItems}
          addToCart={handleAddToCart}
          removeFromeCart={handleRemoveFromCart}
        />
      </Drawer>
      <StyleButton onClick={() => setCartOpen(true)}>
        <Badge badgeContent={getTotalItem(cartItems)} color="error">
          <AddShoppingCart />
        </Badge>
      </StyleButton>
      <Grid container spacing={3}>
        {data?.map((item) => (
          <Grid item key={item.id} xs={12} sm={4}>
            <Item item={item} handleAddToCart={handleAddToCart} />
            {/* ?ds */}
          </Grid>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default App;
