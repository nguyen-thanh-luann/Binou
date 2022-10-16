import { Box, Typography } from '@mui/material'
import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Style from '../scss/Home.module.scss'
import { Link } from 'react-router-dom'

export default function HomeScreen() {
  return (
    <>
      <Helmet>
        <title>Binou</title>
      </Helmet>
      <Header />
      <Box>
        {/*  */}
        <Carousel fade variant='dark'>
          <Carousel.Item className={Style.banner}>
            <Link to='/men'>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1665825199/banner_ilgqqv.jpg'
                alt='Men'
                style={{ objectFit: 'fill', width: '100%' }}
              />
            </Link>
            <Carousel.Caption className={Style.bannerCaption}>
              <h2 className={Style.captionF1}>
                Men's 3D Cut Seamless Down Parkas
              </h2>
              <Typography className={Style.captionF2}>
                Designed widt roomy shoulders and a defined hood.
              </Typography>
              <h2 className={Style.captionF1}>$129.90</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={Style.banner}>
            <Link to='/women'>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1665825202/banner1_oylnds.jpg'
                alt='Men'
                style={{ objectFit: 'fill', width: '100%' }}
              />
            </Link>
            <Carousel.Caption className={Style.bannerCaption}>
              <h2 className={Style.captionF1}>Women's Hybrid Down Parkas</h2>
              <Typography className={Style.captionF2}>
                A combination of lightweight down with insulating padding for
                supreme warmth
              </Typography>
              <h2 className={Style.captionF1}>$119.90</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={Style.banner}>
            <Link to='/kids'>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1665825205/banner2_upccsb.jpg'
                alt='Men'
                style={{ objectFit: 'fill', width: '100%' }}
              />
            </Link>
            <Carousel.Caption className={Style.bannerCaption}>
              <h2 className={Style.captionF1}>Kids' Down Parkas</h2>
              <Typography className={Style.captionF2}>
                Big warmth for little ones that won't weigh them down
              </Typography>
              <h2 className={Style.captionF1}>$79.90</h2>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/*  */}
        <Carousel fade variant='dark'>
          <Carousel.Item className={Style.banner}>
            <Link to='/men'>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1665848388/b2_inxbt6.jpg'
                alt='Men'
                style={{ objectFit: 'fill', width: '100%' }}
              />
            </Link>
            <Carousel.Caption className={Style.bannerCaption}>
              <h2 className={Style.captionF1}>Men's Sweat Pullover Hoodies</h2>
              <Typography className={Style.captionF2}>
                Versatile style for at home or on the go.
              </Typography>
              <h2 className={Style.captionF1}>$129.90</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={Style.banner}>
            <Link to='/men'>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1665848388/b4_hygcei.jpg'
                alt='Men'
                style={{ objectFit: 'fill', width: '100%' }}
              />
            </Link>
            <Carousel.Caption className={Style.bannerCaption}>
              <h2 className={Style.captionF1}>Men's Slim-Fit jeans</h2>
              <Typography className={Style.captionF2}>
                The look of authentic denim but with added stretch to keep you
                moving comfortably.
              </Typography>
              <h2 className={Style.captionF1}>$119.90</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={Style.banner}>
            <Link to='/men'>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1665848388/b3_ybs80e.jpg'
                alt='Men'
                style={{ objectFit: 'fill', width: '100%' }}
              />
            </Link>
            <Carousel.Caption className={Style.bannerCaption}>
              <h2 className={Style.captionF1}>Men's Comfort Jackets</h2>
              <Typography className={Style.captionF2}>
                Where polished style meets all-day comfort
              </Typography>
              <h2 className={Style.captionF1}>$79.90</h2>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/*  */}
        <Carousel fade variant='dark'>
          <Carousel.Item className={Style.banner}>
            <Link to='/women'>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1665848391/b6_gdp4hd.jpg'
                alt='Men'
                style={{ objectFit: 'fill', width: '100%' }}
              />
            </Link>
            <Carousel.Caption className={Style.bannerCaption}>
              <h2 className={Style.captionF1}>HEATTECH Ultra Warm T-Shirts</h2>
              <Typography className={Style.captionF2}>
                About 2.25 times warmer than our regular HEATTECH.
              </Typography>
              <h2 className={Style.captionF1}>$29.90</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={Style.banner}>
            <Link to='/men'>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1665848389/b1_mtysrp.jpg'
                alt='Men'
                style={{ objectFit: 'fill', width: '100%' }}
              />
            </Link>
            <Carousel.Caption className={Style.bannerCaption}>
              <h2 className={Style.captionF1}>
                Ultra thin windproof technology blocks harsh wind.
              </h2>
              <Typography className={Style.captionF2}>
                Men's Windproof Outer Fleece Jackets
              </Typography>
              <h2 className={Style.captionF1}>$119.90</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={Style.banner}>
            <Link to='/women'>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1665848388/b5_zj2csa.jpg'
                alt='Men'
                style={{ objectFit: 'fill', width: '100%' }}
              />
            </Link>
            <Carousel.Caption className={Style.bannerCaption}>
              <h2 className={Style.captionF1}>
                HEATTECH Cotton Innerwear (Extra Warm)
              </h2>
              <Typography className={Style.captionF2}>
                Soft, brushed inside protects you from the harsher winter
                weather.
              </Typography>
              <h2 className={Style.captionF1}>$29.90</h2>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/*  */}
        <Carousel fade variant='dark'>
          <Carousel.Item className={Style.banner}>
            <Link to='/kids'>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1665848389/b_jukpid.jpg'
                alt='Men'
                style={{ objectFit: 'fill', width: '100%' }}
              />
            </Link>
            <Carousel.Caption className={Style.bannerCaption}>
              <h2 className={Style.captionF1}>
                Warm and windproof wherever you go.
              </h2>
              <Typography className={Style.captionF2}>
                Windproof Outer Fleece.
              </Typography>
              <h2 className={Style.captionF1}>$59.90</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={Style.banner}>
            <Link to='/men'>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1665848390/b8_oe8z7k.jpg'
                alt='Men'
                style={{ objectFit: 'fill', width: '100%' }}
              />
            </Link>
            <Carousel.Caption className={Style.bannerCaption}>
              <h2 className={Style.captionF1}>NYC POP ICONS</h2>
              <Typography className={Style.captionF2}>
                Preview graphic tees featuring art from Keith Haring,
                Jean-Michel Basquiat and Kenny Scharf.
              </Typography>
              <h2 className={Style.captionF1}>$119.90</h2>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item className={Style.banner}>
            <Link to='/women'>
              <img
                src='https://res.cloudinary.com/imthanhluan/image/upload/v1665894083/b_h20v4r.jpg'
                alt='Men'
                style={{ objectFit: 'fill', width: '100%' }}
              />
            </Link>
            <Carousel.Caption className={Style.bannerCaption}>
              <h2 className={Style.captionF1}>
                100% recycled polyester fabric
              </h2>
              <Typography className={Style.captionF2}>
                ADULT/KIDS Doraemon Sustainability Mode Fluffy Fleece Full-Zip
                Jacket is now available.
              </Typography>
              <h2 className={Style.captionF1}>$29.90</h2>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Box>
      <Footer />
    </>
  )
}
