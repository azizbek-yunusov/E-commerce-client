import React from 'react'
import { useParams } from 'react-router-dom';

const CurrentBrand = () => {
  const { slug } = useParams();
  return (
    <div>{slug}</div>
  )
}

export default CurrentBrand