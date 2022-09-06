import React, { useContext } from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

import { Store } from '../Store'
import { getProductById } from '../services/ProductService'
import Rating from './Rating'

import '../scss/App.scss'
export default function Product({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const addToCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id)
    const quantity = existItem ? existItem.quantity + 1 : 1
    const { data } = await getProductById(item._id)
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock')
      return
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
  }

  return (
    <Card className='cart product'>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} className='card-img-top img-fluid' alt='' />
      </Link>
      <Card.Body>
        <Link
          className='cart-title'
          style={{ textDecoration: 'none', color: '#000' }}
          to={`/product/${product._id}`}
        >
          <h5 className='name'>{product.name}</h5>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <p className='price'>${product.price}</p>
        <p className='descr'>{product.description}</p>
        {product.countInStock === 0 ? (
          <Button variant='danger' disabled>
            Out of stock
          </Button>
        ) : (
          <Button
            variant='warning'
            onClick={() => {
              addToCartHandler(product)
            }}
          >
            <i className='fa-solid fa-plus me-2'></i>
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}
