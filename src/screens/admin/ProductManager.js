import React, { useState, useEffect, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import Swal from 'sweetalert2/dist/sweetalert2.js'

import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import AddIcon from '@mui/icons-material/Add'
import CloseIcon from '@mui/icons-material/Close'
import UpdateIcon from '@mui/icons-material/Update'
import CloudUploadIcon from '@mui/icons-material/CloudUpload'

import LoadingBox from '../../components/LoadingBox'
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
  TextareaAutosize,
  Stack,
  Pagination,
  InputLabel,
  FormControl,
} from '@mui/material'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

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
      fetch(`${process.env.REACT_APP_CLOUDINARY_URL}`, {
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

  const handlePageChange = (event, value) => {
    setPagination({
      ...pagination,
      page: value,
    })
  }

  return (
    <div>
      <Helmet>
        <title>ProductManager</title>
      </Helmet>
      <Header />
      {isLoadingPage ? (
        <div className='text-center'>
          <LoadingBox />
        </div>
      ) : (
        products && (
          <Box p={4}>
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
            <TableContainer
              component={Paper}
              elevation={6}
              sx={{ margin: '1.5rem 0' }}
            >
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
                      <TableCell align='center'>{product.category}</TableCell>
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
            <Stack sx={{ alignItems: 'center' }}>
              {isLoadMore && <LoadingBox />}
              <Pagination
                count={pagination.pages}
                page={pagination.page}
                onChange={handlePageChange}
              />
            </Stack>
            {/* product modal */}

            <Modal open={showModal} onClose={() => setShowModal(false)}>
              <Box sx={styleModal}>
                <Typography sx={{ marginBottom: '1rem' }}>
                  {isUpdatePro ? 'Update product' : 'Add new product'}
                </Typography>
                <form onSubmit={(e) => submitHandle(e)}>
                  <Grid container spacing={4}>
                    <Grid item xs={6}>
                      <Box>
                        <FormControl fullWidth>
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
                        </FormControl>
                      </Box>

                      <Box mt={2}>
                        <FormControl fullWidth>
                          <TextField
                            name='category'
                            color='secondary'
                            label='Category'
                            value={formData.category}
                            onChange={(e) => {
                              handleFormChange(e)
                            }}
                            required
                          />
                        </FormControl>
                      </Box>

                      <Box mt={2}>
                        <FormControl fullWidth>
                          <TextField
                            name='brand'
                            color='secondary'
                            label='Brand'
                            value={formData.brand}
                            onChange={(e) => {
                              handleFormChange(e)
                            }}
                            required
                          />
                        </FormControl>
                      </Box>

                      <Box mt={2}>
                        <FormControl fullWidth>
                          <InputLabel id='gender'>Gender</InputLabel>
                          <Select
                            labelId='gender'
                            name='gender'
                            color='secondary'
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
                        </FormControl>
                      </Box>

                      <Box mt={2}>
                        <FormControl fullWidth>
                          <TextField
                            name='price'
                            color='secondary'
                            label='Price'
                            value={formData.price}
                            onChange={(e) => {
                              handleFormChange(e)
                            }}
                            required
                          />
                        </FormControl>
                      </Box>
                    </Grid>
                    <Grid item xs={6}>
                      <Box>
                        <FormControl fullWidth>
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
                        </FormControl>
                      </Box>

                      <Box mt={2}>
                        <FormControl fullWidth>
                          <TextareaAutosize
                            name='description'
                            minRows={5}
                            placeholder='write description...'
                            value={formData.description}
                            onChange={(e) => {
                              handleFormChange(e)
                            }}
                          />
                        </FormControl>
                      </Box>

                      <Box mt={2}>
                        <FormControl fullWidth>
                          <label
                            htmlFor='productImage'
                            style={{
                              border: '1px solid purple',
                              textAlign: 'center',
                              padding: '0.5rem 0',
                              borderRadius: '10px',
                              color: 'purple',
                              alignContent: 'center',
                            }}
                          >
                            <TextField
                              id='productImage'
                              type='file'
                              sx={{ display: 'none' }}
                              ref={ref}
                              onChange={(e) => {
                                // xử lí cleanup function sau
                                handleImageChange(e)
                              }}
                            />
                            <CloudUploadIcon /> Upload Photo
                          </label>
                        </FormControl>

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
                      </Box>
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
                      startIcon={<CloseIcon />}
                    >
                      Close
                    </Button>
                    {isUpdatePro ? (
                      <Button
                        type='submit'
                        variant='outlined'
                        color='success'
                        startIcon={<UpdateIcon />}
                      >
                        Update
                      </Button>
                    ) : (
                      <Button
                        type='submit'
                        variant='outlined'
                        color='success'
                        startIcon={<AddIcon />}
                      >
                        Add
                      </Button>
                    )}
                  </Box>
                </form>
              </Box>
            </Modal>
          </Box>
        )
      )}
      <Footer />
    </div>
  )
}
