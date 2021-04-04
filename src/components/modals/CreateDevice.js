import React, {useContext, useEffect, useState} from 'react';
import Modal from "react-bootstrap/Modal";
import {Button, Col, Dropdown, Form, Row} from "react-bootstrap";
import {Context} from "../../index";
import {createDevice, fetchBrands, fetchTypes} from "../../api/deviceApi";
import {observer} from "mobx-react-lite";

const CreateDevice = observer(({show, onHide}) => {

  const {device} = useContext(Context)
  const [name, setName] = useState('')
  const [price, setPrice] = useState(0)
  const [file, setFile] = useState(null)
  const [info, setInfo] = useState([])

  useEffect(() => {
    fetchTypes().then(data => device.setTypes(data))
    fetchBrands().then(data => device.setBrands(data))
  },[])

  const addInfo = () => {
    setInfo([...info, {title: '', description: '', number: Date.now()}])
  }
  const removeInfo = (number) => {
    setInfo(info.filter(item => item.number !== number))
  }
  const changeInfo = (key, value, number) => {
    setInfo(info.map(item => item.number === number ? {...item, [key]: value} : item))
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addDevice = async () => {
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    await createDevice(formData).then(data => onHide())
  }

  return (
    <Modal
      show={show}
      onHide={onHide}
      size="lg"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Добавить новый тип
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Dropdown className="mb-2">
            <Dropdown.Toggle>{device.selectedType.name || 'выберите тип'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.types.map(type =>
                <Dropdown.Item onClick={() => device.setSelectedType(type)} key={type.id}>{type.name}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle>{device.selectedBrand.name || 'выберите бренд'}</Dropdown.Toggle>
            <Dropdown.Menu>
              {device.brands.map(brand =>
                <Dropdown.Item onClick={() => device.setSelectedBrand(brand)} key={brand.id}>{brand.name}</Dropdown.Item>
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Form.Control
            className="mt-3"
            onChange={e => setName(e.target.value)}
            value={name}
            placeholder="Введите название устройства"
          />
          <Form.Control
            className="mt-3"
            onChange={e => setPrice(Number(e.target.value))}
            value={price}
            placeholder="Введите стоимость устройства"
            type="number"
          />
          <Form.Control
            className="mt-3"
            placeholder="Введите название устройства"
            onChange={selectFile}
            type="file"
          />
          <hr/>
          <Button
            variant="success"
            onClick={addInfo}
          >
            Добавить новое свойство
          </Button>
          {info.map(item =>
            <Row className="mb-3 mt-3" key={item.number}>
              <Col md={4}>
                <Form.Control
                  value={item.title}
                  onChange={(e) => changeInfo('title', e.target.value, item.number)}
                  placeholder="Введите название"

                />
              </Col>
              <Col md={4}>
                <Form.Control
                  value={item.description}
                  onChange={(e) => changeInfo('description', e.target.value, item.number)}
                  placeholder="Введите описание"
                />
              </Col>
              <Col md={4} >
                <Button
                  onClick={() => removeInfo(item.number)}
                  variant="outline-danger">
                  Удалить
                </Button>
              </Col>
            </Row>
          )}

        </Form>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="outline-danger"  onClick={onHide}>Закрыть</Button>
        <Button variant="outline-success" onClick={addDevice}>Добавить</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CreateDevice;
