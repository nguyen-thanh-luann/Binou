import React, { useContext, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Link, useNavigate } from 'react-router-dom'
import { DataGrid } from '@mui/x-data-grid'

import ShoppingCartCheckoutIcon from '@mui/icons-material/ShoppingCartCheckout'
import EditIcon from '@mui/icons-material/Edit'

import { Store } from '../Store'

import { Box, Button, Grid, Typography } from '@mui/material'
import VerticalLine from '../components/VerticalLine'
import { toast } from 'react-toastify'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function CartScreen() {
  const navigate = useNavigate()
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const [screenSize, setScreenSize] = useState(window.innerWidth)
  const [selectedItems, setSelectedItems] = useState([])
  const {
    cart: { cartItems },
    userInfo,
  } = state

  window.addEventListener('resize', function () {
    setScreenSize(window.innerWidth)
  })
  const columns = [
    {
      field: 'photo',
      headerName: 'Photo',
      width: `${screenSize < 500 ? 70 : 100}`,
      headerAlign: 'center',
      renderCell: (params) => (
        <Box sx={{ margin: '0 auto' }}>
          <Link to={`/product/${params.row.id}`}>
            <img
              src={params.row.photo}
              style={{ width: '100%', textAlign: 'center' }}
              alt=''
            />
          </Link>
        </Box>
      ),
    },
    {
      field: 'name',
      width: `${
        screenSize < 500
          ? 100
          : screenSize < 800
          ? 150
          : screenSize < 1300
          ? 200
          : 200
      }`,
      headerName: 'Name',
      headerAlign: 'center',
      renderCell: (params) => (
        <Box
          sx={{
            margin: '0 auto',
          }}
        >
          <Link
            style={{ color: '#000', textDecoration: 'none' }}
            to={`/product/${params.row.id}`}
          >
            {params.row.name}
          </Link>
        </Box>
      ),
    },
    {
      field: 'price',
      headerName: 'Price',
      headerAlign: 'center',
      width: `${
        screenSize < 500
          ? 100
          : screenSize < 800
          ? 150
          : screenSize < 1300
          ? 200
          : 200
      }`,
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
      width: `${
        screenSize < 500
          ? 100
          : screenSize < 800
          ? 150
          : screenSize < 1300
          ? 200
          : 200
      }`,
      renderCell: (params) => (
        <Box sx={{ margin: '0 auto' }}>{params.row.quantity}</Box>
      ),
    },

    {
      field: 'total',
      headerName: 'Total',
      headerAlign: 'center',
      width: `${
        screenSize < 500
          ? 100
          : screenSize < 800
          ? 150
          : screenSize < 1300
          ? 200
          : 200
      }`,
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
      if (isValidReceiveAddress(userInfo.phone, userInfo.address)) {
        toast('Comming soon', {
          position: 'bottom-left',
        })
      } else {
        toast.warning('Please enter receive infomation', {
          position: 'bottom-left',
        })
        window.location.href = '/login'
      }
    } else {
      window.location.href = '/login'
    }
  }

  const isValidReceiveAddress = (phone, address) => {
    return phone !== '' && address !== ''
  }
  return (
    <>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <Header />
      {cartItems.length === 0 ? (
        <Box
          sx={{
            textAlign: 'center',
            margin: '20vh 0',
            fontSize: {
              xs: '1rem',
              sm: '1.5rem',
              md: '2rem',
            },
          }}
        >
          <Link
            to='/'
            style={{
              textDecoration: 'none',
              color: 'pink',
              fontWeight: 'bold',
            }}
          >
            {' '}
            Cart is empty <br />
            Let's Shopping now!
          </Link>
        </Box>
      ) : (
        <Box p={4}>
          <Typography
            sx={{
              textAlign: 'center',
              color: 'purple',
              marginBottom: '1rem',
              fontSize: {
                xs: '1.5rem',
                sm: '2rem',
              },
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

                  {userInfo && (
                    <Button
                      color='secondary'
                      onClick={() => {
                        navigate('/userInfo')
                      }}
                      startIcon={<EditIcon />}
                    >
                      Change
                    </Button>
                  )}
                </Box>

                <Box>
                  {userInfo ? (
                    <>
                      <Typography
                        sx={{
                          display: 'flex',
                          fontWeight: 'bold',
                          textTransform: 'capitalize',
                        }}
                      >
                        {userInfo.name}
                        <VerticalLine />
                        {userInfo.phone !== '' ? (
                          userInfo.phone
                        ) : (
                          <Link to='/userInfo'>
                            <EditIcon style={{ fontSize: '1em' }} />
                            Add phone number
                          </Link>
                        )}
                      </Typography>
                      <Typography sx={{ fontSize: '0.8rem' }}>
                        {userInfo.address !== '' ? (
                          userInfo.address
                        ) : (
                          <Link to='/userInfo'>
                            <EditIcon style={{ fontSize: '1em' }} />
                            Add Addresss
                          </Link>
                        )}
                      </Typography>
                    </>
                  ) : (
                    <Button
                      fullWidth
                      variant='outlined'
                      color='secondary'
                      onClick={() => {
                        navigate('/login')
                      }}
                    >
                      Login
                    </Button>
                  )}
                </Box>
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
                      Math.round(
                        selectedItems.reduce(
                          (a, c) => a + c.price * c.quantity,
                          0
                        ) * 100
                      ) / 100}
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
                      Math.round(
                        selectedItems.reduce(
                          (a, c) => a + c.price * c.quantity,
                          0
                        ) *
                          0.95 *
                          100
                      ) / 100}
                  </Typography>
                </Box>
              </Box>
              {selectedItems.length >= 1 ? (
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
              ) : (
                <Button
                  variant='outlined'
                  fullWidth
                  sx={{ marginTop: '1rem' }}
                  startIcon={<ShoppingCartCheckoutIcon />}
                  disabled
                >
                  Checkout
                </Button>
              )}
            </Grid>
          </Grid>
        </Box>
      )}
      <Footer />
    </>
  )
}
