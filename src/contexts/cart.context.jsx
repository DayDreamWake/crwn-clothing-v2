import { createContext,  useEffect, useReducer } from 'react';

const CART_ACTION_TYPES = {
  ADD_CART_ITEM: "ADD_CART_ITEM",
  REMOVE_CART_ITEM: "REMOVE_CART_ITEM",
  CLEAR_CART_ITEM: "CLEAR_CART_ITEM",
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_COUNT: "SET_CART_COUNT",
  SET_CART_TOTAL: "SET_CART_TOTAL",
}

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
}

const cartReducer = (state, action) => {
  const { type, payload } = action;
  const { cartItem, isCartOpen, cartItems, cartCount, cartTotal } = payload;
  switch(type){
    case CART_ACTION_TYPES.ADD_CART_ITEM:
      return {...state, cartItems: addCartItem(cartItems, cartItem)};
    case CART_ACTION_TYPES.REMOVE_CART_ITEM:
      return {...state, cartItems: removeCartItem(cartItems, cartItem)};
    case CART_ACTION_TYPES.CLEAR_CART_ITEM:
      return {...state, cartItems: clearCartItem(cartItems, cartItem)};
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return {...state, isCartOpen: isCartOpen};
    case CART_ACTION_TYPES.SET_CART_COUNT:
      return cartCount;
    case CART_ACTION_TYPES.SET_CART_TOTAL:
    default: cartTotal;
      throw new Error(`unhandled type ${type} in cartReducer`);
  }
}

const addCartItem = (cartItems, productToAdd) => {
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === productToAdd.id
  );

  if (existingCartItem) {
    return cartItems.map((cartItem) =>
      cartItem.id === productToAdd.id
        ? { ...cartItem, quantity: cartItem.quantity + 1 }
        : cartItem
    );
  }

  return [...cartItems, { ...productToAdd, quantity: 1 }];
};

const removeCartItem = (cartItems, cartItemToRemove) => {
  // find the cart item to remove
  const existingCartItem = cartItems.find(
    (cartItem) => cartItem.id === cartItemToRemove.id
  );

  // check if quantity is equal to 1, if it is remove that item from the cart
  if (existingCartItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  // return back cartitems with matching cart item with reduced quantity
  return cartItems.map((cartItem) =>
    cartItem.id === cartItemToRemove.id
      ? { ...cartItem, quantity: cartItem.quantity - 1 }
      : cartItem
  );
};

const clearCartItem = (cartItems, cartItemToClear) =>
  cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id);

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0,
});

export const CartProvider = ({ children }) => {
  const [{isCartOpen, cartItems, cartCount, cartTotal}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

  const setCartCount = (newCartCount) =>{
    dispatch({type: CART_ACTION_TYPES.SET_CART_COUNT, cartCount: newCartCount});
  }
  const setCartTotal = (newCartTotal) =>{
    dispatch({type: CART_ACTION_TYPES.SET_CART_COUNT, cartCount: newCartTotal});
  }
  const setIsCartOpen = (newIsOpen) =>{
    dispatch({type: CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen: newIsOpen});
  }
  useEffect(() => {
    const newCartCount = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity,
      0
    );
    setCartCount(newCartCount);
  }, [cartItems]);

  useEffect(() => {
    const newCartTotal = cartItems.reduce(
      (total, cartItem) => total + cartItem.quantity * cartItem.price,
      0
    );
    setCartTotal(newCartTotal);
  }, [cartItems]);

  const addItemToCart = (productToAdd) => {
    dispatch({type: CART_ACTION_TYPES.ADD_CART_ITEM, cartItems: cartItems, cartItem: productToAdd});
  };

  const removeItemToCart = (cartItemToRemove) => {
    dispatch({type: CART_ACTION_TYPES.REMOVE_CART_ITEM, cartItems: cartItems, cartItem: cartItemToRemove});
  };

  const clearItemFromCart = (cartItemToClear) => {
    dispatch({type: CART_ACTION_TYPES.CLEAR_CART_ITEM, cartItems: cartItems, cartItem: cartItemToClear});
  };

  const value = {
    isCartOpen,
    setIsCartOpen,
    addItemToCart,
    removeItemToCart,
    clearItemFromCart,
    cartItems,
    cartCount,
    cartTotal,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
