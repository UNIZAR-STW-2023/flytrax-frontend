import React from 'react'
import ForoItem from './ForoItem'
import { foroData } from '../../assets/dummy/dummyData'

const ForoFeed = () => {

  const userId = 1

  return (
    <>
      {foroData.map((post) => (
        <ForoItem 
          userId={userId} 
          key={post.id} 
          data={post} 
        />
      ))}
    </>
  )
}

export default ForoFeed