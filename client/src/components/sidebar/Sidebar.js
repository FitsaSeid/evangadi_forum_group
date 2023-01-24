import React from 'react';
import './sidebar.css';

import profile from "../../asset/image/profile.png";
import like_img from "../../asset/image/like.png";
import dislike_img from "../../asset/image/dislike.png";
function Sidebar({ user_name, like, dislike, profile_picture }) {
    return (
        <div className='sidebar'>
            <img className='user__avatar' src={profile} alt="profile" />
            <div className="username">
                <h3>{user_name}</h3>
            </div>

            <div className="user__info">
                <div className="likes">
                    {like} <img className='reaction__img' src={like_img} alt="" />
                </div>
                <div className='dislikes'>
                    {dislike} <img className='reaction__img' src={dislike_img} alt="" />
                </div>
            </div>
        </div>
    )
}

export default Sidebar
