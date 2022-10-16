import React, { useEffect, useState } from 'react'
import { getProductUseQuery } from '../services/ProductService'
import { Helmet } from 'react-helmet-async'

import Layout from './Layout'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import BannerCarousel from '../components/BannerCarousel'
import { Box, Grid, Pagination, Stack } from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer'

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
      `gender=female&limit=${pagination.limit}&page=${pagination.page}`
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
        <title>WOMEN'S CLOSTHING</title>
      </Helmet>
      <Header />
      <div style={{ maxHeight: '10%' }}>
        <BannerCarousel />
      </div>
      {isLoadingPage ? (
        <div className='text-center'>
          <LoadingBox />
        </div>
      ) : (
        <Box p={4}>
          <h2 className='py-2'>Featured products</h2>
          <Grid container spacing={4}>
            {products &&
              products.map((product, index) => (
                <Grid key={index} item xs={12} sm={6} md={6} lg={3}>
                  <Product product={product} />
                </Grid>
              ))}
          </Grid>

          {/* pagination */}
          <Stack sx={{ alignItems: 'center' }}>
            {isLoadMore && <LoadingBox />}
            <Pagination
              count={pagination.pages}
              page={pagination.page}
              onChange={handlePageChange}
            />
          </Stack>
        </Box>
      )}
      <Footer />
    </div>
  )
}
