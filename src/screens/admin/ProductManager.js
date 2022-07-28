import React, { useState, useEffect } from 'react'
import { getAllProducts } from '../../services/ProductService'

export default function ProductManager() {
  const [products, setProducts] = useState()

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
      {!products ? (
        <h2>Product not found</h2>
      ) : (
        <div>
          <table className='table text-center table-hover align-baseline'>
            <thead>
              <tr>
                <th>#</th>
                <th>NAME</th>
                <th>PHOTO</th>
                <th>BRAND</th>
                <th>CATEGORY</th>
                <th>PRICE</th>
                <th>STOCK</th>
                <th>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}></tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
