import React, { useCallback } from 'react'
import { useRouter } from 'next/router';
import Image from 'next/image'
import userLogo from '../../assets/images/user-logo.png'
import { FaComments } from 'react-icons/fa'

const ForoItem = ({ data }) => {

  const router = useRouter();

  const goToPost = useCallback(() => {
    router.push(`/community/posts/${data.id}`);
  }, [router, data.id]);


  return (
    <div onClick={goToPost} className= "border-b-[1px] border-neutral-800 p-5 cursor-pointer hover:bg-neutral-100 transition">
      <div className="flex flex-row items-start gap-3">
        <div>
          <Image className='rounded-full h-12 w-12' src={userLogo} alt="" />
        </div>
        <div>
          <div className="flex flex-row items-center gap-2">
            <p className="font-semibold cursor-pointer"> {data.user} </p>
            <span className="text-sm"> {data.createdAt} </span>
          </div>
          <div className="mt-1"> {data.body} </div>
          <div className="flex flex-row items-center mt-3 gap-10">
            <div className="flex flex-row items-center  gap-2 cursor-pointer transition hover:text-violet-800">
              <FaComments size={20} />
              <p> {data.comments?.length || 0} </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForoItem