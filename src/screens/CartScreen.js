import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import Layout from './Layout'
import { Store } from '../Store'
import { getProductById } from '../services/ProductService'
import Style from '../scss/CartScreen.module.scss'
import Swal from 'sweetalert2'

export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const [selectedItem, setSelectedItem] = useState()
  const {
    cart: { cartItems },
    userInfo,
  } = state

  const columns = [
    {
      field: 'photo',
      headerName: 'Photo',
      width: 150,
      textAlign: 'center',
      renderCell: (params) => (
        <img
          src={params.row.photo}
          style={{ width: '80%', textAlign: 'center' }}
          alt=''
        />
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 200,
    },

    {
      field: 'quantity',
      headerName: 'Quantity',
      width: 200,
      renderCell: (params) => (
        <div>
          {params.row.quantity <= 1 ? (
            <RemoveIcon role='button' style={{ cursor: 'not-allowed' }} />
          ) : (
            <RemoveIcon
              role='button'
              onClick={() =>
                updateCartHandler(params.row.item, params.row.quantity - 1)
              }
            />
          )}{' '}
          {params.row.quantity}{' '}
          {params.row.quantity >= params.row.countInStock ? (
            <AddIcon role='button' style={{ cursor: 'not-allowed' }} />
          ) : (
            <AddIcon
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
      width: 200,
    },
    {
      field: 'total',
      headerName: 'Total',
      width: 200,
    },
  ]

  const rows = cartItems.map((item) => ({
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
              {/*
       
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
              <div
                style={{
                  height: 500,
                  width: '70%',
                }}
              >
                <DataGrid
                  rows={rows}
                  columns={columns}
                  pageSize={5}
                  disableSelectionOnClick
                  rowsPerPageOptions={[5]}
                  getRowHeight={({ id, densityFactor }) => {
                    return 120 * densityFactor
                  }}
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
