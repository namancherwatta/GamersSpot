import React from 'react'
import Hero from '../Home/hero'
import Trending from '../Home/trending'
import Top from '../Home/Top'
import Creator from "../Home/creator"
export default function home() {
  return (
    <div>
      <Hero />
      <Trending />
      <Top />
      <Creator />
    </div>
  )
}
