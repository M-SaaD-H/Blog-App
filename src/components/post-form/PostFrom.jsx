import React, { useCallback, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { Button, Input, Select, RTE } from "../index.js"
import appwriteService from "../../appwrite/appwriteConfig.js"
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostFrom({ post }) {
	const navigate = useNavigate();
	const userData = useSelector(state => state.auth.data)

	const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
		defaultValues: {
			title: post?.title || "",
			slug: post?.slug || "",
			content: post?.content || "",
			status: post?.status || 'active'
		}
	});

	const submit = async (data) => {
		if(post) {
			const image = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;

			if(image) {
				appwriteService.deleteFile(post.image);
			}

			const updatedPost = await appwriteService.updatePost(post.$id, {
				...data,
				image: image ? image.$id : undefined
			})

			if(updatedPost) {
				navigate(`/post/${updatedPost.$id}`);
			}
		} else {
			const image = data.image[0] ? appwriteService.uploadFile(data.image[0]) : null;

			const createdPost = await appwriteService.createPost({
				...data,
				image: image.$id,
				user: userData.$id
			});

			if(createdPost) {
				navigate(`/post/${createdPost.$id}`)
			}
		}
	}

	const slugTransform = useCallback((value) => {
		if(value && typeof value === 'string') {
			return value
				.trim()
				.toLowerCase()
				.replace(/^[a-zA-Z\d\s]+/g, '-')
				.replace(/\s/g, '-')
		}

		return '';
	}, [])

	useEffect(() => {
		const subscription = watch((value, { name }) => {
			if (name === 'title') {
				setValue('slug', slugTransform(value.title), {
					shouldValidate: true
				})
			}
		});

		return () => {
			subscription.unsubscribe()
		}
	}, [watch, slugTransform, setValue])

	return (
		<form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
			<div className="w-2/3 px-2">
				<Input
					label="Title :"
					placeholder="Title"
					className="my-2"
					{...register("title", { required: true })}
				/>
				<Input
					label="Slug :"
					placeholder="Slug"
					className="mb-4"
					{...register("slug", { required: true })}
					onInput={(e) => {
						setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
					}}
				/>
				<RTE label="Content :" name="content" control={control} defaultValue={getValues("content")} />
			</div>
			<div className="w-1/3 px-2">
				<Input
					label="Featured Image :"
					type="file"
					className="mb-4"
					accept="image/png, image/jpg, image/jpeg, image/gif"
					{...register("image", { required: !post })}
				/>
				{post && (
					<div className="w-full mb-4">
						<img
							src={appwriteService.getFilePreview(post.image)}
							alt={post.title}
							className="rounded-lg"
						/>
					</div>
				)}
				<Select
					options={["active", "inactive"]}
					label="Status"
					className="mb-4"
					{...register("status", { required: true })}
				/>
				<Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full">
					{post ? "Update" : "Submit"}
				</Button>
			</div>
		</form>
	)
}

export default PostFrom