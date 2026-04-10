import React from 'react'

const Logo = ({ width = "100px" }) => {
  return (
    <div style={{ width }} className="flex items-center gap-1">
      <span className="text-gray-800 text-lg font-semibold">
        The<span className="text-gray-500">Game</span>Pulse
      </span>
    </div>
  )
}

export default Logo

