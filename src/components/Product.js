import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import ProductRate from './ProductRate'
import AddToCartBtn from './AddToCartBtn'
import WishlistBtn from './WishlistBtn'

import { Box, Typography } from '@mui/material'

export default function Product({ product }) {
  let [orderNumber] = useState(1)

  return (
    <Box
      sx={{
        boxShadow: '8px 8px 10px #ccc',
        borderRadius: '10px',
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <Link to={`/product/${product._id}`}>
          <img
            src={product.image}
            style={{ width: '100%', borderRadius: '10px' }}
            alt=''
          />
        </Link>
        <Box sx={{ position: 'absolute', top: '20px', right: '20px' }}>
          <WishlistBtn product={product} />
        </Box>
      </Box>
      <Box sx={{ padding: '1rem 0.5rem' }}>
        <Typography
          sx={{
            fontWeight: 'bold',
            textTransform: 'capitalize',
            width: '100%',
            maxHeight: '1.3rem',
            overflow: 'hidden',
          }}
        >
          {product.name}
        </Typography>
        <ProductRate rating={product.rating} />
        <Typography sx={{ fontWeight: 'bold', margin: '0.4rem 0' }}>
          ${product.price}
        </Typography>
        <AddToCartBtn product={product} orderNumber={orderNumber} />
      </Box>
    </Box>
  )
}
