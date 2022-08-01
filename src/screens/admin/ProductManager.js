import React, { useState, useEffect } from 'react'
import { getAllProducts, addNewProduct } from '../../services/ProductService'

export default function ProductManager() {
  const [products, setProducts] = useState()
  const [isUpdateForm, setIsUpdateForm] = useState(false)
  const [productName, setProductName] = useState('')
  const [productCategory, setProductCategory] = useState('')
  const [productBrand, setProductBrand] = useState('')
  const [productPrice, setProductPrice] = useState()
  const [productCountInStock, setProductCountInStock] = useState()
  const [productDescription, setProductDescription] = useState('')

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

  const setUpFormUpdate = (product) => {
    setIsUpdateForm(true)
    setProductName(product.name)
    setProductCategory(product.category)
    setProductBrand(product.brand)
    setProductPrice(product.price)
    setProductCountInStock(product.countInStock)
    setProductDescription(product.description)
  }

  const setUpFormInsert = () => {
    setIsUpdateForm(false)
    setProductName('')
    setProductCategory('')
    setProductBrand('')
    setProductPrice('')
    setProductCountInStock('')
    setProductDescription('')
  }

  const addProduct = () => {}

  return (
    <div className='row mt-5 mx-0 p-4'>
      {!products ? (
        <h2>Product not found</h2>
      ) : (
        <div>
          <button
            className='btn btn-success'
            data-bs-toggle='modal'
            data-bs-target='#productModal'
            onClick={setUpFormInsert}
          >
            <i className='fa-solid fa-plus me-1'></i>
            New Product
          </button>
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
                <tr key={product._id}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>
                    <img
                      src={product.image}
                      alt=''
                      className='img-fluid'
                      style={{ width: '4rem', borderRadius: '50%' }}
                    />
                  </td>
                  <td>{product.brand}</td>
                  <td>{product.category}</td>
                  <td>{product.price}</td>
                  <td>{product.countInStock}</td>
                  <td>
                    <i
                      className='fa-solid fa-pen-to-square text-warning'
                      onClick={() => {
                        setUpFormUpdate(product)
                      }}
                      data-bs-toggle='modal'
                      data-bs-target='#productModal'
                    ></i>
                    <span
                      style={{ content: '', border: '1px solid #ccc' }}
                      className='mx-2'
                    ></span>
                    <i className='fa-solid fa-trash text-danger delete-btn'></i>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* product modal */}
          <div
            className='modal fade'
            id='productModal'
            tabIndex='-1'
            aria-labelledby='productModal'
            aria-hidden='true'
          >
            <div className='modal-dialog modal-dialog-centered'>
              <div className='modal-content'>
                <div className='modal-header'>
                  <h5 className='modal-title' id='exampleModalLabel'>
                    {isUpdateForm ? 'Update product' : 'Add new product'}
                  </h5>
                  <button
                    type='button'
                    className='btn-close'
                    data-bs-dismiss='modal'
                    aria-label='Close'
                  ></button>
                </div>
                <div className='modal-body'>
                  <div>
                    <label htmlFor='productName'>Name</label>
                    <input
                      id='productName'
                      className='form-control'
                      type='text'
                      value={productName}
                      onChange={(e) => setProductName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor='productCategory'>Category</label>
                    <input
                      id='productCategory'
                      className='form-control'
                      type='text'
                      value={productCategory}
                      onChange={(e) => setProductCategory(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor='productBrand'>Brand</label>
                    <input
                      id='productBrand'
                      className='form-control'
                      type='text'
                      value={productBrand}
                      onChange={(e) => setProductBrand(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor='productPrice'>Price</label>
                    <input
                      id='productPrice'
                      className='form-control'
                      type='number'
                      value={productPrice}
                      onChange={(e) => setProductPrice(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor='productCountInStock'>Stock</label>
                    <input
                      id='productCountInStock'
                      className='form-control'
                      type='number'
                      value={productCountInStock}
                      onChange={(e) => setProductCountInStock(e.target.value)}
                    />
                  </div>
                  <div>
                    <label htmlFor='productDescription'>Description</label>
                    <textarea
                      id='productDescription'
                      className='form-control'
                      type='number'
                      value={productDescription}
                      onChange={(e) => setProductDescription(e.target.value)}
                    ></textarea>
                  </div>
                </div>
                <div className='modal-footer'>
                  <button
                    type='button'
                    className='btn btn-secondary'
                    data-bs-dismiss='modal'
                  >
                    Close
                  </button>
                  {isUpdateForm ? (
                    <button type='button' className='btn btn-primary'>
                      Update
                    </button>
                  ) : (
                    <button type='button' className='btn btn-success'>
                      Add
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
          {/*  */}
        </div>
      )}
    </div>
  )
}
