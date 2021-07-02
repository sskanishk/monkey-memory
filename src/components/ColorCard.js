import React from 'react'

export default function ColorCard({ color, onClick, flash }) {
  return (
    <div 
      className={`colorCard ${color} ${flash ? "flash" : ""}`}
      onClick={onClick}
    >  
    </div>
  )
}
