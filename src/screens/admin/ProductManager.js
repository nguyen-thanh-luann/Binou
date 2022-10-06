import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'

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
import {
  Box,
  Button,
  Grid,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextareaAutosize,
} from '@mui/material'

const styleModal = {
  position: 'relative',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
}

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
    limit: 8,
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
    gender: '',
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
      gender: product.gender,
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
      gender: product.gender,
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
      gender: '',
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
      gender: '',
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

  const handleShowModal = () => setShowModal(true)

  const handleCloseModal = () => setShowModal(false)

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
                <Button
                  variant='outlined'
                  color='success'
                  startIcon={<AddIcon />}
                  onClick={() => {
                    setUpFormInsert()
                    setShowModal(true)
                  }}
                >
                  New Product
                </Button>
                <TableContainer component={Paper} sx={{ margin: '1.5rem 0' }}>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell align='center'>#</TableCell>
                        <TableCell align='center'>NAME</TableCell>
                        <TableCell align='center'>PHOTO</TableCell>
                        <TableCell align='center'>BRAND</TableCell>
                        <TableCell align='center'>CATEGORY</TableCell>
                        <TableCell align='center'>PRICE</TableCell>
                        <TableCell align='center'>STOCK</TableCell>
                        <TableCell align='center'>ACTIONS</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {products.map((product) => (
                        <TableRow
                          hover
                          key={product._id}
                          sx={{
                            '&:last-child td, &:last-child th': { border: 0 },
                          }}
                        >
                          <TableCell align='center'>{product._id}</TableCell>
                          <TableCell align='center'>{product.name}</TableCell>
                          <TableCell align='center'>
                            <img
                              src={product.image}
                              alt=''
                              className='img-fluid'
                              style={{ width: '4rem', borderRadius: '50%' }}
                            />
                          </TableCell>
                          <TableCell align='center'>{product.brand}</TableCell>
                          <TableCell align='center'>
                            {product.category}
                          </TableCell>
                          <TableCell align='center'>${product.price}</TableCell>
                          <TableCell align='center'>
                            {product.countInStock}
                          </TableCell>
                          <TableCell align='center'>
                            <EditIcon
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

                            <DeleteIcon
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
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                {/* pagination */}
                <div className='text-center'>
                  {isLoadMore && <LoadingBox />}
                  <Pagination
                    pagination={pagination}
                    onPageChange={handlePageChange}
                  />
                </div>
                {/* product modal */}

                <Modal open={showModal} onClose={handleCloseModal}>
                  <Box sx={styleModal}>
                    <Typography sx={{ marginBottom: '1rem' }}>
                      {isUpdatePro ? 'Update product' : 'Add new product'}
                    </Typography>
                    <form onSubmit={(e) => submitHandle(e)}>
                      <Grid container spacing={4}>
                        <Grid item xs={6}>
                          <TextField
                            name='name'
                            color='secondary'
                            label='Name'
                            value={formData.name}
                            onChange={(e) => {
                              handleFormChange(e)
                            }}
                            required
                          />
                          <TextField
                            name='category'
                            color='secondary'
                            label='Category'
                            sx={{ marginTop: '1rem' }}
                            value={formData.category}
                            onChange={(e) => {
                              handleFormChange(e)
                            }}
                            required
                          />
                          <TextField
                            name='brand'
                            color='secondary'
                            label='Brand'
                            sx={{ marginTop: '1rem' }}
                            value={formData.brand}
                            onChange={(e) => {
                              handleFormChange(e)
                            }}
                            required
                          />

                          <Select
                            name='gender'
                            color='secondary'
                            label='Gender'
                            sx={{ marginTop: '1rem' }}
                            required
                            defaultValue={formData.gender}
                            onChange={(e) => {
                              handleFormChange(e)
                            }}
                          >
                            <MenuItem value='male'>Male</MenuItem>
                            <MenuItem value='female'>Female</MenuItem>
                            <MenuItem value='kids'>Kids</MenuItem>
                            <MenuItem value='baby'>Baby</MenuItem>
                          </Select>

                          <TextField
                            name='price'
                            color='secondary'
                            label='Price'
                            sx={{ marginTop: '1rem' }}
                            value={formData.price}
                            onChange={(e) => {
                              handleFormChange(e)
                            }}
                            required
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <TextField
                            name='countInStock'
                            color='secondary'
                            label='Stock'
                            value={formData.countInStock}
                            onChange={(e) => {
                              handleFormChange(e)
                            }}
                            required
                          />
                          <TextareaAutosize
                            name='description'
                            minRows={7}
                            style={{ marginTop: '1rem', width: '100%' }}
                            placeholder='write description...'
                            value={formData.description}
                            onChange={(e) => {
                              handleFormChange(e)
                            }}
                          />

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
                        </Grid>
                      </Grid>
                      {loading && (
                        <div className='text-center my-2'>
                          <LoadingBox />
                        </div>
                      )}
                      <Box sx={{ marginTop: '1rem', textAlign: 'end' }}>
                        <Button
                          variant='outlined'
                          color='secondary'
                          onClick={() => setShowModal(false)}
                          sx={{ marginRight: '1rem' }}
                        >
                          Close
                        </Button>
                        <Button
                          type='submit'
                          variant='outlined'
                          color='success'
                        >
                          {isUpdatePro ? 'Update' : 'Add'}
                        </Button>
                      </Box>
                    </form>
                  </Box>
                </Modal>
              </div>
            )
          )}
        </div>
      }
    />
  )
}
