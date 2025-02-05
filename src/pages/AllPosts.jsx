import React, { useState, useEffect } from 'react'
import { Container, Card } from '../components/index.js'
import appwriteService from "../appwrite/appwriteConfig.js"

function AllPosts() {
	const [posts, setPosts] = useState([]);

	useEffect(() => {
		appwriteService.getAllActivePosts([])
		.then((posts) => {
			if(posts) {
				setPosts(posts.documents)
			}
		})
	}, [])

	return (
		<div className='py-8 w-full'>
			<Container>
				<div className="flex flex-wrap">
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

export default AllPosts
