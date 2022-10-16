import React, { useEffect, useContext, useReducer, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useForm } from 'react-hook-form'
import Rating from '@mui/material/Rating'

import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'

import { Store } from '../Store'
import Layout from './Layout'
import ProductRate from '../components/ProductRate'
import VerticalLine from '../components/VerticalLine'
import LoadingBox from '../components/LoadingBox'
import AddToCartBtn from '../components/AddToCartBtn'
import { getProductById, reviewProduct } from '../services/ProductService'
import Style from '../scss/ProductDetail.module.scss'
import Swal from 'sweetalert2'
import { Box, Button, Typography } from '@mui/material'
import Header from '../components/Header'
import Footer from '../components/Footer'

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

  let [orderNumber, setOrderNumber] = useState(1)
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
          dispatch({ type: 'FETCH_SUCCESS', payload: res.data })
        })
        .catch((err) => {
          dispatch({ type: 'FETCH_FAIL', payload: err })
        })
    }
    fetchData()
  }, [productId])

  const onSubmit = (data) => {
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
  }
  return (
    <div>
      <Header />
      {loading ? (
        <div className='text-center'>
          <LoadingBox />
        </div>
      ) : (
        product && (
          <Box p={4}>
            <div className={Style.productPage}>
              <Helmet>
                <title>{product.name}</title>
              </Helmet>
              <div className={Style.productImage}>
                <div className={Style.mainImage}>
                  <img src={product.image} alt='' className='img-fluid' />
                </div>
                <div className={Style.listImage}>
                  <div className={Style.imageItem}>
                    <img src={product.image} alt='' className='img-fluid' />
                  </div>
                </div>
              </div>
              <div className={Style.productInfo}>
                <h3 className={Style.productInfo__name}>{product.name}</h3>

                <div className='d-flex'>
                  <ProductRate
                    rating={product.rating}
                    numReviews={product.numReviews}
                  />
                  <VerticalLine />
                  <span>{product.numReviews} reviews</span>
                </div>

                <h4 className='mt-2'>${product.price}</h4>
                <div className={Style.productDescr}>
                  <p>{product.description}</p>
                </div>
                <Box mb={2}>
                  <Typography>Quantity</Typography>
                  {orderNumber <= 1 ? (
                    <Button disabled variant='outlined'>
                      <RemoveIcon />
                    </Button>
                  ) : (
                    <Button
                      color='success'
                      variant='outlined'
                      onClick={() => {
                        setOrderNumber(--orderNumber)
                      }}
                    >
                      <RemoveIcon />
                    </Button>
                  )}
                  <Button color='success'>{orderNumber}</Button>
                  {orderNumber >= product.countInStock ? (
                    <Button disabled variant='outlined'>
                      <AddIcon />
                    </Button>
                  ) : (
                    <Button
                      color='success'
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
              </div>
            </div>
            <h2>Reviews</h2>

            <div className={Style.reviewArea}>
              {product.reviews.length === 0 && (
                <h4 className='text-center text-warning'>There is no review</h4>
              )}
              {product.reviews.map((rev, index) => (
                <div key={index} className={Style.review}>
                  <div>
                    <span className={Style.review__name}>{rev.name}</span>
                    <span className={Style.review__date}>
                      {new Date(rev.updatedAt).toLocaleDateString()}
                    </span>
                  </div>
                  <ProductRate rating={rev.rating} />

                  <span className={Style.review__content}>{rev.comment}</span>
                </div>
              ))}
            </div>
            <div className={Style.writeReviewArea}>
              <h2>Write a review</h2>
              <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor='rating' className={Style.label}>
                  Rating
                </label>
                <Rating
                  value={star}
                  onChange={(e, value) => {
                    setStar(value)
                  }}
                />

                <label htmlFor='comment' className={Style.label}>
                  Comment
                </label>
                <textarea
                  id='comment'
                  placeholder='write your comment'
                  className={Style.commentBox}
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
                <Button
                  variant='outlined'
                  color='warning'
                  sx={{ marginTop: '1rem' }}
                  type='submit'
                >
                  Submit
                </Button>
              </form>
            </div>
          </Box>
        )
      )}
      <Footer />
    </div>
  )
}
