import React, { useId } from 'react'

const Input = React.forwardRef(function Input({ // This 'forwardRef' is used to pass reference of this input component on the parent page. It we did not pass this reference then we can't apply the onChange etc functions and can't take the input from this input field into the parent page
	label,
	type = "text",
	className = "",
	...props
}, ref) {
	const ID = useId();

	return (
		<div className='w-full'>
			{label && (
				<label className='inline-block mb-1' htmlFor={ID}>{label}</label>
			)}
			<input
			type={type}
			className={`py-2 px-6 bg-white text-black focus:bg-gray-50 border-gray-200 outline-none rounded-lg ${className}`}
			ref={ref}
			{...props}
			id={ID}
			/>
		</div>
	)
})

export default Input
