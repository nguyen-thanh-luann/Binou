import React, { useEffect, useState } from 'react'
import { getAllProducts } from '../services/ProductService'
import { Helmet } from 'react-helmet-async'

import Layout from './Layout'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
export default function HomeScreen() {
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
        <div className='row px-5'>
          <Helmet>
            <title>Shopping now</title>
          </Helmet>
          {isLoading ? (
            <div className='text-center'>
              <LoadingBox />
            </div>
          ) : (
            <>
              <h2 className='py-2'>Featured products</h2>
              {products &&
                products.map((product) => (
                  <div
                    key={product._id}
                    className='col-sm-12 col-md-6 col-lg-3'
                  >
                    <Product product={product} />
                  </div>
                ))}
            </>
          )}
        </div>
      }
    />
  )
}
