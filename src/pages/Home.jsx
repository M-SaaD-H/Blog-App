import React, { useEffect, useState } from 'react'
import appwriteService from "../appwrite/appwriteConfig.js"
import { Container, Card } from '../components'

function Home() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		appwriteService.getAllActivePosts([])
		.then((posts) => {
			if(posts) {
				setPosts(posts.documents)
			}
		})
	}, [])

	if(posts.length === 0) {
		return (
			<div className="w-full py-8 mt-4 text-center">
				<Container>
					<div className="flex flex-wrap">
						<div className="p-2 w-full">
							<h1 className="text-2xl font-bold text-white hover:text-gray-500">
								No Posts found
							</h1>
						</div>
					</div>
				</Container>
		</div>
		)
	}

  return (
    <div className='w-full py-8'>
      <Container>
				<div className='flex flex-wrap'>
					{
						posts.map((post) => (
							<div key={post.$id} className='p-2 w-1/4'>
								<Card {...post} />
							</div>
						))
					}
				</div>
			</Container>
    </div>
  )
}

export default Home
