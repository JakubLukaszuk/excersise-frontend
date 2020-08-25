import React, {useState, useContext} from 'react';
import Input from '../../components/UI/Input/Input';
import {checkValidity, canBeValue, canBeName, IsInterger} from '../../utils/validation';
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as USER_ACTION_TYPES from '../../constants/actionTypes/user';
import {UserContext} from '../../App.js';

import {
  Form,
  Button,
  Col,
  Row,
  Container,
  Jumbotron,
  Alert,
  Badge
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
      minLength: 1,
      maxLength: 50,
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
      minLength: 1,
      maxLength: 50,
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
      maxLength: 3,
      minValue: 1,
      maxValue: 150
    },
    valid: false,
    toutched: false
  }
}

const VALIDATION_MESSAGES ={
  emptyFields: "All fileds must be filled",
  surname: "Insert correct surname",
  name: "Insert correct name",
  age: "Age must be interger from 1 to 150",
}

const UserInfoPage = (porps) => {

  const {dispatch} = useContext(UserContext);

  const [inputsData,
    setInputsData] = useState(INITIAL_INPUTS_STATE);

  const [valiidationMessage, setValidationMessage]= useState(null);


  const validateForm = () => {
    const newInputs ={...inputsData};
    let validationState = true;

    for(let key in inputsData)
    {
      if(!inputsData[key].value){
        setValidationMessage(VALIDATION_MESSAGES.emptyFields);
        validationState = false;
        return validationState;
      }
    }
    if(!canBeName(inputsData.name.value))
    {
      newInputs.name.valid= false;
      validationState = false;
    }
    if(!canBeName(inputsData.surname.value))
    {
      newInputs.surname.valid= false;
      validationState = false;
    }
    if(!IsInterger(inputsData.age.value))
    {
      newInputs.age.valid= false;
      validationState = false;
    }
    setInputsData(newInputs);
    return validationState;
  }

  const onChange = (event, controlName) => {
    setValidationMessage(null);
    const minValOrFalse = inputsData[controlName].validation.minValue ?
     inputsData[controlName].validation.minValue : false;

    const isNewValue = canBeValue(event.target.value, inputsData[controlName].validation.maxLength, minValOrFalse)
    console.log(isNewValue);
    const updatedControls = {
      ...inputsData,
      [controlName]: {
        ...inputsData[controlName],
        value: isNewValue ? event.target.value : inputsData[controlName].value,
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
          {!formElement.config.valid && formElement.config.toutched
            ? <Badge variant="danger">{VALIDATION_MESSAGES[formElement.id]}</Badge> : null}
      </Col>
      <Col sm={2}> <Alert variant= {formElement.config.valid || !formElement.config.toutched ? 'success' : 'danger'}/></Col>
    </Form.Group>
  ))

  const saveFormValues = () => {
    dispatch({
      type: USER_ACTION_TYPES.UPDATE_USER_DATA,
      data: {
        name: inputsData.name.value,
        surname: inputsData.surname.value,
        age: inputsData.age.value
      }
    });
  };

  const onSubmit = (event) => {
    if(validateForm())
    {
      saveFormValues();
      porps
        .history
        .push(ROUTES.RESTRICTED_PHOTO);
    }
    event.preventDefault();
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
            {valiidationMessage ? <Badge variant="danger">{valiidationMessage}</Badge> : null}
          </Col>
        </Form>
      </Jumbotron>
    </Container>
  )
}

export default withRouter(UserInfoPage)
