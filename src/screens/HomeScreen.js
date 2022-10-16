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
            <Carousel.Caption className={Style.banner__caption}>
              <Typography className={Style.banner__caption__f1}>
                Men's 3D Cut Seamless Down Parkas
              </Typography>
              <Typography className={Style.banner__caption__f2}>
                Designed widt roomy shoulders and a defined hood.
              </Typography>
              <Typography className={Style.banner__caption__f1}>
                $129.90
              </Typography>
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
            <Carousel.Caption className={Style.banner__caption}>
              <Typography className={Style.banner__caption__f1}>
                Women's Hybrid Down Parkas
              </Typography>
              <Typography className={Style.banner__caption__f2}>
                A combination of lightweight down with insulating padding for
                supreme warmth
              </Typography>
              <Typography className={Style.banner__caption__f1}>
                $119.90
              </Typography>
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
            <Carousel.Caption className={Style.banner__caption}>
              <Typography className={Style.banner__caption__f1}>
                Kids' Down Parkas
              </Typography>
              <Typography className={Style.banner__caption__f2}>
                Big warmth for little ones that won't weigh them down
              </Typography>
              <Typography className={Style.banner__caption__f1}>
                $79.90
              </Typography>
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
            <Carousel.Caption className={Style.banner__caption}>
              <Typography className={Style.banner__caption__f1}>
                Men's Sweat Pullover Hoodies
              </Typography>
              <Typography className={Style.banner__caption__f2}>
                Versatile style for at home or on the go.
              </Typography>
              <Typography className={Style.banner__caption__f1}>
                $129.90
              </Typography>
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
            <Carousel.Caption className={Style.banner__caption}>
              <Typography className={Style.banner__caption__f1}>
                Men's Slim-Fit jeans
              </Typography>
              <Typography className={Style.banner__caption__f2}>
                The look of authentic denim but with added stretch to keep you
                moving comfortably.
              </Typography>
              <Typography className={Style.banner__caption__f1}>
                $119.90
              </Typography>
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
            <Carousel.Caption className={Style.banner__caption}>
              <Typography className={Style.banner__caption__f1}>
                Men's Comfort Jackets
              </Typography>
              <Typography className={Style.banner__caption__f2}>
                Where polished style meets all-day comfort
              </Typography>
              <Typography className={Style.banner__caption__f1}>
                $79.90
              </Typography>
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
            <Carousel.Caption className={Style.banner__caption}>
              <Typography className={Style.banner__caption__f1}>
                HEATTECH Ultra Warm T-Shirts
              </Typography>
              <Typography className={Style.banner__caption__f2}>
                About 2.25 times warmer than our regular HEATTECH.
              </Typography>
              <Typography className={Style.banner__caption__f1}>
                $29.90
              </Typography>
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
            <Carousel.Caption className={Style.banner__caption}>
              <Typography className={Style.banner__caption__f1}>
                Ultra thin windproof technology blocks harsh wind.
              </Typography>
              <Typography className={Style.banner__caption__f2}>
                Men's Windproof Outer Fleece Jackets
              </Typography>
              <Typography className={Style.banner__caption__f1}>
                $119.90
              </Typography>
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
            <Carousel.Caption className={Style.banner__caption}>
              <Typography className={Style.banner__caption__f1}>
                HEATTECH Cotton Innerwear (Extra Warm)
              </Typography>
              <Typography className={Style.banner__caption__f2}>
                Soft, brushed inside protects you from the harsher winter
                weather.
              </Typography>
              <Typography className={Style.banner__caption__f1}>
                $29.90
              </Typography>
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
            <Carousel.Caption className={Style.banner__caption}>
              <Typography className={Style.banner__caption__f1}>
                Warm and windproof wherever you go.
              </Typography>
              <Typography className={Style.banner__caption__f2}>
                Windproof Outer Fleece.
              </Typography>
              <Typography className={Style.banner__caption__f1}>
                $59.90
              </Typography>
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
            <Carousel.Caption className={Style.banner__caption}>
              <Typography className={Style.banner__caption__f1}>
                NYC POP ICONS
              </Typography>
              <Typography className={Style.banner__caption__f2}>
                Preview graphic tees featuring art from Keith Haring,
                Jean-Michel Basquiat and Kenny Scharf.
              </Typography>
              <Typography className={Style.banner__caption__f1}>
                $119.90
              </Typography>
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
            <Carousel.Caption className={Style.banner__caption}>
              <Typography className={Style.banner__caption__f1}>
                100% recycled polyester fabric
              </Typography>
              <Typography className={Style.banner__caption__f2}>
                ADULT/KIDS Doraemon Sustainability Mode Fluffy Fleece Full-Zip
                Jacket is now available.
              </Typography>
              <Typography className={Style.banner__caption__f1}>
                $29.90
              </Typography>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </Box>
      <Footer />
    </>
  )
}
