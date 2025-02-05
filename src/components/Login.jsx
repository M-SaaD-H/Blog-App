import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from "../store/authSlice.js" // We are renaming 'login' as 'authLogin' because there is already a function named login
import { Button, Input, Logo } from "./index.js"
import { useDispatch } from 'react-redux'
import authService from "../appwrite/auth.js"

// React Hook Form

import { useForm } from 'react-hook-form'

function Login() {
	const navigate = useNavigate(); // To navigate with clicking of the user
	const dispatch = useDispatch();

	const { register, handleSubmit } = useForm();

	const [error, setError] = useState(""); // To display errors on the screen

	const login = async (data) => {
		setError(""); // Set previous errors to empty when the user tries to submit the login form

		try {
			const session = await authService.login(data); // All the required fields will be in this data object

			if (session) {
				const userData = await authService.getCurrentUser(); // Get the user who is logged in (means the user who logged in during this process)

				if (userData) dispatch(authLogin(userData)); // This login is from the store which is made to change the store in the authSlice

				navigate('/');
			}
		} catch (error) {
			setError(error); // Set the error in the state to display it on the screen
		}
	}

	return (
		<div className='flex justify-center items-center w-full'>
			<div className='mx-auto w-full max-w-md bg-gray-100 rounded-lg p-10 border-black/10'>
				<h2 className='text-center text-2xl font-bold leading-tight'>Sign in to your account</h2>
				<p className='mt-2 text-center text-base text-black/60'>Don&apos;t have any account?&nbsp;
					<Link
						to="/signup"
						className='font-medium text-primary transition-all duration-0-200 hover:underline'
					>Sign Up</Link>
				</p>
				{
					error && <p className='text-red-500 my-4 text-center'>{error.message}</p>
				}

				{/* Form */}

				<form onSubmit={handleSubmit(login)} className='mt-8'>
					<div className='space-y-5'>
						<Input
							label="Email:"
							placeholder="Enter your email"
							type="email"
							{...register("email", {
								required: true,
								validate: {
									matchPattern: (val) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(val) || "Email address must be a valid address"
								}
							})} // It is from the React Hook Form
						/>
						<Input
							label="Password:"
							placeholder="Enter your password"
							type="password"
							{...register("password", {
								required: true
							})}
						/>
						<Button type='submit' className='w-full'>Sign in</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Login
