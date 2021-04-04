import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(() => {
  const {device} = useContext(Context)
  return (
    <Row className="d-flex">
      {device.brands.map(brand =>
        <Card
          style={{cursor: "pointer"}}
          onClick={() => device.setSelectedBrand(brand)}
          className="p-3"
          border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
          key={brand.id}
        >
          {brand.name}
        </Card>
      )}
    </Row>
  );
});

export default BrandBar;
