import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'

import { AiFillPlusCircle, AiOutlineMinusCircle } from 'react-icons/ai'
import { BiTrashAlt } from 'react-icons/bi'

import Layout from './Layout'
import { Store } from '../Store'
import { getProductById } from '../services/ProductService'
import Style from '../scss/CartScreen.module.scss'
import Swal from 'sweetalert2'
import { style } from '@mui/system'

export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const [selectedItem, setSelectedItem] = useState()
  const {
    cart: { cartItems },
    userInfo,
  } = state

  const columns = [
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
    },
    {
      field: 'photo',
      headerName: 'Photo',
      width: 200,
      renderCell: (params) => (
        <img
          src={params.row.photo}
          style={{ width: '3rem', borderRadius: '30px' }}
          alt=''
        />
      ),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.quantity <= 1 ? (
            <AiOutlineMinusCircle
              role='button'
              style={{ cursor: 'not-allowed' }}
            />
          ) : (
            <AiOutlineMinusCircle
              role='button'
              onClick={() =>
                updateCartHandler(params.row.item, params.row.quantity - 1)
              }
            />
          )}{' '}
          {params.row.quantity}{' '}
          {params.row.quantity >= params.row.countInStock ? (
            <AiFillPlusCircle role='button' style={{ cursor: 'not-allowed' }} />
          ) : (
            <AiFillPlusCircle
              role='button'
              onClick={() =>
                updateCartHandler(params.row.item, params.row.quantity + 1)
              }
            />
          )}
        </div>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      width: 100,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 100,
    },
  ]

  const rows = cartItems.map((item, index) => ({
    id: item._id,
    item,
    name: item.name,
    photo: item.image,
    quantity: item.quantity,
    price: item.price,
    total: item.price * item.quantity,
  }))

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
              {/* <div className={Style.cartScreen}>
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
              </div> */}
              <button
                className='text-danger mb-2'
                onClick={() => {
                  if (window.confirm('delete item?')) {
                    removeItemHandler(selectedItem)
                  }
                }}
              >
                delete
              </button>
              <div style={{ height: '400px', width: '100%' }}>
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  rowsPerPageOptions={[5]}
                  checkboxSelection
                  onSelectionModelChange={(id) => {
                    setSelectedItem(id)
                  }}
                />
              </div>
            </>
          )}
        </>
      }
    />
  )
}
