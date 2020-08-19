import React, {useState, useContext} from 'react';
import {UserContext} from '../../App.js';
import {Button, Col, Row, Container, Image} from 'react-bootstrap';
import {getImageAsync} from '../../data/service/imageService';

const RestrictedPhotoPage = () => {
  const {state: userState} = useContext(UserContext);
  const [error, setError] = useState(null);
  const [imgSource, setImgSource] = useState(null);

  const showImageHandle = () => {
    const blobImage = getImageAsync().catch(error =>{
      setError(error);
    })
    if(!error)
    {
      blobImage.then(blob => {
        const objectURL = window.URL.createObjectURL(blob);
        setImgSource(objectURL);
      })
    }
  }

  return (
    <Container>
      <Row>
        <Col>{userState.userData.name} {userState.userData.surname}`s Page</Col>
      </Row>
      <Col xs={6} md={4}>
        <Image src={imgSource} rounded/>
      </Col>
      <Row>
        <Button onClick= {showImageHandle} active = {userState.isImageAllowed}/>
      </Row>
    </Container>
  )
}

export default RestrictedPhotoPage
