import React from 'react'

const Card: React.FC<{ label: string, content: any}> = ({ label, content }) => {
  return (
    <div className="ps-3 pe-5 pt-3 pb-3 border rounded bg-white">
      <div className="fw-light text-muted">{label}</div>
      <div className="fs-1">{content}</div>
    </div>
  )
}

export default Card
