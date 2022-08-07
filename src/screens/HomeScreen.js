import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../services/ProductService'
import { Helmet } from 'react-helmet-async'

import Layout from './Layout'
import Product from '../components/Product'
export default function HomeScreen() {
  const [products, setProducts] = useState([])

  const loadProducts = () => {
    getAllProducts()
      .then((res) => {
        setProducts(res.data)
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
        <div className='row px-5'>
          <Helmet>
            <title>Shopping now</title>
          </Helmet>
          {products.map((product) => (
            <div key={product._id} className='col-sm-12 col-md-6 col-lg-3'>
              <Product product={product} />
            </div>
          ))}
        </div>
      }
    />
  )
}
