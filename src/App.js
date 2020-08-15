import React from 'react';
import './App.sass';
import * as ROUTES from './constants/routes';
import {Route, Switch, Redirect} from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import UserInfoPage from './pages/UserInfoPage/UserInfoPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import RestrictedPhotoPage from './pages/RestrictedPhotoPage/RestrictedPhotoPage';
import MainLayout from './layouts/MainLayout/MainLayout';

function App() {
  return (
    <React.Fragment>
    <MainLayout></MainLayout>
      <Switch>
        <Route exact path={ROUTES.HOME} component={HomePage}/>
        <Route path={ROUTES.USER_INFO} component={UserInfoPage}/>
        <Route path={ROUTES.RESTRICTED_PHOTO} component={RestrictedPhotoPage}/>
        <Route path={ROUTES.NOT_FOUND} component={NotFoundPage}/>
        <Redirect to={ROUTES.NOT_FOUND}/>
      </Switch>
    </React.Fragment>
  );
}

export default App;
