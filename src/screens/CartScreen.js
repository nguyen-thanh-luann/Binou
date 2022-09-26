import React, { useContext } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'

import { AiFillPlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { BiTrashAlt } from 'react-icons/bi'

import Layout from './Layout'
import { Store } from '../Store'
import { getProductById } from '../services/ProductService'
import Style from '../scss/CartScreen.module.scss'
import Swal from 'sweetalert2'
export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const {
    cart: { cartItems },
    userInfo,
  } = state

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const updateCartHandler = async (item, quantity) => {
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
  }

  const checkoutHandler = () => {
    if (userInfo) {
      window.alert('comming soon')
    } else {
      window.location.href = '/login'
    }
  }
  return (
    <Layout
      children={
        <>
          <Helmet>
            <title>Shopping Cart</title>
          </Helmet>
          {cartItems.length === 0 ? (
            <div className={Style.cartNoti}>
              <p>
                Cart is empty.
                <Link to='/'> Let's Shopping now!</Link>
              </p>
            </div>
          ) : (
            <>
              <h2 className={Style.cartTitle}>
                Cool! Let's checkout to get new clothes
              </h2>
              <div className={Style.cartScreen}>
                <div className={Style.cartItemTable}>
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
                        <tr key={item._id} className='justify-content-center'>
                          <td>{item.name}</td>
                          <td>
                            <img src={item.image} alt='img' />
                          </td>
                          <td>
                            {item.quantity <= 1 ? (
                              <AiOutlineMinusCircle
                                role='button'
                                style={{ cursor: 'not-allowed' }}
                              />
                            ) : (
                              <AiOutlineMinusCircle
                                role='button'
                                onClick={() =>
                                  updateCartHandler(item, item.quantity - 1)
                                }
                              />
                            )}{' '}
                            {item.quantity}{' '}
                            {item.quantity >= item.countInStock ? (
                              <AiFillPlusCircle
                                role='button'
                                style={{ cursor: 'not-allowed' }}
                              />
                            ) : (
                              <AiFillPlusCircle
                                role='button'
                                onClick={() =>
                                  updateCartHandler(item, item.quantity + 1)
                                }
                              />
                            )}
                          </td>
                          <td>${item.price}</td>
                          <td>${item.price * item.quantity}</td>
                          <td>
                            <BiTrashAlt
                              className='text-danger'
                              role={'button'}
                              onClick={() => {
                                Swal.fire({
                                  position: 'center',
                                  title: 'Are you sure remove the product?',
                                  icon: 'warning',
                                  showCancelButton: true,
                                  cancelButtonColor: 'red',
                                  cancelButtonText: 'Cancel',
                                  confirmButtonColor: 'rgba(0,0,0,0.6)',
                                  confirmButtonText: 'Remove',
                                }).then((result) => {
                                  if (result.isConfirmed) {
                                    removeItemHandler(item)
                                  }
                                })
                              }}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className={Style.cartBill}>
                  <h4 className='text-center'>Bill</h4>
                  <h5>
                    Invoice Total:{' '}
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h5>
                  <button
                    className='btn btn-success'
                    onClick={() => {
                      checkoutHandler()
                    }}
                  >
                    Checkout
                  </button>
                </div>
              </div>
            </>
          )}
        </>
      }
    />
  )
}
