import React from 'react'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import Rating from '../rating/Rating'

import './Product.scss'
export default function Product({ product }) {
  return (
    <Card className='cart' style={{ width: '19rem' }}>
      <Link to={`/product/${product._id}`}>
        <img src={product.image} className='card-img-top img-fluid' alt='' />
      </Link>
      <Card.Body>
        <Link
          className='cart-title'
          style={{ textDecoration: 'none', color: '#000' }}
          to={`/product/${product._id}`}
        >
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numReviews={product.numReviews} />
        <Card.Text>${product.price}</Card.Text>
        <p>{product.description}</p>
        {product.countInStock === 0 ? (
          <Button variant='danger' disabled>
            Out of stock
          </Button>
        ) : (
          <Button variant='warning'>
            <i className='fa-solid fa-plus me-2'></i>
            Add to cart
          </Button>
        )}
      </Card.Body>
    </Card>
  )
}
