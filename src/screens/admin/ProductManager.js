import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { Modal } from 'react-bootstrap'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import { FiTrash } from 'react-icons/fi'
import { AiOutlineEdit } from 'react-icons/ai'

import LoadingBox from '../../components/LoadingBox'
import Layout from '../Layout'
import Pagination from '../../components/Pagination'
import {
  getProductOnPage,
  addNewProduct,
  deleteProductById,
  updateProduct,
} from '../../services/ProductService'
import { objectEqual } from '../../utils'

export default function ProductManager() {
  const [loading, setLoading] = useState(false)
  const [isLoadingPage, setIsLoadingPage] = useState(true)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [isUpdatePro, setIsUpdatePro] = useState(false)
  const [isPreviewImgPriority, setPreviewImgPriority] = useState(false)
  const [isChangeProImg, setIsChangeProImg] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 4,
    pages: 1,
  })
  const [products, setProducts] = useState()
  const [productId, setProductId] = useState('')
  const [previewImage, setPreviewImage] = useState()
  const DEFAULT_PRODUCT_IMAGE =
    'https://res.cloudinary.com/imthanhluan/image/upload/v1658936316/esejbjxbzficuj6n66tx.jpg'

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

  const ref = useRef()

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

  const submitHandle = (e) => {
    e.preventDefault()
    if (isUpdatePro) {
      updateHandler()
    } else {
      addProduct()
    }
  }

  const setUpFormUpdate = (product) => {
    setIsUpdatePro(true)
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
    // ref.current.value = ''
  }

  const setUpFormInsert = () => {
    setIsUpdatePro(false)
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
    // ref.current.value = ''
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
    setLoading(true)
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
              setLoading(false)
              setShowModal(false)
              loadProducts()
              Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'New product added!!!',
                showConfirmButton: false,
                timer: 1000,
              })
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
          setLoading(false)
          setShowModal(false)
          loadProducts()
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'New product added!!!',
            showConfirmButton: false,
            timer: 1000,
          })
        })
        .catch((err) => {
          console.log(err)
        })
    }
  }

  const deleteProduct = (id) => {
    deleteProductById(id)
      .then((res) => {
        loadProducts()
        Swal.fire({
          icon: 'success',
          title: 'Delete Success!',
          showConfirmButton: false,
          timer: 1000,
        })
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const updateHandler = () => {
    if (objectEqual(formDataTemp, formData)) {
      //if user do not change any things
      return
    } else {
      setLoading(true)
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
                setLoading(false)
                setShowModal(false)
                Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Update Success!!!',
                  showConfirmButton: false,
                  timer: 1000,
                })
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
            setLoading(false)
            setShowModal(false)
            loadProducts()
            Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Update Success!!!',
              showConfirmButton: false,
              timer: 1000,
            })
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
                  onClick={() => {
                    setUpFormInsert()
                    setShowModal(true)
                  }}
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
                          <AiOutlineEdit
                            className='text-warning'
                            role='button'
                            onClick={() => {
                              setUpFormUpdate(product)
                              setProductId(product._id)
                              setShowModal(true)
                            }}
                          />

                          <span
                            style={{ content: '', border: '1px solid #ccc' }}
                            className='mx-2'
                          ></span>

                          <FiTrash
                            className='text-danger'
                            role='button'
                            onClick={() => {
                              Swal.fire({
                                icon: 'warning',
                                title: `Delete ${product.name}?`,
                                showCancelButton: true,

                                cancelButtonText: 'Cancel',
                                confirmButtonColor: 'red',
                                confirmButtonText: 'Delete',
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  deleteProduct(product._id)
                                }
                              })
                            }}
                          />
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

                <Modal show={showModal}>
                  <Modal.Header closeButton>
                    <Modal.Title>
                      {isUpdatePro ? 'Update product' : 'Add new product'}
                    </Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={(e) => submitHandle(e)}>
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
                      {loading && (
                        <div className='text-center my-2'>
                          <LoadingBox />
                        </div>
                      )}
                      <div className='modal-footer'>
                        <button
                          className='btn btn-secondary'
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                        {isUpdatePro ? (
                          <button type='submit' className='btn btn-primary'>
                            Update
                          </button>
                        ) : (
                          <button type='submit' className='btn btn-success'>
                            Add
                          </button>
                        )}
                      </div>
                    </form>
                  </Modal.Body>
                </Modal>
              </div>
            )
          )}
        </div>
      }
    />
  )
}
