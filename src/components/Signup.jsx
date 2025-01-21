import React, { useState } from 'react'
import authService from '../appwrite/auth.js'
import { data, Link, useNavigate } from 'react-router-dom'
import { login as authLogin } from '../store/authSlice.js' // We are using 'login' in the 'signup' component because we are creating it such that once a user is created it will login automatically
import { Button, Input, Logo } from "./index.js"
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'

function Signup() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [error, setError] = useState("");

	const { register, handleSubmit } = useForm();

	const signup = async (data) => {
		setError("");

		try {
			const userData = await authService.createAccount(data);

			if (userData) {
				const user = await authService.getCurrentUser();

				if (user) dispatch(authLogin(userData));

				navigate('/');
			}
		} catch (error) {
			setError(error);
		}
	}

	return (
		<div className='flex justify-center items-center'>
			<div className='mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10'>
				<div className='mb-2 flex justify-center'>
					<span className='inline-block w-full max-w-[100px]'>
						<Logo width='100%' />
					</span>
				</div>
				<h2 className='text-center text-2xl font-bold leading-tight'>Sign up to create account</h2>
				<p>Already have an account?&nbxp;</p>
				<Link
					to="/login"
					className='font-medium text-primary transition-all duration-200 hover:underline'
				>
					Sign in
				</Link>
				{
					error && (
						<p className='text-red-500 my-4 text-center'>{error}</p>
					)
				}

				{/* Form */}

				<form onSubmit={handleSubmit(create)}>
					<div className='space-y-5'>
						<Input
							lable="Full Name:"
							placeholder="Enter your full name"
							{...register("name", {
								required: true
							})}
						/>
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
						<Button type='submit' className='w-full'>Create Account</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

export default Signup
