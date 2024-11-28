import React from 'react'
import { Progress } from "../../../components/ui/progress"

const page = () => {
  return (
    <div className='w-[100vw] h-[50vh]'>
      <Progress value={33} className='w-64 h-2 m-5'/>
    </div>
  )
}

export default page
