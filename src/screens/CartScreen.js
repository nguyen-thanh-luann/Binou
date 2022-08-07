import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import Layout from './Layout'
import { Store } from '../Store'
import { getProductById } from '../services/ProductService'
import '../scss/App.scss'
export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    cart: { cartItems },
  } = state

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const updateCartHandler = async (item, quantity) => {
    const { data } = await getProductById(item._id)
    if (data.countInStock < quantity) {
      window.alert('Sorry! Product is out of stock')
      return
    }
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    })
  }
  return (
    <Layout
      children={
        <>
          <Helmet>
            <title>Shopping Cart</title>
          </Helmet>
          {cartItems.length === 0 ? (
            <div className='cart-noti'>
              <p>
                Cart is empty.
                <Link to='/'> Go Shopping now</Link>
              </p>
            </div>
          ) : (
            <div className='cart-screen'>
              <div className='cart-item-table'>
                <table className='table table-hover border text-center align-middle'>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Photo</th>
                      <th>quantity</th>
                      <th>price</th>
                      <th>total</th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartItems.map((item) => (
                      <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>
                          <img src={item.image} alt='img' />
                        </td>
                        <td>
                          {item.quantity === 1 ? (
                            <i
                              className='fa-solid fa-minus'
                              style={{
                                border: '1px solid black',
                                borderRadius: '50%',
                                padding: '1px',
                              }}
                            ></i>
                          ) : (
                            <i
                              className='fa-solid fa-minus'
                              onClick={() =>
                                updateCartHandler(item, item.quantity - 1)
                              }
                              style={{
                                border: '1px solid black',
                                borderRadius: '50%',
                                padding: '1px',
                              }}
                            ></i>
                          )}{' '}
                          {item.quantity}{' '}
                          {item.quantity === item.countInStock ? (
                            <i
                              className='fa-solid fa-plus'
                              style={{
                                border: '1px solid black',
                                borderRadius: '50%',
                                padding: '1px',
                              }}
                            ></i>
                          ) : (
                            <i
                              className='fa-solid fa-plus'
                              onClick={() =>
                                updateCartHandler(item, item.quantity + 1)
                              }
                              style={{
                                border: '1px solid black',
                                borderRadius: '50%',
                                padding: '1px',
                              }}
                            ></i>
                          )}
                        </td>
                        <td>${item.price}</td>
                        <td>${item.price * item.quantity}</td>
                        <td>
                          <i
                            className='fa-solid fa-trash text-danger'
                            onClick={() => removeItemHandler(item)}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='cart-total'>
                <h4 className='text-center'>Bill</h4>
                <h5>
                  Invoice Total:{' '}
                  {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                </h5>
                <button className='btn btn-success'>Checkout</button>
              </div>
            </div>
          )}
        </>
      }
    />
  )
}
