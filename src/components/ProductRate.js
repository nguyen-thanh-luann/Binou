import StarIcon from '@mui/icons-material/Star'
import StarHalfIcon from '@mui/icons-material/StarHalf'
import StarBorderIcon from '@mui/icons-material/StarBorder'

export default function ProductRate(props) {
  const { rating } = props
  const startStyle = {
    color: 'orange',
  }
  return (
    <div>
      {rating >= 1 ? (
        <StarIcon style={startStyle} />
      ) : rating >= 0.5 ? (
        <StarHalfIcon style={startStyle} />
      ) : (
        <StarBorderIcon style={startStyle} />
      )}
      {rating >= 2 ? (
        <StarIcon style={startStyle} />
      ) : rating >= 1.5 ? (
        <StarHalfIcon style={startStyle} />
      ) : (
        <StarBorderIcon style={startStyle} />
      )}
      {rating >= 3 ? (
        <StarIcon style={startStyle} />
      ) : rating >= 2.5 ? (
        <StarHalfIcon style={startStyle} />
      ) : (
        <StarBorderIcon style={startStyle} />
      )}
      {rating >= 4 ? (
        <StarIcon style={startStyle} />
      ) : rating >= 3.5 ? (
        <StarHalfIcon style={startStyle} />
      ) : (
        <StarBorderIcon style={startStyle} />
      )}
      {rating >= 5 ? (
        <StarIcon style={startStyle} />
      ) : rating >= 4.5 ? (
        <StarHalfIcon style={startStyle} />
      ) : (
        <StarBorderIcon style={startStyle} />
      )}
    </div>
  )
}
