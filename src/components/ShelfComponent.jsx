import React from 'react'

const ShelfComponent = ({shelf,shelfWidth}) => {
  return (
    <div style={{ width: shelfWidth }}>
    <img src={shelf} alt="shelf" style={{ width: "100%" }} />
  </div>

  )
}

export default ShelfComponent