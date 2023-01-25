import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Container } from "react-bootstrap";
import YoutubeVideos from './YoutubeVideos';

function Youtube() {
  const [youtube, setYoutube] = useState([]);
  useEffect(() => {
    fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyCbnRADU-xxLGemFAcJ5B6bvETS-zJ_5Pk&channelId=UCxA7AzkI2Sndf8S1G5rSkwQ&part=snippet,id&order=viewcount&maxResults=3")
      .then((response) => response.json())
      .then((data) => {
        const youtube = data.items;
        // console.log(youtube);
        setYoutube(youtube)
      })

  }, [])
  console.log(youtube);

  return (
    <div>
      <h3> Evangadi videos </h3>

      {youtube?.map((singelvideo, index) => {
        let vid = singelvideo.id.videoId
        let videoLink = `https://www.youtube.com/watch?v=${vid}`

        return (
          <YoutubeVideos
            thumbnail={singelvideo.snippet.thumbnails.high.url}
            title={singelvideo.snippet.title}
            description={singelvideo.snippet.description}
            videoLink={videoLink}
          />
        )
      })}
    </div>

  )
}

export default Youtube