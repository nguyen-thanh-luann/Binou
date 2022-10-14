import { createContext, useReducer } from 'react'

export const Store = createContext()

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  cart: {
    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
    cartSelectItems: localStorage.getItem('cartSelectItems')
      ? JSON.parse(localStorage.getItem('cartSelectItems'))
      : [],
  },
}

function reducer(state, action) {
  switch (action.type) {
    case 'USER_LOGIN':
      return { ...state, userInfo: action.payload }
    case 'USER_LOGOUT':
      return { ...state, userInfo: null }
    case 'CART_ADD_ITEM':
      // when user add a product to cart
      const newItem = action.payload
      const existItem = state.cart.cartItems.find(
        (item) => item._id === newItem._id
      )
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem]
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    case 'CART_REMOVE_ITEM': {
      let cartItems = [...state.cart.cartItems]
      action.payload.forEach((item) => {
        cartItems = cartItems.filter((cardItem) => cardItem._id !== item.id)
      })
      localStorage.setItem('cartItems', JSON.stringify(cartItems))
      return { ...state, cart: { ...state.cart, cartItems } }
    }
    case 'CART_CLEAR':
      return { ...state, cart: { ...state.cart, cartItems: [] } }
    case 'CART_SELECT_ITEM':
      // when user select product from cart to checkout
      const cartSelectItems = action.payload
      localStorage.setItem('cartSelectItems', JSON.stringify(cartSelectItems))
      return { ...state, cart: { ...state.cart, cartSelectItems } }
    default:
      return state
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState)
  const value = { state, dispatch }
  return <Store.Provider value={value}>{props.children}</Store.Provider>
}
