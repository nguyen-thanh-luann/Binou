import { BsStarFill, BsStar, BsStarHalf } from 'react-icons/bs'

export default function Rating(props) {
  const { rating, numReviews, caption } = props
  const startStyle = {
    color: 'orange',
  }
  return (
    <div>
      {rating >= 1 ? (
        <BsStarFill style={startStyle} />
      ) : rating >= 0.5 ? (
        <BsStarHalf style={startStyle} />
      ) : (
        <BsStar style={startStyle} />
      )}
      {rating >= 2 ? (
        <BsStarFill style={startStyle} />
      ) : rating >= 1.5 ? (
        <BsStarHalf style={startStyle} />
      ) : (
        <BsStar style={startStyle} />
      )}
      {rating >= 3 ? (
        <BsStarFill style={startStyle} />
      ) : rating >= 2.5 ? (
        <BsStarHalf style={startStyle} />
      ) : (
        <BsStar style={startStyle} />
      )}
      {rating >= 4 ? (
        <BsStarFill style={startStyle} />
      ) : rating >= 3.5 ? (
        <BsStarHalf style={startStyle} />
      ) : (
        <BsStar style={startStyle} />
      )}
      {rating >= 5 ? (
        <BsStarFill style={startStyle} />
      ) : rating >= 4.5 ? (
        <BsStarHalf style={startStyle} />
      ) : (
        <BsStar style={startStyle} />
      )}
    </div>
  )
}
