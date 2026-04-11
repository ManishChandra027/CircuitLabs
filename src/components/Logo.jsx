import React from 'react'

const Logo = ({ width = "100px" }) => {
  return (
    <div style={{ width }} className="flex items-center gap-1">
      <span className="text-white text-base font-medium">
        The<span className="text-[#e8c84a]">Game</span>Pulse
      </span>
    </div>
  )
}

export default Logo