import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { Store } from '../Store'
import ProductRate from './ProductRate'
import AddToCartBtn from './AddToCartBtn'
import { addWishlist, removeWishlist } from '../services/UserService'

import Style from '../scss/Product.module.scss'
import { toast } from 'react-toastify'
export default function Product({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state
  const [isInWishlist, setIsInWishlist] = useState()
  let [orderNumber] = useState(1)

  useEffect(() => {
    setIsInWishlist(false)
    userInfo.wishlist.forEach((item) => {
      if (item._id === product._id) {
        setIsInWishlist(true)
      }
    })
  }, [userInfo, product._id])

  const handleWishlist = () => {
    if (userInfo) {
      if (!isInWishlist) {
        addWishlist(userInfo._id, product._id)
          .then((res) => {
            console.log(res.data.wishlist)
            ctxDispatch({
              type: 'ADD_WISHLIST',
              payload: { ...userInfo, wishlist: res.data.wishlist },
            })
          })
          .catch((err) => {
            console.error('Add to Wishlist issues:' + err)
          })
      } else {
        removeWishlist(userInfo._id, product._id)
          .then((res) => {
            ctxDispatch({
              type: 'ADD_WISHLIST',
              payload: { ...userInfo, wishlist: res.data.wishlist },
            })
          })
          .catch((err) => {
            console.error('Remove from Wishlist issues:' + err)
          })
      }
    } else {
      toast.error('You should login first', {
        position: 'bottom-left',
      })
    }
  }

  return (
    <div className={Style.product}>
      <div className={Style.product__image}>
        <Link to={`/product/${product._id}`}>
          <img src={product.image} className='card-img-top img-fluid' alt='' />
        </Link>
        {isInWishlist ? (
          <FavoriteIcon
            onClick={() => {
              handleWishlist()
            }}
            className={Style.product__image__heartFull}
          />
        ) : (
          <FavoriteBorderIcon
            onClick={() => {
              handleWishlist()
            }}
            className={Style.product__image__heartOutline}
          />
        )}
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
