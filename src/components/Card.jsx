import React from 'react'
import appwriteService from "../appwrite/appwriteConfig.js"
import { Link } from 'react-router-dom'

function Card({ $id, title, image }) {
  return (
		<Link to={`/post/${$id}`}>
			<div className='w-full bg-gray-100 rounded-lg p-4'>
				<div className='w-full flex justify-center items-center'>
					<img src={`${appwriteService.getFilePreview(image)}`} alt={title} />
				</div>
				<h2 className='text-xl font-bold'>
					{title}
				</h2>
			</div>
		</Link>
  )
}

export default Card
