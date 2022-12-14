import React, { useContext } from 'react'
import Swal from 'sweetalert2'
import { Button } from '@mui/material'
import { toast } from 'react-toastify'

import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'

import { getProductById } from '../services/ProductService'
import { Store } from '../Store'

export default function AddToCartBtn({ product, orderNumber }) {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = async (item, orderNumber) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + orderNumber : orderNumber
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

    toast.success('Added to cart!', {
      position: 'bottom-left',
      closeOnClick: true,
      autoClose: 2000,
    })
  }
  return (
    <div>
      {product.countInStock === 0 ? (
        <Button
          variant='contained'
          color='error'
          startIcon={<RemoveShoppingCartIcon />}
          disabled
        >
          Out of stock
        </Button>
      ) : (
        <Button
          onClick={() => {
            addToCartHandler(product, orderNumber)
          }}
          variant='outlined'
          color='secondary'
          startIcon={<ShoppingCartIcon />}
        >
          <span>Add to cart</span>
        </Button>
      )}
    </div>
  )
}
