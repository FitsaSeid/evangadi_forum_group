import React from 'react'
import './youtubeVideos.css'
function YoutubeVideos({ thumbnail, title, description, videoLink }) {
    return (
        <div className='youtube'>
            <div className="youtube__thumbnail">
                <a href={videoLink}>
                    <img src={thumbnail} alt="" />
                </a>
            </div>

            <div className="youtube__body">
                <h4>{title} hello world world</h4>
                <p>{description}</p>
            </div>
        </div>
    )
}

export default YoutubeVideos