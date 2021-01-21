// cart context
import React, { useState, useEffect } from 'react';
import localCart from '../utils/localCart';

const CartContext = React.createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(localCart);
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    // cart items
    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);
    setCartItems(newCartItems);

    // cart total
    let newTotal = cart.reduce((total, cartItem)=>{
      return (total += (cartItem.amount * cartItem.price));
    },0)

    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);

  }, [cart])

  const removeItem = (id) => {

  }
  const increaseAmount = (id) => { }
  const decreaseAmount = (id) => { }
  const addToCart = (product) => { }
  const clearCart = () => { }

  return <CartContext.Provider
    value={{ cart, total, cartItems, removeItem, increaseAmount, decreaseAmount, addToCart, clearCart }}
  >
    {children}
  </CartContext.Provider>
}

export { CartContext, CartProvider };