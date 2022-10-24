import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ProductRate from './ProductRate'
import AddToCartBtn from './AddToCartBtn'
import WishlistBtn from './WishlistBtn'

import Style from '../scss/Product.module.scss'

export default function Product({ product }) {
  let [orderNumber] = useState(1)

  return (
    <div className={Style.product}>
      <div className={Style.product__image}>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} className='card-img-top img-fluid' alt='' />
        </Link>
        <span className={Style.product__image__heart}>
          <WishlistBtn product={product} />
        </span>
      </div>
      <div className={Style.product__body}>
        <p className={Style.product__name}>{product.name}</p>
        <ProductRate rating={product.rating} />
        <p className={Style.product__price}>${product.price}</p>
        <AddToCartBtn product={product} orderNumber={orderNumber} />
      </div>
    </div>
  )
}
