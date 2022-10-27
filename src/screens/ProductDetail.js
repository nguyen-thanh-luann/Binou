import React, { useEffect, useContext, useReducer, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import Rating from '@mui/material/Rating'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { Store } from '../Store'
import ProductRate from '../components/ProductRate'
import VerticalLine from '../components/VerticalLine'
import LoadingBox from '../components/LoadingBox'
import AddToCartBtn from '../components/AddToCartBtn'
import { getProductById, reviewProduct } from '../services/ProductService'
import Swal from 'sweetalert2'
import { Box, Button, Grid, Typography } from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { toast } from 'react-toastify'

const reducer = (state, action) => {
  switch (action.type) {
    case 'REFRESH':
      return { ...state, product: action.payload }
    case 'REVIEW_REQUEST':
      return { ...state, loadingReview: true }
    case 'REVIEW_SUCCESS':
      return { ...state, loadingReview: false }
    case 'REVIEW_FAIL':
      return { ...state, loadingReview: false }
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

export default function ProductScreen() {
  const param = useParams()
  const productId = param.id
  const navigate = useNavigate()

  let [orderNumber, setOrderNumber] = useState(1)
  const [proImg, setProImg] = useState('')
  const [star, setStar] = useState(3)
  const { state } = useContext(Store)
  const { userInfo } = state

  const [{ loading, loadingReview, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      getProductById(productId)
        .then((res) => {
          dispatch({ type: 'FETCH_SUCCESS', payload: res.data.product })
        })
        .catch((err) => {
          dispatch({ type: 'FETCH_FAIL', payload: err })
        })
    }
    fetchData()
  }, [productId])

  const onSubmit = (data) => {
    if (userInfo) {
      dispatch({
        type: 'REVIEW_REQUEST',
      })

      const dataReview = {
        name: userInfo.name,
        comment: data.comment.trim(),
        rating: star,
      }

      reviewProduct(productId, dataReview)
        .then((res) => {
          dispatch({
            type: 'REVIEW_SUCCESS',
          })
          product.reviews.push(res.data.review)
          product.numReviews = res.data.numReviews
          product.rating = res.data.rating
          dispatch({ type: 'REFRESH', payload: product })
          Swal.fire({
            icon: 'success',
            title: 'Review Success!',
            showConfirmButton: false,
            timer: 1500,
          })
        })
        .catch((err) => {
          dispatch({ type: 'REVIEW_FAIL' })
          console.log(err)
        })

      reset()
    } else {
      toast('Please login to review!', { position: 'bottom-left' })
      navigate('/login')
    }
  }
  return (
    <div>
      <Header />
      {loading ? (
        <Box sx={{ textAlign: 'center' }}>
          <LoadingBox />
        </Box>
      ) : (
        product && (
          <Box p={4}>
            <Helmet>
              <title>{product.name}</title>
            </Helmet>
            {/* product infomation areas */}
            <Grid container spacing={4} columns={12}>
              <Grid item xs={12} sm={4}>
                <Box>
                  {/* main image */}
                  <img
                    src={`${proImg !== '' ? proImg : product.image}`}
                    alt=''
                    className='w-100'
                  />
                </Box>
                <Grid container mt={2} spacing={2} columns={10}>
                  {/* list images */}
                  {product.images.length <= 0 ? (
                    <Grid item xs={2}>
                      <img src={product.image} alt='' className='w-100' />
                    </Grid>
                  ) : (
                    <>
                      {product.images.map((image, index) => (
                        <Grid
                          item
                          xs={2}
                          sx={{
                            cursor: 'pointer',
                          }}
                          key={index}
                          onClick={() => {
                            setProImg(image)
                          }}
                        >
                          <img src={image} alt='' className='w-100' />
                        </Grid>
                      ))}
                    </>
                  )}
                </Grid>
              </Grid>
              <Grid item xs={12} sm={8}>
                <h3>{product.name}</h3>

                <Box sx={{ display: 'flex' }}>
                  <ProductRate
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                  <VerticalLine />
                  <span>{product.numReviews} reviews</span>
                </Box>

                <h4 className='mt-2'>${product.price}</h4>
                <div>
                  <p>{product.description}</p>
                </div>
                <Box mb={2}>
                  {orderNumber <= 1 ? (
                    <Button disabled variant='outlined'>
                      <RemoveIcon />
                    </Button>
                  ) : (
                    <Button
                      color='secondary'
                      variant='outlined'
                      onClick={() => {
                        setOrderNumber(--orderNumber)
                      }}
                    >
                      <RemoveIcon />
                    </Button>
                  )}
                  <Button color='secondary'>{orderNumber}</Button>
                  {orderNumber >= product.countInStock ? (
                    <Button disabled variant='outlined'>
                      <AddIcon />
                    </Button>
                  ) : (
                    <Button
                      color='secondary'
                      variant='outlined'
                      onClick={() => {
                        setOrderNumber(++orderNumber)
                      }}
                    >
                      <AddIcon />
                    </Button>
                  )}
                </Box>
                <AddToCartBtn product={product} orderNumber={orderNumber} />
              </Grid>
            </Grid>

            {/*preview areas  */}
            <Box mt={2}>
              <Typography sx={{ fontSize: '2rem' }}>Reviews</Typography>
              {product.reviews.length === 0 && (
                <Typography
                  color='secondary'
                  sx={{ textAlign: 'center', fontSize: '1.5rem' }}
                >
                  There is no review
                </Typography>
              )}
              {product.reviews.map((rev, index) => (
                <Box
                  key={index}
                  p={2}
                  mb={2}
                  sx={{ border: '1px solid #ccc', borderRadius: '10px' }}
                >
                  <div>
                    <span>{rev.name}</span>
                    <span>{new Date(rev.updatedAt).toLocaleDateString()}</span>
                  </div>
                  <ProductRate rating={rev.rating} />

                  <span>{rev.comment}</span>
                </Box>
              ))}
            </Box>
            <Box>
              <Typography sx={{ fontSize: '2rem' }}>Write a review</Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Box
                  fullwidth
                  mt={2}
                  sx={{ display: 'flex', alignItems: 'center' }}
                >
                  <Typography mr={2} sx={{ fontWeight: 'bold' }}>
                    Rating
                  </Typography>
                  <Rating
                    value={star}
                    onChange={(e, value) => {
                      setStar(value)
                    }}
                  />
                </Box>

                <Box mt={1}>
                  <textarea
                    id='comment'
                    style={{
                      width: '100%',
                      height: '20vh',
                      borderRadius: '10px',
                      padding: '1rem',
                    }}
                    placeholder='Leave your comment...'
                    {...register('comment', { required: true })}
                  ></textarea>
                  {errors.comment && (
                    <p>
                      {errors.comment?.type === 'required' && (
                        <span className='text-danger'>
                          Please leave your comment
                        </span>
                      )}
                    </p>
                  )}

                  {loadingReview && <LoadingBox />}
                </Box>
                <Button
                  variant='outlined'
                  color='secondary'
                  sx={{ marginTop: '1rem' }}
                  type='submit'
                >
                  Submit
                </Button>
              </form>
            </Box>
          </Box>
        )
      )}
      <Footer />
    </div>
  )
}
