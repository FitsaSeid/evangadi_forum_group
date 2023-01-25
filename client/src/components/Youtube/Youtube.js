import React, { useState, useEffect } from 'react';
import { Row, Col, Card, Container } from "react-bootstrap";
import './youtube.css'

function YoutubeVideos() {
  const [youtube, setYoutube] = useState([]);
  useEffect(() => {
    fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyCbWURpsxsgzfoI4NWDxJggP3ZDLRAsX7U&channelId=UCxA7AzkI2Sndf8S1G5rSkwQ&part=snippet,id&order=viewcount&maxResults=3")
      .then((response) => response.json())
      .then((data) => {
        const youtube = data.items;
        // console.log(youtube);
        setYoutube(youtube)
      })

  }, [])
  console.log(youtube);

  return (
    <Container>
      <div>
        <h4 className='text-center'> Evangadi videos </h4>

      </div>
      <Row>
        {youtube?.map((singelvideo, index) => {
          let vid = singelvideo.id.videoId
          let videoLink = `https://www.youtube.com/watch?v=${vid}`
          return (
            <Col sm={12} md={12} className="mb-3">
              <Card key={index} style={{ height: "30rem" }} >
                <a href={videoLink}>
                  <img src={singelvideo.snippet.thumbnails.high.url} alt="" />
                </a>
                <Card.Body>
                  <Card.Title>{singelvideo.snippet.title}</Card.Title>
                  <Card.Text>{singelvideo.snippet.description}</Card.Text>
                  <Card.Subtitle>{singelvideo.snippet.publishedAt}</Card.Subtitle>
                </Card.Body>
              </Card>
            </Col>
          )
        })}
        <Col>
        </Col>
      </Row>
    </Container>

  )
}

export default YoutubeVideos