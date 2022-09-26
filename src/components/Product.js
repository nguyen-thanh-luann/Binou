import React from 'react'
import { Link } from 'react-router-dom'

import Rating from './Rating'
import AddToCartBtn from './AddToCartBtn'

import Style from '../scss/Product.module.scss'
export default function Product({ product }) {
  return (
    <div className={Style.product}>
      <div className={Style.product__image}>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} className='card-img-top img-fluid' alt='' />
        </Link>
      </div>
      <div className={Style.product__body}>
        <div className={Style.titleGroup}>
          <span className={Style.product__name}>{product.name}</span>
          <span className={Style.product__numreview}>
            {product.numReviews} reviews
          </span>
        </div>
        <Rating rating={product.rating} />
        <p className='price'>${product.price}</p>
        <AddToCartBtn product={product} />
      </div>
    </div>
  )
}
