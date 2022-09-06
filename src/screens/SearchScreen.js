import React, { useState, useEffect } from 'react'
import { getAllProducts } from '../services/ProductService'
import { Helmet } from 'react-helmet-async'
import { useLocation } from 'react-router-dom'

import Layout from './Layout'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
import '../scss/App.scss'
export default function SearchScreen() {
  const { search } = useLocation()
  console.log(search)
  const [products, setProducts] = useState()
  const [isLoading, setIsLoading] = useState(true)

  const loadProducts = () => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
      })
  }
  useEffect(() => {
    loadProducts()
  }, [])

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
                <h6>Quick search</h6>
                <div className='quick-search-option'>
                  <input
                    type='radio'
                    id='any'
                    name='quick-search'
                    value='any'
                  />
                  <label htmlFor='any'>Any</label>
                </div>
                <div className='quick-search-option'>
                  <input
                    type='radio'
                    id='newest'
                    name='quick-search'
                    value='newest'
                  />
                  <label htmlFor='newest'>Newest Arrivals</label>
                </div>
                <div className='quick-search-option'>
                  <input
                    type='radio'
                    id='highest'
                    name='quick-search'
                    value='highest'
                  />
                  <label htmlFor='highest'>Price: High to Low</label>
                </div>
                <div className='quick-search-option'>
                  <input
                    type='radio'
                    id='lowest'
                    name='quick-search'
                    value='lowest'
                  />
                  <label htmlFor='lowest'>Price: Low to High</label>
                </div>
              </div>
              <div className='option-group'>
                <ul>
                  <li>
                    <span>Brand</span>
                    <i className='fa-solid fa-angle-down'></i>
                  </li>
                  <li>
                    <span>Category</span>
                    <i className='fa-solid fa-angle-down'></i>
                  </li>
                  <li>
                    <span>Price</span>
                    <i className='fa-solid fa-angle-down'></i>
                  </li>
                </ul>
              </div>
            </div>
            <div className='right-side'>
              <p className='fw-bold'>2002 Products Found</p>
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
            </div>
          </div>
        </>
      }
    />
  )
}
