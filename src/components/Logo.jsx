import React from 'react'

const Logo = ({ width = "100px" }) => {
  return (
    <div style={{ width }} className="flex items-center gap-1">
      <span className="text-[#06B6D4] text-2xl font-semibold  font-outfit">
        Circuit<span className="text-[#ffff]">Labs</span>
      </span>
    </div>
  )
}

export default Logo