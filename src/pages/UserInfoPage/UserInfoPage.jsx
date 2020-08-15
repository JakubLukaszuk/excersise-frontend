import React, {useState, useContext} from 'react';
import Input from '../../components/UI/Input/Input';
import {checkValidity} from '../../utils/validation';
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as ACTION_TYPES from '../../constants/actionTypes';
import {AppContext} from '../../App.js';
import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Jumbotron
} from 'react-bootstrap';

const INITIAL_INPUTS_STATE = {
  name: {
    elementType: 'input',
    elemetConfig: {
      type: 'text',
      placeholder: 'Enter your name'
    },
    label: "Name",
    value: '',
    validation: {
      required: true,
      minLength: 2,
      maxLength: 24
    },
    valid: false,
    toutched: false
  },
  surname: {
    elementType: 'input',
    elemetConfig: {
      type: 'text',
      placeholder: 'Enter your surname'
    },
    label: "Surname",
    value: '',
    validation: {
      required: true,
      minLength: 2,
      maxLength: 24
    },
    valid: false,
    toutched: false
  },
  age: {
    elementType: 'input',
    elemetConfig: {
      type: 'number',
      placeholder: 'Enter your age'
    },
    label: "Age",
    value: '',
    validation: {
      required: true,
      minLength: 1,
      maxLength: 3
    },
    valid: false,
    toutched: false
  }
}

const UserInfoPage = (porps) => {

  const {state, dispatch} = useContext(AppContext);

  const [inputsData,
    setInputsData] = useState(INITIAL_INPUTS_STATE);

  const isFormValid = () => {
    //to do
  }

  const onChange = (event, controlName) => {
    const updatedControls = {
      ...inputsData,
      [controlName]: {
        ...inputsData[controlName],
        value: event.target.value,
        valid: checkValidity(event.target.value, inputsData[controlName].validation),
        toutched: true
      }
    }
    setInputsData(updatedControls)
  };

  const formElementsArray = [];
  for (let key in inputsData) {
    formElementsArray.push({id: key, config: inputsData[key]})
  }

  let inputs = formElementsArray.map(formElement => (
    <Form.Group as={Row} key={formElement.id}>
      <Form.Label column sm={2}>
        {formElement.config.label}
      </Form.Label>
      <Col sm={8}>
        <Input
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elemetConfig}
          value={formElement.config.value}
          invalid={!formElement.config.valid}
          toutched={formElement.config.toutched}
          changed={(event) => onChange(event, formElement.id)}/>
      </Col>
      <Col sm={2}></Col>
    </Form.Group>
  ))

  const saveFormValues = () => {
    dispatch({
      type: ACTION_TYPES.UPDATE_USER_DATA,
      data: {
        name: inputsData.name.value,
        surname: inputsData.surname.value,
        age: inputsData.age.value
      }
    });
  };

  const onSubmit = () => {
    saveFormValues();
    porps
      .history
      .push(ROUTES.RESTRICTED_PHOTO);
  }

  return (
    <Container>
      <Row>
        <Col>User Data</Col>
      </Row>
      <Jumbotron>
        <Form onSubmit={onSubmit}>
          {inputs}
          <Col md={6}>
            Hello {inputsData.name.value}
            {inputsData.surname.value}
            !
          </Col>
          <Col>
            <Button type="submit">Save</Button>
          </Col>
        </Form>
        <Row></Row>
      </Jumbotron>
    </Container>
  )
}

export default withRouter(UserInfoPage)
