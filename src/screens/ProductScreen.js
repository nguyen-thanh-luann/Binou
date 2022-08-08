import React, { useEffect, useState, useContext } from 'react'
import { useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import { Helmet } from 'react-helmet-async'

import { Store } from '../Store'
import Layout from './Layout'
import Rating from '../components/Rating'
import { getProductById } from '../services/ProductService'
import '../scss/App.scss'
export default function ProductScreen() {
  const param = useParams()
  const productId = param.id
  const [product, setProduct] = useState()
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const loadProduct = () => {
    getProductById(productId)
      .then((res) => {
        setProduct(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

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

  useEffect(() => {
    loadProduct()
  }, [])

  return (
    <Layout
      children={
        <div>
          {!product ? (
            <h4>product not found</h4>
          ) : (
            <div className='product-page'>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <div className='product-img'>
                <img src={product.image} alt='' className='img-fluid' />
              </div>
              <div className='product-info'>
                <h3>{product.name}</h3>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                />
                <h4 className='mt-2'>${product.price}</h4>
                <div className='product-description'>
                  <p>{product.description}</p>
                </div>
                {product.countInStock === 0 ? (
                  <Button variant='danger' className='mt-2' disabled>
                    Out of stock
                  </Button>
                ) : (
                  <Button
                    variant='warning'
                    className='mt-2'
                    onClick={() => {
                      addToCartHandler(product)
                    }}
                  >
                    <i className='fa-solid fa-plus me-2'></i>
                    Add to cart
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      }
    />
  )
}
