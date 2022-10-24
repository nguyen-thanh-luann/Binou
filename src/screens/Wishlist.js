import React, { useContext, useEffect, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'

import { Store } from '../Store'
import Penguin from '../components/Penguin'
import Footer from '../components/Footer'
import Header from '../components/Header'
import AddToCartBtn from '../components/AddToCartBtn'
import { Helmet } from 'react-helmet-async'
import ProductRate from '../components/ProductRate'
import WishlistBtn from '../components/WishlistBtn'

export default function Wishlist() {
  const { state } = useContext(Store)
  const [products, setProducts] = useState()
  const { userInfo } = state

  useEffect(() => {
    if (userInfo) {
      setProducts(userInfo.wishlist)
    }
  }, [])

  return (
    <div>
      <Header />
      <Helmet>
        <title>Wishlish</title>
      </Helmet>

      {userInfo ? (
        <>
          {userInfo.wishlist.length > 0 ? (
            <Box p={4}>
              <h2>WISHLIST</h2>
              <Grid container spacing={2} columns={1}>
                {products &&
                  products.map((product, index) => (
                    <Grid item key={index} xs={12}>
                      <Grid
                        sx={{ borderTop: '1px solid #ccc', marginTop: '1rem' }}
                        container
                        p={2}
                        spacing={2}
                        columns={12}
                      >
                        <Grid
                          item
                          sx={{ position: 'relative' }}
                          xs={12}
                          sm={3}
                          md={3}
                        >
                          <img
                            className='w-100 h-100'
                            src={product.image}
                            alt='product'
                          />
                          <span
                            style={{
                              position: 'absolute',
                              top: '30px',
                              right: '20px',
                            }}
                          >
                            <WishlistBtn product={product} />
                          </span>
                        </Grid>
                        <Grid item xs={12} sm={9} md={6}>
                          <Typography
                            sx={{
                              fontSize: {
                                xs: 15,
                                sm: 20,
                                md: 25,
                                lg: 30,
                              },
                              fontWeight: 'bold',
                            }}
                          >
                            {product.name}
                          </Typography>
                          <ProductRate rating={product.rating} />
                          <Typography
                            sx={{
                              fontSize: {
                                xs: 10,
                                sm: 15,
                                md: 18,
                              },
                            }}
                          >
                            {product.description}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: {
                                xs: 10,
                                md: 15,
                              },
                            }}
                          >
                            Brand: {product.brand}
                          </Typography>
                          <Typography
                            sx={{
                              fontSize: {
                                xs: 10,
                                sm: 15,
                                md: 20,
                              },
                              fontWeight: 'bold',
                            }}
                          >
                            ${product.price}
                          </Typography>
                        </Grid>
                        <Grid item xs={12} md={3}>
                          <AddToCartBtn product={product} orderNumber={1} />
                        </Grid>
                      </Grid>
                    </Grid>
                  ))}
              </Grid>
            </Box>
          ) : (
            <h3
              style={{
                textAlign: 'center',
                color: 'pink',
                fontWeight: 'bold',
                marginTop: '1rem',
              }}
            >
              <p>There are no items in your wish lish!</p>
              <p>Click the heart to add items to your wish list.</p>
              <Penguin />
            </h3>
          )}
        </>
      ) : (
        <Box p={4}>
          <h3 className='text-center text-success'>
            Hey! You Should login first
          </h3>
          <Penguin />
        </Box>
      )}

      <Footer />
    </div>
  )
}
