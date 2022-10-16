import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'

import { Store } from '../Store'
import Style from '../scss/CartScreen.module.scss'
import { Box, Button, Grid, Typography } from '@mui/material'
import VerticalLine from '../components/VerticalLine'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const [selectedItems, setSelectedItems] = useState([])
  const {
    cart: { cartItems },
    userInfo,
  } = state

  const columns = [
    {
      field: 'photo',
      headerName: 'Photo',
      width: 150,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ margin: '0 auto' }}>
          <img
            src={params.row.photo}
            style={{ width: '80%', textAlign: 'center' }}
            alt=''
          />
        </Box>
      ),
    },
    {
      field: 'name',
      headerName: 'Name',
      headerAlign: 'center',
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            margin: '0 auto',
          }}
        >
          {params.row.name}
        </Box>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      headerAlign: 'center',
      width: 200,
      renderCell: (params) => (
        <Box
          sx={{
            margin: '0 auto',
          }}
        >
          ${params.row.price}
        </Box>
      ),
    },
    {
      field: 'quantity',
      headerName: 'Quantity',
      headerAlign: 'center',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ margin: '0 auto' }}>{params.row.quantity}</Box>
      ),
    },

    {
      field: 'total',
      headerName: 'Total',
      headerAlign: 'center',
      width: 200,
      renderCell: (params) => (
        <Box sx={{ margin: '0 auto', color: 'purple' }}>
          ${params.row.total}
        </Box>
      ),
    },
  ]

  const rows = cartItems.map((item) => ({
    item,
    id: item._id,
    name: item.name,
    photo: item.image,
    quantity: item.quantity,
    price: item.price,
    total: item.price * item.quantity,
  }))

  const removeItemHandler = (item) => {
    ctxDispatch({ type: 'CART_REMOVE_ITEM', payload: item })
  }

  const selectItemHandler = (selectItem) => {
    setSelectedItems(selectItem)
  }

  const checkoutHandler = () => {
    if (userInfo) {
      toast('Comming soon!', {
        position: 'top-right',
      })
    } else {
      window.location.href = '/login'
    }
  }
  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <Header />
      {cartItems.length === 0 ? (
        <div className={Style.cartNoti}>
          <p>
            Cart is empty.
            <Link to='/'> Let's Shopping now!</Link>
          </p>
        </div>
      ) : (
        <Box p={4}>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'purple',
              fontSize: '2rem',
              marginBottom: '1rem',
            }}
          >
            Cool! Let's checkout to get new clothes
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={9}>
              <Box
                sx={{
                  height: 500,
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
                  hideFooterSelectedRowCount={true}
                  onSelectionModelChange={(ids) => {
                    const selectedRowData = ids.map((id) =>
                      rows.find((row) => row.id === id)
                    )
                    selectItemHandler(selectedRowData)
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={12} lg={3}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {selectedItems && selectedItems.length > 0 ? (
                  <Button
                    variant='outlined'
                    color='error'
                    onClick={() => {
                      if (window.confirm('delete item?')) {
                        removeItemHandler(selectedItems)
                      }
                    }}
                  >
                    delete
                  </Button>
                ) : (
                  <Button variant='outlined' disabled>
                    Delete
                  </Button>
                )}

                <Typography sx={{ marginLeft: '1rem' }}>
                  {selectedItems.length} items
                </Typography>
              </Box>
              {/*Address  */}
              <Box
                p={1}
                mt={1}
                sx={{ border: '1px solid #ccc', borderRadius: '5px' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Address</Typography>
                  <Button color='secondary'>Change</Button>
                </Box>

                <Typography sx={{ display: 'flex', fontWeight: 'bold' }}>
                  Thanh Luan
                  <VerticalLine />
                  070 6431 927
                </Typography>

                <Typography sx={{ fontSize: '0.8rem' }}>
                  Công viên phần mềm Quang Trung, Phường Trung Mĩ Tây Quận 12,
                  Hồ Chí Minh.
                </Typography>
              </Box>
              {/*Bill  */}
              <Box
                p={1}
                mt={1}
                sx={{ border: '1px solid #ccc', borderRadius: '5px' }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Typography>Subtotal</Typography>
                  <Typography>
                    $
                    {selectedItems &&
                      selectedItems.reduce(
                        (a, c) => a + c.price * c.quantity,
                        0
                      )}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem',
                  }}
                >
                  <Typography>Discount</Typography>
                  <Typography color='error'>
                    {selectedItems.length !== 0 ? '5%' : 0}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '1rem',
                  }}
                >
                  <Typography>Total</Typography>
                  <Typography color='error'>
                    $
                    {selectedItems &&
                      Math.floor(
                        selectedItems.reduce(
                          (a, c) => a + c.price * c.quantity,
                          0
                        ) * 0.95
                      )}
                  </Typography>
                </Box>
              </Box>
              <Button
                color='secondary'
                variant='outlined'
                fullWidth
                sx={{ marginTop: '1rem' }}
                startIcon={<ShoppingCartCheckoutIcon />}
                onClick={() => checkoutHandler()}
              >
                Checkout
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
      <Footer />
    </>
  )
}
