import React, { useContext } from 'react'
import { Button } from 'react-bootstrap'
import Swal from 'sweetalert2'

import { BsCart } from 'react-icons/bs'

import { getProductById } from '../services/ProductService'
import { Store } from '../Store'
import Style from '../scss/AddToCartBtn.module.scss'

export default function AddToCartBtn({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await getProductById(item._id)
    if (data.countInStock < quantity) {
      Swal.fire({
        position: 'center',
        icon: 'error',
        title: 'Sorry! Product is out of stock',
        showDenyButton: false,
        showConfirmButton: false,
        timer: 1200,
      })
      return
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
    Swal.fire({
      icon: 'success',
      showConfirmButton: false,
      title: 'Product added to cart!',
      timer: 1200,
    })
  }
  return (
    <div>
      {product.countInStock === 0 ? (
        <Button className={Style.outStockBtn}>Out of stock</Button>
      ) : (
        <Button
          onClick={() => {
            addToCartHandler(product)
          }}
          className={Style.addBtn}
        >
          <BsCart />
          <span>Add to cart</span>
        </Button>
      )}
    </div>
  )
}
