import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../services/ProductService'
import { Helmet } from 'react-helmet-async'

import Product from '../components/product/Product'
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
    <div className='row mt-5 p-4'>
      <Helmet>
        <title>Shopping now</title>
      </Helmet>
      {products.map((product) => (
        <div className='col col-2'>
          <Product product={product} />
        </div>
      ))}
    </div>
  )
}
