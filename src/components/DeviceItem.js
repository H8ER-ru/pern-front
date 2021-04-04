import React from 'react';
import {Card, Col, Image} from "react-bootstrap";
import smallStar from '../assets/smallStar.svg'
import {useHistory} from 'react-router-dom'
import {DEVICE_ROUTE} from "../utils/consts";

const DeviceItem = ({device}) => {
  const history = useHistory()
  return (
    <Col md={3} className='mt-3' onClick={() => history.push( DEVICE_ROUTE + '/' + device.id)}>
        <Card style={{width: 150, cursor: 'pointer'}} border={'light'}>
          <Image width={150} height={150} src={`http://127.0.0.1:7000/${device.img}`}/>
          <div className=" text-black-50 d-flex justify-content-between align-items-center">
            <h2>{device.brand}</h2>
            <div className='d-flex align-items-center'>
              <div className="rating">{device.rating}</div>
              <Image width={18} height={18} src={smallStar} />
            </div>
          </div>
          <div>{device.name}</div>
        </Card>
    </Col>
  );
};

export default DeviceItem;
