import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'
import Form from 'react-bootstrap/Form'

import Product from '../components/Product'
import SearchBox from '../components/SearchBox'
import LoadingBox from '../components/LoadingBox'
import { getProductUseQuery } from '../services/ProductService'
import { getAllCategory } from '../services/CategoryService'
import Style from '../scss/SearchScreen.module.scss'
import { Box, Grid, Pagination, Stack } from '@mui/material'
import Footer from '../components/Footer'
import Header from '../components/Header'

export default function SearchScreen() {
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const name = sp.get('name') || ''

  const [category, setCategory] = useState(`${sp.get('category') || ''}`)
  const [order, setOrder] = useState(`${sp.get('name') || ''}`)
  const [query, setQuery] = useState(`name=${name}`)
  const [products, setProducts] = useState([])
  const [categorys, setCategorys] = useState('')
  const [gender, setGender] = useState('')
  const [price, setPrice] = useState('')
  const [rating, setRating] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [foundProduct, setFoundProduct] = useState(0)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    pages: 1,
  })

  const priceRange = [
    {
      range: '$1 - $50',
      value: '1-50',
    },
    {
      range: '$51 - $100',
      value: '51-100',
    },
    {
      range: '$101 - $500',
      value: '101-500',
    },
    {
      range: 'above $500',
      value: '501-10000',
    },
  ]

  const rateRange = [
    {
      range: '4 starts & up',
      rate: 4,
    },
    {
      range: '3 starts & up',
      rate: 3,
    },
    {
      range: '2 starts & up',
      rate: 2,
    },
    {
      range: '1 starts & up',
      rate: 1,
    },
  ]

  const loadProducts = () => {
    getProductUseQuery(query)
      .then((res) => {
        setProducts(res.data.products)
        setPagination({
          ...pagination,
          pages: res.data.pages,
        })
        setFoundProduct(res.data.foundProduct)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    loadProducts()
  }, [query])

  const loadCategory = () => {
    getAllCategory()
      .then((res) => {
        setCategorys(res.data)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  useEffect(() => {
    loadCategory()
  }, [])

  useEffect(() => {
    setQuery(
      `name=${name}&gender=${gender}&category=${category}&price=${price}&rating=${rating}&order=${order}&limit=${pagination.limit}&page=${pagination.page}`
    )
  }, [name, order, category, price, rating, gender, pagination.page])

  const handlePageChange = (event, value) => {
    setPagination({
      ...pagination,
      page: value,
    })
  }

  return (
    <>
      <Helmet>
        <title>Search screen</title>
      </Helmet>
      <Header />
      <div className={Style.searchScreen}>
        <div className={Style.searchScreen__leftSide}>
          <Box
            sx={{
              marginBottom: 2,
              width: '100%',
              display: {
                xs: 'flex',
                sm: 'none',
              },
            }}
          >
            <SearchBox />
          </Box>
          <div className={Style.optionGroup}>
            <h5>Quick sort</h5>
            <Form.Select
              value={order}
              onChange={(e) => {
                setOrder(e.target.value)
              }}
            >
              <option value=''>Any</option>
              <option value='newest'>Newest</option>
              <option value='lowest'>Price: Low to High</option>
              <option value='highest'>Price: High to Low</option>
              <option value='toprating'>Most Reviews</option>
            </Form.Select>
          </div>
          <div className={Style.optionGroup}>
            <h5>Category</h5>
            <Form.Select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value)
              }}
              style={{ width: '100%' }}
            >
              <option value=''>Any</option>
              {categorys &&
                categorys.map((cate, index) => (
                  <option key={index} value={cate}>
                    {cate}
                  </option>
                ))}
            </Form.Select>
          </div>
          <div className={Style.optionGroup}>
            <h5>Price</h5>
            <Form.Select
              value={price}
              onChange={(e) => {
                setPrice(e.target.value)
              }}
              style={{ width: '100%' }}
            >
              <option value=''>Any</option>
              {priceRange &&
                priceRange.map((p, index) => (
                  <option key={index} value={p.value}>
                    {p.range}
                  </option>
                ))}
            </Form.Select>
          </div>
          <div className={Style.optionGroup}>
            <h5>Rating</h5>
            <Form.Select
              value={rating}
              onChange={(e) => {
                setRating(e.target.value)
              }}
              style={{ width: '100%' }}
            >
              <option value=''>Any</option>
              {rateRange &&
                rateRange.map((r, index) => (
                  <option key={index} value={r.rate}>
                    {r.range}
                  </option>
                ))}
            </Form.Select>
          </div>
          <div className={Style.optionGroup}>
            <h5>Gender</h5>
            <Form.Select
              value={gender}
              onChange={(e) => {
                setGender(e.target.value)
              }}
              style={{ width: '100%' }}
            >
              <option value=''>Any</option>
              <option value='male'>Men</option>
              <option value='female'>Women</option>
              <option value='kids'>Kids</option>
              <option value='baby'>Baby</option>
            </Form.Select>
          </div>
        </div>
        <div className={Style.searchScreen__rightSide}>
          <Box
            sx={{
              marginBottom: 2,
              width: '20rem',
              display: {
                xs: 'none',
                sm: 'flex',
                lg: 'none',
              },
            }}
          >
            <SearchBox />
          </Box>
          <p className='fw-bold'>
            {foundProduct} {foundProduct <= 1 ? 'product' : 'products'} Found
          </p>

          {isLoading ? (
            <div className='text-center'>
              <LoadingBox />
            </div>
          ) : (
            <Grid container spacing={4} mb={4}>
              {products &&
                products.map((product) => (
                  <Grid
                    item
                    key={product._id}
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
          )}

          <Stack sx={{ alignItems: 'center' }}>
            {foundProduct >= 1 && (
              <Pagination
                count={pagination.pages}
                page={pagination.page}
                onChange={handlePageChange}
              />
            )}
          </Stack>
        </div>
      </div>
      <Footer />
    </>
  )
}
