import { Box, Typography } from '@mui/material'
import React from 'react'
import Carousel from 'react-bootstrap/Carousel'

import { menBanners, womenBanners, kidsBanners, babyBanners } from '../data'
import { Helmet } from 'react-helmet-async'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { Link } from 'react-router-dom'

export default function HomeScreen() {
  return (
    <>
      <Helmet>
        <title>Binou</title>
      </Helmet>
      <Header />
      <Box>
        {/* Men banners  */}
        <Carousel fade variant='dark'>
          {menBanners &&
            menBanners.map((item, index) => (
              <Carousel.Item key={index}>
                <Box>
                  <Link to='/men'>
                    <img
                      src={item.image}
                      alt='Men'
                      style={{ objectFit: 'fill', width: '100%' }}
                    />
                  </Link>
                  <Carousel.Caption>
                    <Box>
                      <Link to='/men' style={{ textDecoration: 'none' }}>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: {
                              xs: 15,
                              sm: 20,
                              md: 30,
                            },
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontSize: {
                              xs: 10,
                              sm: 15,
                              md: 20,
                            },
                          }}
                        >
                          {item.descr}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontSize: {
                              xs: 15,
                              sm: 20,
                              md: 30,
                            },
                          }}
                        >
                          ${item.price}
                        </Typography>
                      </Link>
                    </Box>
                  </Carousel.Caption>
                </Box>
              </Carousel.Item>
            ))}
        </Carousel>
        {/*Women banner*/}
        <Carousel fade variant='dark'>
          {womenBanners &&
            womenBanners.map((item, index) => (
              <Carousel.Item key={index}>
                <Box>
                  <Link to='/women'>
                    <img
                      src={item.image}
                      alt='Women'
                      style={{ objectFit: 'fill', width: '100%' }}
                    />
                  </Link>
                  <Carousel.Caption>
                    <Box>
                      <Link to='/women' style={{ textDecoration: 'none' }}>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: {
                              xs: 15,
                              sm: 20,
                              md: 30,
                            },
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontSize: {
                              xs: 10,
                              sm: 15,
                              md: 20,
                            },
                          }}
                        >
                          {item.descr}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontSize: {
                              xs: 15,
                              sm: 20,
                              md: 30,
                            },
                          }}
                        >
                          ${item.price}
                        </Typography>
                      </Link>
                    </Box>
                  </Carousel.Caption>
                </Box>
              </Carousel.Item>
            ))}
        </Carousel>
        {/*Kids banner*/}
        <Carousel fade variant='dark'>
          {kidsBanners &&
            kidsBanners.map((item, index) => (
              <Carousel.Item key={index}>
                <Box>
                  <Link to='/kids'>
                    <img
                      src={item.image}
                      alt='Kids'
                      style={{ objectFit: 'fill', width: '100%' }}
                    />
                  </Link>
                  <Carousel.Caption>
                    <Box>
                      <Link to='/kids' style={{ textDecoration: 'none' }}>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: {
                              xs: 15,
                              sm: 20,
                              md: 30,
                            },
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontSize: {
                              xs: 10,
                              sm: 15,
                              md: 20,
                            },
                          }}
                        >
                          {item.descr}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontSize: {
                              xs: 15,
                              sm: 20,
                              md: 30,
                            },
                          }}
                        >
                          ${item.price}
                        </Typography>
                      </Link>
                    </Box>
                  </Carousel.Caption>
                </Box>
              </Carousel.Item>
            ))}
        </Carousel>
        {/*Baby banner  */}
        <Carousel fade variant='dark'>
          {babyBanners &&
            babyBanners.map((item, index) => (
              <Carousel.Item key={index}>
                <Box>
                  <Link to='/baby'>
                    <img
                      src={item.image}
                      alt='baby'
                      style={{ objectFit: 'fill', width: '100%' }}
                    />
                  </Link>
                  <Carousel.Caption>
                    <Box>
                      <Link to='/baby' style={{ textDecoration: 'none' }}>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontWeight: 'bold',
                            fontSize: {
                              xs: 15,
                              sm: 20,
                              md: 30,
                            },
                          }}
                        >
                          {item.title}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontSize: {
                              xs: 10,
                              sm: 15,
                              md: 20,
                            },
                          }}
                        >
                          {item.descr}
                        </Typography>
                        <Typography
                          sx={{
                            color: '#fff',
                            fontSize: {
                              xs: 15,
                              sm: 20,
                              md: 30,
                            },
                          }}
                        >
                          ${item.price}
                        </Typography>
                      </Link>
                    </Box>
                  </Carousel.Caption>
                </Box>
              </Carousel.Item>
            ))}
        </Carousel>
      </Box>
      <Footer />
    </>
  )
}
