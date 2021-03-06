import React, {useState, useContext} from 'react';
import Input from '../../components/UI/Input/Input';
import {checkValidity, canBeValue, canBeName, IsInteger} from '../../utils/validation';
import {withRouter} from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import * as USER_ACTION_TYPES from '../../constants/actionTypes/user';
import * as classes from './UserInfoPage.module.sass';
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

  const {dispatch, state} = useContext(UserContext);

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
    const numericAge = Number(inputsData.age.value);

   if(!IsInteger(numericAge) || numericAge > 150 || numericAge <= 0)
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
      <Form.Label column sm={1}>
        {formElement.config.label}
      </Form.Label>
      <Col sm={9}>
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
      <Col sm={2}> <Alert className={classes.alertBar} variant= {formElement.config.valid || !formElement.config.toutched ? 'success' : 'danger'}/></Col>
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
        <Col className={classes.spacing}>User Data</Col>
      </Row>
      <Jumbotron>
        <Form onSubmit={onSubmit}>
          {inputs}
          <Row className="justify-content-center">
            <Col md="auto" className={classes.spacing}>
            {state.userData.name && state.userData.surname ?
              `Hello ${state.userData.name} ${state.userData.surname} !` : null}
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="auto">
              <Button type="submit">Save</Button>
            </Col>
          </Row>
          <Row className="justify-content-center">
            <Col md="auto">
              {valiidationMessage ?
                <Badge variant="danger" className={classes.spacing}>{valiidationMessage}</Badge>
              : null}
          </Col>
        </Row>
        </Form>
      </Jumbotron>
    </Container>
  )
}

export default withRouter(UserInfoPage)
