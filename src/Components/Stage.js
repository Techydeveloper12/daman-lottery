import React from 'react'
import './style.css'
import crownone from '../assets/crown1.png'
import crowntwo from '../assets/crown2.png'
import crownthree from '../assets/crown3.png'
import four from '../assets/1-a6662edb.png'
import five from '../assets/5-ab77b716.png'
import six from '../assets/8-ea087ede.png'
import seven from '../assets/11-925c456e.png'
import eight from '../assets/eight.jpg'
import placeone from '../assets/place1.png'
import placetwo from '../assets/place2.png'
import placethree from '../assets/place3.png'



function Stage() {
    return (
        <>
            <div className="container">
                <div className="stagebox">
                    <div className="winner">
                        <div className="icondiv">
                            <div className="crownimg">
                                <img src={crowntwo} alt="" />
                            </div>
                            <div className="idimg"><img src={six} alt="" /></div>
                            <div className="positionimg">
                                <img src={placetwo} alt="" />
                            </div>
                        </div>
                        <div className="name">Aman </div>
                        <div className="price">₹ 7,00,000</div>
                    </div>
                    <div className="winner">
                        <div id='top' className="icondiv">
                            <div className="crownimg">
                                <img src={crownone} alt="" />
                            </div>
                            <div className="idimg">
                                <img src={five} alt="" /></div>
                            <div className="positionimg">
                                <img src={placeone} alt="" />
                            </div>
                        </div>
                        <div className="name">Dheeraj Yadav</div>
                        <div className="price">₹ 10,00,000</div>
                        <div className="star"><b>★ ★ ★</b></div>
                    </div>
                    <div className="winner">
                        <div className="icondiv">
                            <div className="crownimg">
                                <img src={crownthree} alt="" />
                            </div>
                            <div className="idimg">
                                <img src={four} alt="" /></div>
                            <div className="positionimg">
                                <img src={placethree} alt="" />
                            </div>
                        </div>
                        <div className="name">Senthil</div>
                        <div className="price">₹ 5,00,000</div>
                    </div>
                </div>
                <div className="runnerup">
                    <div className="fourfive">
                        <div className="position">
                            4
                        </div>
                        
                        <div className="img">
                            <img src={seven} alt="" />
                        </div>
                        <div className="details">
                            <span className="runner-up-name">Winner 4</span>
                        </div>

                        <div className="win">
                            <span>Recieve ₹{ }</span>


                        </div></div>
                    <div className="fourfive"> <div className="position">
                            5
                        </div>
                        
                        <div className="img">
                            <img src={seven} alt="" />
                        </div>
                        <div className="details">
                            <span className="runner-up-name">Winner 5</span>
                        </div>

                        <div className="win">
                            <span>Recieve ₹{ }</span>


                        </div></div>
                </div>
            </div>
        </>
    )
}

export default Stage
