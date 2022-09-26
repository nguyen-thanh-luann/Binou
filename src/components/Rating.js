import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs'

import '../scss/App.scss'
export default function Rating(props) {
  const { rating, numReviews, caption } = props
  return (
    <div className='rating'>
      {rating >= 1 ? (
        <BsStarFill className='start' />
      ) : rating >= 0.5 ? (
        <BsStarHalf className='start' />
      ) : (
        <BsStar className='start' />
      )}
      {rating >= 2 ? (
        <BsStarFill className='start' />
      ) : rating >= 1.5 ? (
        <BsStarHalf className='start' />
      ) : (
        <BsStar className='start' />
      )}
      {rating >= 3 ? (
        <BsStarFill className='start' />
      ) : rating >= 2.5 ? (
        <BsStarHalf className='start' />
      ) : (
        <BsStar className='start' />
      )}
      {rating >= 4 ? (
        <BsStarFill className='start' />
      ) : rating >= 3.5 ? (
        <BsStarHalf className='start' />
      ) : (
        <BsStar className='start' />
      )}
      {rating >= 5 ? (
        <BsStarFill className='start' />
      ) : rating >= 4.5 ? (
        <BsStarHalf className='start' />
      ) : (
        <BsStar className='start' />
      )}
      {/* {caption ? (
        <span>{caption}</span>
      ) : (
        <span>{' ' + numReviews + ' reviews'}</span>
      )} */}
    </div>
  )
}
