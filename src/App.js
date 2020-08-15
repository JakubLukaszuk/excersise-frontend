import React, {useReducer} from 'react';
import './App.sass';
import * as ROUTES from './constants/routes';
import {Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import UserInfoPage from './pages/UserInfoPage/UserInfoPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import RestrictedPhotoPage from './pages/RestrictedPhotoPage/RestrictedPhotoPage';
import MainLayout from './layouts/MainLayout/MainLayout';

export const AppContext = React.createContext();

const initialState = {
  userData: {
    name: "",
    surname: "",
    age: null
  },
  isAuth: false
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'UPDATE_USER_DATA':
      return {state, userData: action.data};

    default:
      return state;
  }
}

const App = () => {
  const [state,
    dispatch] = useReducer(reducer, initialState);
  return (
    <MainLayout>
      <AppContext.Provider value={{
        state,
        dispatch
      }}>
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomePage}/>
          <Route path={ROUTES.USER_INFO} component={UserInfoPage}/>
          <Route path={ROUTES.RESTRICTED_PHOTO} component={RestrictedPhotoPage}/>
          <Route path={ROUTES.NOT_FOUND} component={NotFoundPage}/>
          <Redirect to={ROUTES.NOT_FOUND}/>
        </Switch>
      </AppContext.Provider>
    </MainLayout>
  );
}

export default App;
