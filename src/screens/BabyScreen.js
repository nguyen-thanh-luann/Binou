import React, { useEffect, useState } from 'react'
import { getProductUseQuery } from '../services/ProductService'
import { Helmet } from 'react-helmet-async'

import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import { Box, Grid, Pagination, Stack } from '@mui/material'
import Footer from '../components/Footer'
import Header from '../components/Header'
import Style from '../scss/Layout.module.scss'

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
      `gender=baby&limit=${pagination.limit}&page=${pagination.page}`
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
        <title>BABY'S CLOSTHING</title>
      </Helmet>
      <Header />
      {isLoadingPage ? (
        <div className='text-center'>
          <LoadingBox />
        </div>
      ) : (
        <Box p={4}>
          <h2>BABY</h2>
          <div className={Style.layoutBanner}>
            <img
              src='https://res.cloudinary.com/imthanhluan/image/upload/v1665928207/bb_hzz1aa.jpg'
              alt='baby banner'
              style={{ width: '100%' }}
            />
            <div className={Style.layoutBanner__decor}>
              <h2 className={Style.layoutBanner__decor__f1}>
                Fluffy Yarn Fleece Long-Sleeve Jackets
              </h2>
              <h5 className={Style.layoutBanner__decor__f2}>
                A super-soft feel perfect for keeping them snug
              </h5>
            </div>
          </div>
          <h2 className='py-2'>FEATURED PRODUCTS</h2>
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
