import React, { useEffect, useState } from 'react'
import { getProductOnPage } from '../services/ProductService'
import { Helmet } from 'react-helmet-async'

import Pagination from '../components/Pagination'
import Layout from './Layout'
import Product from '../components/Product'
import LoadingBox from '../components/LoadingBox'
export default function HomeScreen() {
  const [products, setProducts] = useState()
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 4,
    pages: 1,
  })

  const loadProducts = () => {
    setIsLoadMore(true)
    getProductOnPage(pagination.limit, pagination.page)
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

  const handlePageChange = (newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    })
  }
  return (
    <Layout
      children={
        <div className='row px-5'>
          <Helmet>
            <title>Shopping now</title>
          </Helmet>
          {isLoadingPage ? (
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
              {/* pagination */}
              <div className='text-center'>
                {isLoadMore && <LoadingBox />}
                <Pagination
                  pagination={pagination}
                  onPageChange={handlePageChange}
                />
              </div>
            </>
          )}
        </div>
      }
    />
  )
}
