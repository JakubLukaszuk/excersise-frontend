import React, {useState, useContext} from 'react';
import {UserContext} from '../../App.js';
import {Button, Col, Row, Container, Image, Spinner} from 'react-bootstrap';
import {getImageAsync} from '../../data/service/imageService';
import * as ERROR_MESSAGES from '../../constants/errorMessages/api';;

const RestrictedPhotoPage = () => {
  const {state: userState} = useContext(UserContext);
  const [imgSource, setImgSource] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const showImageHandle = () => {
    setLoading(true);
    const blobImage = getImageAsync().catch(error =>{
      setLoading(false);
      setError(error);
    })
      blobImage.then(blob => {
        if(!error && blob)
        {
          const objectURL = window.URL.createObjectURL(blob);
          setImgSource(objectURL);
        }
        setLoading(false);
      })
  }

  const getErrorMessage = (error) => {
    if(error.response || error.status|| error.code)
    {
      if(error.response.status)
      {
        const status = error.response.status;
        switch(status){
          case 404:
            return ERROR_MESSAGES.NOT_FOUND_ERROR;
          case 500:
            return ERROR_MESSAGES.INTERNAL_SERVER_ERROR;
          default:
            return ERROR_MESSAGES.UNKNOWN_ERROR;
        }
      }
      return ERROR_MESSAGES.UNKNOWN_ERROR;
    }
    else
    {
      return ERROR_MESSAGES.NETWORK_ERROR;
    }
  }

  return (
    <Container>
      <Row>
        <Col>{userState.userData.name} {userState.userData.surname}`s Page</Col>
      </Row>
      <Col xs={6} md={4}>
      {loading ? <Spinner/> : imgSource ?
        <Image src={imgSource} rounded/> : error ? getErrorMessage(error) : null}
    </Col>
      <Row>
        <Button onClick= {showImageHandle} active = {userState.isImageAllowed}/>
      </Row>
    </Container>
  )
}

export default RestrictedPhotoPage
