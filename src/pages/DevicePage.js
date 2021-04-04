import React, {useEffect, useState} from 'react';
import {Button, Card, Col, Container, Image, Row} from "react-bootstrap";
import bigStar from '../assets/star.png'
import {useParams} from 'react-router-dom'
import {fetchOneDevice} from "../api/deviceApi";
const DevicePage = () => {
  const [device, setDevice] = useState({info: []})
  const {id} = useParams()
  useEffect(() => {
    fetchOneDevice(id).then(data => setDevice(data))
  }, [])

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Image width={300} height={300} src={`http://127.0.0.1:7000/${device.img}`}/>
        </Col>
        <Col md={4}>
          <Row>
            <h2>{device.name}</h2>
            <div className="d-flex align-items-center justify-content-center" style={{background: `url(${bigStar}) no-repeat no-repeat center`, width: 240, backgroundSize: 'cover', fontSize: 64}}>
              {device.rating}
            </div>
          </Row>
        </Col>
        <Col md={4}>
          <Card className="d-flex flex-column align-items-center justify-content-around" style={{width: 300, height: 300, fontSize: 300, border:"5px solid lightgray"}}>
            <h3>От {device.price} руб</h3>
            <Button variant="outline-dark">Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
      <Row className="d-flex flex-column m-3">
        <h1>Характеристики</h1>
        {device.info.map((info, index) =>
          <Row key={info.key} style={{background: index % 2 === 0 ? 'lightgray': 'transparent', padding: 10}}>
            {info.title}: {info.description}
          </Row>
        )}
      </Row>

    </Container>
  );
};

export default DevicePage;
