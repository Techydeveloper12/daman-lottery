import React from 'react'
import AvatarBox from './AvatarBox'
import './AllAvatar.css'
import user1 from '../assets/user1.png'
import user2 from '../assets/user2.png'
import user3 from '../assets/user3.png'
import user4 from '../assets/user4.png'
import user5 from '../assets/user5.png'
import user6 from '../assets/user6.png'
import user7 from '../assets/user7.png'
import user8 from '../assets/user8.png'
import user9 from '../assets/user9.png'
import user10 from '../assets/user10.png'
import user11 from '../assets/user11.png'
import user12 from '../assets/user12.png'


function AllAvatar() {
  return (
    <>
    <div className="all-avatar-container">
    <AvatarBox avatar={user1}/>
    <AvatarBox avatar={user2}/>
    <AvatarBox avatar={user3}/>
    <AvatarBox avatar={user4}/>
    <AvatarBox avatar={user5}/>
    <AvatarBox avatar={user6}/>
    <AvatarBox avatar={user7}/>
    <AvatarBox avatar={user8}/>
    <AvatarBox avatar={user9}/>
    <AvatarBox avatar={user10}/>
    <AvatarBox avatar={user11}/>
    <AvatarBox avatar={user12}/>
    </div>
    </>
  )
}

export default AllAvatar