import React, { useEffect, useState } from 'react'
import { getProductUseQuery } from '../services/ProductService'
import { Helmet } from 'react-helmet-async'

import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import { Box, Grid, Pagination, Stack, Typography } from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer'
import SearchBox from '../components/SearchBox'

export default function MenScreen() {
  const [products, setProducts] = useState()
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    pages: 1,
  })

  const loadProducts = () => {
    setIsLoadMore(true)
    getProductUseQuery(
      `gender=kids&limit=${pagination.limit}&page=${pagination.page}`
    )
      .then((res) => {
        setProducts(res.data.products)
        setPagination({
          ...pagination,
          pages: res.data.pages,
        })
        setIsLoadingPage(false)
        setIsLoadMore(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    loadProducts()
  }, [pagination.page])

  const handlePageChange = (event, value) => {
    setPagination({
      ...pagination,
      page: value,
    })
  }
  return (
    <div>
      <Helmet>
        <title>KIDS'S CLOSTHING</title>
      </Helmet>
      <Header />
      {isLoadingPage ? (
        <Box sx={{ textAlign: 'center' }}>
          <LoadingBox />
        </Box>
      ) : (
        <Box>
          {/* banner */}
          <Typography
            p={2}
            sx={{
              fontSize: {
                xs: 20,
                sm: 25,
                md: 30,
              },
            }}
          >
            KIDS
          </Typography>
          <Box>
            <Box sx={{ position: 'relative' }}>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1665928207/k_xlulrp.jpg'
                alt='men banner'
                style={{ width: '100%' }}
              />
              <Box
                sx={{
                  position: 'absolute',
                  top: '25%',
                  paddingLeft: {
                    xs: '1rem',
                    sm: '2rem',
                  },
                  color: '#fff',
                  width: {
                    xs: '100%',
                    sm: '50%',
                    md: '25%',
                  },
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 'bold',
                    fontSize: {
                      xs: 15,
                      sm: 20,
                      md: 30,
                    },
                  }}
                >
                  Down Coats
                </Typography>
                <Typography
                  sx={{
                    fontSize: {
                      xs: 10,
                      sm: 15,
                      md: 20,
                    },
                  }}
                >
                  Big warmth for little ones that won't weigh them down.
                </Typography>
              </Box>
            </Box>
          </Box>
          {/* products */}
          <Typography
            p={2}
            sx={{
              fontSize: {
                xs: 20,
                sm: 25,
                md: 30,
              },
            }}
          >
            FEATURED PRODUCTS
          </Typography>
          <Box px={4}>
            <Box
              sx={{
                display: {
                  xs: 'flex',
                  lg: 'none',
                },
                width: {
                  xs: '100%',
                  md: '20rem',
                },

                marginBottom: '1rem',
              }}
            >
              <SearchBox />
            </Box>
            <Grid container spacing={4} columns={12} mb={4}>
              {products &&
                products.map((product, index) => (
                  <Grid
                    key={index}
                    item
                    xs={10}
                    sm={6}
                    md={4}
                    lg={3}
                    sx={{
                      margin: {
                        xs: '0 auto',
                        sm: '0',
                      },
                    }}
                  >
                    <Product product={product} />
                  </Grid>
                ))}
            </Grid>

            {/* pagination */}
            <Stack mb={4} sx={{ alignItems: 'center' }}>
              {isLoadMore && <LoadingBox />}
              <Pagination
                count={pagination.pages}
                page={pagination.page}
                onChange={handlePageChange}
              />
            </Stack>
          </Box>
        </Box>
      )}
      <Footer />
    </div>
  )
}
