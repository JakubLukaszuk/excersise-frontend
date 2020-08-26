import React, {useState, useContext} from 'react';
import {UserContext} from '../../App.js';
import {getImageAsync} from '../../data/service/imageService';
import * as ERROR_MESSAGES from '../../constants/errorMessages/api';
import * as classes from './RestrictedPhotoPage.module.sass';
import {Button, Col, Row, Container, Image, Spinner, Badge} from 'react-bootstrap';

const RestrictedPhotoPage = () => {
  const {state: userState} = useContext(UserContext);
  const [imgSource, setImgSource] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isWarining, setIsWarining] = useState(false);

  const showImageHandle = () => {
    if(userState.userData.age >= 18)
    {
      setIsWarining(false)
      setIsLoading(true);
      const blobImage = getImageAsync().catch(error =>{
        setIsLoading(false);
        setError(error);
      })
        blobImage.then(blob => {
          if(!error && blob)
          {
            const objectURL = window.URL.createObjectURL(blob);
            setImgSource(objectURL);
          }
          setIsLoading(false);
        })
    }
    else
    {
      setIsWarining(true);
    }
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
      <Row className="justify-content-center">
        <Col md="auto" className={classes.elementSpacing}>{userState.userData.name} {userState.userData.surname}`s Page</Col>
      </Row>
      <Row className="justify-content-center">
        <Button md="auto" className={classes.elementSpacing} onClick= {showImageHandle}>Accces</Button>
      </Row>
      <Row className="justify-content-center">
        <Col md="auto">
          <div className = {classes.imageWrapper}>
            {isLoading ? <Spinner/> : imgSource && !isWarining ?
              <Image className = {classes.secredImage} src={imgSource} rounded/> : error ? getErrorMessage(error) : null}
            {isWarining ? <Badge variant="danger" className={classes.absoulteCenter}>You by at least 18 years old !</Badge> : null }
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default RestrictedPhotoPage
