import Carousel from 'react-bootstrap/Carousel'

function BannerCarousel() {
  return (
    <Carousel fade variant='dark'>
      <Carousel.Item>
        <img
          src='https://res.cloudinary.com/imthanhluan/image/upload/v1664693152/banner1_fimpmq.webp'
          alt='First slide'
          style={{ objectFit: 'fill', width: '100%' }}
        />
        <Carousel.Caption>
          {/* <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src='https://res.cloudinary.com/imthanhluan/image/upload/v1664693154/banner2_buojum.webp'
          alt='Second slide'
          style={{ objectFit: 'fill', width: '100%' }}
        />

        <Carousel.Caption>
          {/* <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p> */}
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src='https://res.cloudinary.com/imthanhluan/image/upload/v1664693156/banner3_brz0s0.webp'
          alt='Third slide'
          style={{ objectFit: 'fill', width: '100%' }}
        />

        <Carousel.Caption>
          {/* <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p> */}
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default BannerCarousel
