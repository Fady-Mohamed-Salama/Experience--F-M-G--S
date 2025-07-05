import React from 'react'
import Carousel from '../components/Carousel'
import MidBanner from '../components/MidBanner'
import Features from '../components/Features'

function Home() {
  return (
    <div className='overflow-x-hidden'>
      <Carousel />
      <MidBanner />
      <Features />
    </div>
  )
}

export default Home