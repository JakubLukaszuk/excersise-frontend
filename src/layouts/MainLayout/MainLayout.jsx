import React from 'react'
import NavBar from '../../components/Navigation/NavBar/NavBar';

const MainLayout = (props) => {
  return (
    <React.Fragment>
      <NavBar/>
      <div className>
        {props.children}
      </div>
    </React.Fragment>
  )
}
export default MainLayout;
