import React from 'react'

function Logo({ width ='100px', fontSize = '20px' }) {
  return (
    <div className={`w-[${width}] text-[${fontSize}] text-white`}>
      Logo
    </div>
  )
}

export default Logo
