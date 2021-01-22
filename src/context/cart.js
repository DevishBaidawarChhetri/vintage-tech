// cart context
import React, { useState, useEffect } from 'react';

const getCartFromLocalStorage = () => {
  return localStorage.getItem('cart')
    ? JSON.parse(localStorage.getItem('cart'))
    : [];
}

const CartContext = React.createContext();
const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(getCartFromLocalStorage());
  const [total, setTotal] = useState(0);
  const [cartItems, setCartItems] = useState(0);

  useEffect(() => {
    // local storage init
    localStorage.setItem('cart', JSON.stringify(cart));
    // cart items
    let newCartItems = cart.reduce((total, cartItem) => {
      return (total += cartItem.amount);
    }, 0);
    setCartItems(newCartItems);

    // cart total
    let newTotal = cart.reduce((total, cartItem) => {
      return (total += (cartItem.amount * cartItem.price));
    }, 0)

    newTotal = parseFloat(newTotal.toFixed(2));
    setTotal(newTotal);

  }, [cart])

  const removeItem = (id) => {
    const newCart = [...cart].filter(item => item.id !== id);
    setCart(newCart);
  }
  const increaseAmount = (id) => {
    const newCart = [...cart].map(item => {
      return item.id === id ? { ...item, amount: item.amount + 1 } : { ...item };
    });
    setCart(newCart);
  }
  const decreaseAmount = (id, amount) => {
    if (amount === 1) {
      removeItem(id);
      return;
    } else {
      const newCart = [...cart].map(item => {
        return item.id === id ? { ...item, amount: item.amount - 1 } : { ...item };
      });
      setCart(newCart);
    }
  }
  const addToCart = (product) => {
    const { id, image: { name }, title, price } = product;
    const item = [...cart].find(item => item.id === id);
    if (item) {
      increaseAmount(id);
      return;
    } else {
      const newItem = { id, image: name, title, price, amount: 1 };
      const newCart = [...cart, newItem];
      setCart(newCart);
    }
  }
  const clearCart = () => { setCart([]) }

  return <CartContext.Provider
    value={{ cart, total, cartItems, removeItem, increaseAmount, decreaseAmount, addToCart, clearCart }}
  >
    {children}
  </CartContext.Provider>
}

export { CartContext, CartProvider };