import React from 'react'
import './AvatarBox.css'

function AvatarBox(props) {
  return (
    <div className='avatarbox'><img src={props.avatar} alt="" /></div>
  )
}

export default AvatarBox