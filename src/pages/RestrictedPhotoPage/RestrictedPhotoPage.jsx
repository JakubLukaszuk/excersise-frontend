import React, {useState, useContext} from 'react';
import {AppContext} from '../../App.js';
import {
  Button,
  Col,
  Row,
  Container,
} from 'react-bootstrap';

const RestrictedPhotoPage = () => {
  const {state, dispatch} = useContext(AppContext);
  return (
    <Container>
      <Row>
        <Col>{state.userData.name} {state.userData.surname}`s Page</Col>
      </Row>
      <Row>
        <Button/>
      </Row>
    </Container>
  )
}

export default RestrictedPhotoPage
