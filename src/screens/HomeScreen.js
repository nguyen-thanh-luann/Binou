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
    <div className='row mt-5 mx-0 py-4 px-5'>
      <Helmet>
        <title>Shopping now</title>
      </Helmet>
      {products.map((product) => (
        <div key={product._id} className='col col-3'>
          <Product product={product} />
        </div>
      ))}
    </div>
  )
}
