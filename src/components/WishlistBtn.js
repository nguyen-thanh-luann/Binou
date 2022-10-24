import React, { useContext, useEffect, useState } from 'react'

import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'

import { Store } from '../Store'
import { addWishlist, removeWishlist } from '../services/UserService'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export default function WishlistBtn({ product }) {
  const { state, dispatch: ctxDispatch } = useContext(Store)
  const { userInfo } = state
  const [isInWishlist, setIsInWishlist] = useState()
  const navigate = useNavigate()

  useEffect(() => {
    setIsInWishlist(false)
    if (userInfo) {
      userInfo.wishlist.forEach((item) => {
        if (item._id === product._id) {
          setIsInWishlist(true)
        }
      })
    }
  }, [userInfo, product._id])

  const handleWishlist = () => {
    if (userInfo) {
      if (!isInWishlist) {
        addWishlist(userInfo._id, product._id)
          .then((res) => {
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
      toast('You should login first', {
        position: 'bottom-left',
      })
      navigate('/login')
    }
  }
  return (
    <>
      {isInWishlist ? (
        <FavoriteIcon
          style={{ cursor: 'pointer', transition: '0.3s', color: 'red' }}
          onClick={() => {
            handleWishlist()
          }}
        />
      ) : (
        <FavoriteBorderIcon
          style={{ cursor: 'pointer', transition: '0.3s' }}
          onClick={() => {
            handleWishlist()
          }}
        />
      )}
    </>
  )
}
