import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'

import LoadingBox from '../../components/LoadingBox'
import Layout from '../Layout'
import Pagination from '../../components/Pagination'
import {
  getProductByPage,
  addNewProduct,
  deleteProductById,
  updateProduct,
} from '../../services/ProductService'
import { objectEqual } from '../../utils'

export default function ProductManager() {
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [isUpdateForm, setIsUpdateForm] = useState(false)
  const [isPreviewImgPriority, setPreviewImgPriority] = useState(false)
  const [isChangeProImg, setIsChangeProImg] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 4,
    pages: 1,
  })
  const [products, setProducts] = useState()
  const [productId, setProductId] = useState('')
  const [previewImage, setPreviewImage] = useState()
  const DEFAULT_PRODUCT_IMAGE =
    'https://res.cloudinary.com/imthanhluan/image/upload/v1660192190/cld-sample-5.jpg'

  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    price: '',
    countInStock: '',
    description: '',
    image: null,
    images: [],
    rating: 0,
    numReviews: 0,
    reviews: [],
  })
  const [formDataTemp, setFormDataTemp] = useState()

  /*
    - in update form, to display preoduct image: productImage
    - in insert form, just display for user preview image that he choose: imagePreviewUrl
    - in insert form, get image file from input to push to cloudinary: imageUrl
    - receive image url from cloudinary to insert new product: productImageUrl
  */

  const ref = useRef()
  // dotenv.config()

  // console.log(`env: ${process.env.DEFAULT_PRODUCT_IMAGE}`)
  const loadProducts = () => {
    setIsLoadMore(true)
    getProductByPage(pagination.limit, pagination.page)
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

  const setUpFormUpdate = (product) => {
    setIsUpdateForm(true)
    setPreviewImgPriority(false)
    setFormData({
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      countInStock: product.countInStock,
      description: product.description,
      image: product.image,
      images: product.images,
      rating: product.rating,
      numReviews: product.numReviews,
      reviews: product.reviews,
    })
    setFormDataTemp({
      name: product.name,
      category: product.category,
      brand: product.brand,
      price: product.price,
      countInStock: product.countInStock,
      description: product.description,
      image: product.image,
      images: product.images,
      rating: product.rating,
      numReviews: product.numReviews,
      reviews: product.reviews,
    })
    ref.current.value = ''
  }

  const setUpFormInsert = () => {
    setIsUpdateForm(false)
    setFormData({
      name: '',
      category: '',
      brand: '',
      price: '',
      countInStock: '',
      description: '',
      image: null,
      images: [],
      rating: 0,
      numReviews: 0,
      reviews: [],
    })
    setFormDataTemp({
      name: '',
      category: '',
      brand: '',
      price: '',
      countInStock: '',
      description: '',
      image: null,
      images: [],
      rating: 0,
      numReviews: 0,
      reviews: [],
    })
    setPreviewImage(null)
    ref.current.value = ''
  }

  const handleFormChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      image: e.target.files[0],
    })
    setPreviewImage(URL.createObjectURL(e.target.files[0]))
    setPreviewImgPriority(true)
    setIsChangeProImg(true)
  }

  const addProduct = () => {
    if (formData.image) {
      //if user choose image for product
      const data = new FormData()
      data.append('file', formData.image)
      data.append('upload_preset', 'clothes')
      fetch(`https://api.cloudinary.com/v1_1/imthanhluan/upload`, {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          const newProduct = { ...formData, image: data.url }
          addNewProduct(newProduct)
            .then((res) => {
              loadProducts()
            })
            .catch((err) => {
              console.log(err)
            })
        })
        .catch((err) => console.log(err))
    } else {
      const newProduct = { ...formData, image: DEFAULT_PRODUCT_IMAGE }
      addNewProduct(newProduct)
        .then((res) => {
          loadProducts()
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const deleteProduct = (id) => {
    deleteProductById(id).then((res) => {
      console.log(res)
      loadProducts()
    })
  }

  const updateHandler = () => {
    if (objectEqual(formDataTemp, formData)) {
      //if user do not change any things
      return
    } else {
      if (isChangeProImg) {
        const data = new FormData()
        data.append('file', formData.image)
        data.append('upload_preset', 'clothes')
        fetch(`https://api.cloudinary.com/v1_1/imthanhluan/upload`, {
          method: 'post',
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            const updatePro = { ...formData, image: data.url }
            updateProduct(productId, updatePro)
              .then((res) => {
                loadProducts()
              })
              .catch((err) => {
                console.log(err)
              })
          })
          .catch((err) => console.log(err))
      } else {
        updateProduct(productId, formData)
          .then((res) => {
            loadProducts()
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

  const handlePageChange = (newPage) => {
    setPagination({
      ...pagination,
      page: newPage,
    })
  }

  return (
    <Layout
      children={
        <div>
          <Helmet>
            <title>ProductManager</title>
          </Helmet>
          {isLoadingPage ? (
            <div className='text-center'>
              <LoadingBox />
            </div>
          ) : (
            products && (
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
                        <td>${product.price}</td>
                        <td>{product.countInStock}</td>
                        <td>
                          <i
                            className='fa-solid fa-pen-to-square text-warning'
                            role='button'
                            onClick={() => {
                              setUpFormUpdate(product)
                              setProductId(product._id)
                            }}
                            data-bs-toggle='modal'
                            data-bs-target='#productModal'
                          ></i>
                          <span
                            style={{ content: '', border: '1px solid #ccc' }}
                            className='mx-2'
                          ></span>
                          <i
                            className='fa-solid fa-trash text-danger delete-btn'
                            role='button'
                            onClick={() => {
                              if (window.confirm(`delete ${product.name} ?`)) {
                                deleteProduct(product._id)
                              } else {
                                return
                              }
                            }}
                          ></i>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className='text-center'>
                  {isLoadMore && <LoadingBox />}
                  <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                </div>
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
                        <form>
                          <div>
                            <label htmlFor='name'>Name</label>
                            <input
                              id='name'
                              name='name'
                              className='form-control'
                              type='text'
                              value={formData.name}
                              onChange={(e) => {
                                handleFormChange(e)
                              }}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor='category'>Category</label>
                            <input
                              id='category'
                              name='category'
                              className='form-control'
                              type='text'
                              value={formData.category}
                              onChange={(e) => {
                                handleFormChange(e)
                              }}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor='brand'>Brand</label>
                            <input
                              id='brand'
                              name='brand'
                              className='form-control'
                              type='text'
                              value={formData.brand}
                              onChange={(e) => {
                                handleFormChange(e)
                              }}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor='price'>Price</label>
                            <input
                              id='price'
                              name='price'
                              className='form-control'
                              type='number'
                              value={formData.price}
                              onChange={(e) => {
                                handleFormChange(e)
                              }}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor='countInStock'>Stock</label>
                            <input
                              id='countInStock'
                              name='countInStock'
                              className='form-control'
                              type='number'
                              value={formData.countInStock}
                              onChange={(e) => {
                                handleFormChange(e)
                              }}
                              required
                            />
                          </div>
                          <div>
                            <label htmlFor='description'>Description</label>
                            <textarea
                              id='description'
                              name='description'
                              className='form-control'
                              type='number'
                              value={formData.description}
                              onChange={(e) => {
                                handleFormChange(e)
                              }}
                            ></textarea>
                          </div>
                          <div>
                            <label htmlFor='productImage'>Photo</label>
                            <input
                              id='productImage'
                              type='file'
                              ref={ref}
                              className='form-control'
                              onChange={(e) => {
                                // xử lí cleanup function sau
                                handleImageChange(e)
                              }}
                            />
                            <div className='d-flex'>
                              {
                                <img
                                  src={
                                    isPreviewImgPriority && previewImage
                                      ? previewImage
                                      : !isPreviewImgPriority && formData.image
                                      ? formData.image
                                      : null
                                  }
                                  alt=''
                                  className='img-fluid'
                                  style={{
                                    width: '25%',
                                    margin: '1rem auto 0',
                                  }}
                                />
                              }
                            </div>
                          </div>
                        </form>
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
                          <button
                            type='button'
                            className='btn btn-primary'
                            data-bs-dismiss='modal'
                            onClick={updateHandler}
                          >
                            Update
                          </button>
                        ) : (
                          <button
                            type='button'
                            className='btn btn-success'
                            onClick={addProduct}
                            data-bs-dismiss='modal'
                          >
                            Add
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {/*  */}
              </div>
            )
          )}
        </div>
      }
    />
  )
}
