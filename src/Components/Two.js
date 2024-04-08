import React from 'react';
import './Two.css'; // Import CSS file
import one from '../assets/1-a6662edb.png'
import two from '../assets/5-ab77b716.png'
import three from '../assets/7-00479cfa.png'
import four from '../assets/8-ea087ede.png'
import five from '../assets/11-925c456e.png'
import six from '../assets/12-ae12c679.png'
import seven from '../assets/14-a397ff6b.png'
import eight from '../assets/19-2ac9fd83.png'
import nine from '../assets/11-925c456e.png'
import ten from '../assets/8-ea087ede.png'
import gone from '../assets/gimg1.png'
import gtwo from '../assets/gimg2.png'
import gthree from '../assets/gimg3.png'



const Two = () => {
  const cardsData = [
    { name: 'Sumit Kapoor', role: 'Frontend Developer', delay: 1, image:one , gimg: gone , amount: 20 },
    { name: 'Andrew Neil', role: 'YouTuber & Blogger', delay: 2, image: two , gimg: gone , amount: 50 },
    { name: 'Jasmine Carter', role: 'Freelancer & Vlogger', delay: 1, image: three , gimg: gone , amount: 20 },
    { name: 'Justin Chung', role: 'Backend Developer', delay: 3, image: four , gimg: gtwo , amount: 70},
    { name: 'Adrina Calvo', role: 'Teacher & Advertiser', delay: 4, image: five, gimg: gtwo , amount: 100 },
    { name: 'John Doe', role: 'Graphic Designer', delay: 5, image: six, gimg: gtwo , amount: 80  },
    { name: 'Jane Smith', role: 'Marketing Specialist', delay: 6, image: seven, gimg: gtwo , amount: 20 },
    { name: 'Michael Johnson', role: 'Data Scientist', delay: 7, image: eight, gimg: gthree , amount: 30 },
    { name: 'Emma Davis', role: 'UX/UI Designer', delay: 8, image: nine, gimg: gthree, amount: 220 },
    { name: 'David Brown', role: 'Project Manager', delay: 9, image: ten, gimg: gthree , amount: 90},
  ];

  return (
    <div className="wrapper">
      <div className="outer">
        {cardsData.map((card, index) => (
          <div key={index} className="card" style={{ '--delay': card.delay }}>
            <div className="content">
              <div className="img"><img src={card.image} alt="" /></div>
              <div className="details">
              <span className="name" style={{ color: 'black' }}>{card.name}</span>
              </div>
              <div className="gameimg">
                <img src={card.gimg} alt="" />
              </div>
              <div className="win">
                <div className="amount"><b>Recieve ₹{card.amount}</b></div>
                <div className='winamt'>
                    <span>Winnin Amount</span>
                </div>
              </div>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Two;
