import React, { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

import { BsFillCaretDownFill } from 'react-icons/bs'

import Layout from './Layout'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import Pagination from '../components/Pagination'
import { getProductUseQuery } from '../services/ProductService'
import '../scss/App.scss'
export default function SearchScreen() {
  const { search } = useLocation()
  const sp = new URLSearchParams(search)
  const name = sp.get('name') || ''

  const [category, setCategory] = useState(`${sp.get('category') || ''}`)
  const [order, setOrder] = useState(`${sp.get('name') || ''}`)
  const [query, setQuery] = useState(`name=${name}`)
  const [products, setProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [foundProduct, setFoundProduct] = useState(0)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 8,
    pages: 1,
  })

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

  useEffect(() => {
    setQuery(
      `name=${name}&category=${category}&order=${order}&limit=${pagination.limit}&page=${pagination.page}`
    )
  }, [name, order, category, pagination.page])

  const handlePageChange = (newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    })
  }

  return (
    <Layout
      children={
        <>
          <Helmet>
            <title>Search screen</title>
          </Helmet>
          <div className='search-screen'>
            <div className='left-side'>
              <div className='option-group'>
                <h6>Quick sort</h6>
                <select
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
                </select>
              </div>
              <div className='option-group'>
                <ul>
                  <li>
                    <span>Brand</span>
                    <BsFillCaretDownFill />
                  </li>
                  <li>
                    <span>Category</span>
                    <BsFillCaretDownFill />
                  </li>
                  <li>
                    <span>Price</span>
                    <BsFillCaretDownFill />
                  </li>
                </ul>
              </div>
            </div>
            <div className='right-side'>
              <p className='fw-bold'>
                {foundProduct} {foundProduct <= 1 ? 'product' : 'products'}{' '}
                Found
              </p>
              {isLoading ? (
                <div className='text-center'>
                  <LoadingBox />
                </div>
              ) : (
                <div className='row'>
                  {products &&
                    products.map((product) => (
                      <div
                        key={product._id}
                        className='col-sm-12 col-md-6 col-lg-3'
                      >
                        <Product product={product} />
                      </div>
                    ))}
                </div>
              )}
              <div className='text-center'>
                {foundProduct >= 1 && (
                  <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </>
      }
    />
  )
}
