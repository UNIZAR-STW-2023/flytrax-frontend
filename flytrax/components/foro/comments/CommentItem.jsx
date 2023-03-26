import React from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import userLogo from '../../../assets/images/user-logo.png'
import { FaComments } from 'react-icons/fa'

const CommentItem = ({ data }) => {

  const router = useRouter();

  return (
    <div  className= "border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-200 transition bg-neutral-100">
      <div className="flex flex-row items-start gap-3">
        <div>
          <Image className='rounded-full h-12 w-12' src={userLogo} alt="" />
        </div>
        <div>
          <div className="flex flex-row items-start gap-3">
            <p className="font-semibold cursor-pointer hover:underline"> {data.user} </p>
            <span className="text-sm"> {data.createdAt} </span>
          </div>
          <div className="mt-1"> {data.body} </div>
        </div>
      </div>
    </div>
  )
}

export default CommentItem