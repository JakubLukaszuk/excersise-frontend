import React, {useReducer} from 'react';
import './App.sass';
import {Route, Switch, Redirect} from 'react-router-dom';

import HomePage from './pages/HomePage/HomePage';
import UserInfoPage from './pages/UserInfoPage/UserInfoPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import RestrictedPhotoPage from './pages/RestrictedPhotoPage/RestrictedPhotoPage';
import MainLayout from './layouts/MainLayout/MainLayout';

import * as ROUTES from './constants/routes';
import * as USER_ACTION_TYPES from './constants/actionTypes/user';
export const UserContext = React.createContext();

const initialUserState = {
  userData: {
    name: "",
    surname: "",
    age: null
  },
  isPageAllowed: false,
  isImageAllowed: false
};

const userReducer = (state, action) => {
  switch (action.type) {
    case USER_ACTION_TYPES.UPDATE_USER_DATA:
      {
        const data = action.data;
        const isPageAllowed = data.name && data.surname && data.age;
        if (isPageAllowed) {
          if (action.data.age >= 18) {
            return {state, userData: data, isPageAllowed: true, isImageAllowed: true};
          }
          return {state, userData: data, isPageAllowed: true};
        }
        return {state, userData: data};
      }
    default:
      return state;
  }
}

const App = () => {
  const [userState,
    userDispatch] = useReducer(userReducer, initialUserState);

  return (
    <UserContext.Provider
      value={{
      state: userState,
      dispatch: userDispatch
    }}>
      <MainLayout>
        <Switch>
          <Route exact path={ROUTES.HOME} component={HomePage}/>
          <Route path={ROUTES.USER_INFO} component={UserInfoPage}/> {userState.isPageAllowed
            ?<Route path={ROUTES.RESTRICTED_PHOTO} component={RestrictedPhotoPage}/>
            : null}
          <Route path={ROUTES.NOT_FOUND} component={NotFoundPage}/>
          <Redirect to={ROUTES.NOT_FOUND}/>
        </Switch>
      </MainLayout>
    </UserContext.Provider>
  );
}

export default App;
