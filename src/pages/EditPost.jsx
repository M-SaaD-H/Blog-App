import React, { useState, useEffect } from 'react'
import { Container, PostFrom } from '../components/index.js'
import { useNavigate, useParams } from 'react-router-dom';
import appwriteService from "../appwrite/appwriteConfig.js"

function EditPost() {
	const [post, setPost] = useState(null);
	const { slug } = useParams();
	const navigate = useNavigate;

	useEffect(() => {
		if(slug) {
			appwriteService.getPost(slug)
			.then((post) => {
				if(post) {
					setPost(post)
				}
			})
		} else {
			navigate('/')
		}
	}, [slug, navigate])

  return post ? (
		<div className='py-8'>
			<Container>
				<PostFrom post={post} />
			</Container>
		</div>
	) : null
}

export default EditPost
