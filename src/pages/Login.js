import React from "react";
import { Link, useNavigate } from "react-router-dom";
import GoogleButton from 'react-google-button'
import BreadCrumb from "../components/BreadCrumb";
import Meta from "../components/Meta";
import Container from "../components/Container";
import * as yup from 'yup';
import { useDispatch, useSelector } from "react-redux";
import { loginUser, loginWithGoogle } from "../features/user/userSlice";
import styled from "styled-components";

const CenteredContainer = styled(Container)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh; // Adjust the height as needed
`;
const Login = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch();
 

  const handleGooglelogin = async() =>{
    dispatch(loginWithGoogle());
    navigate("/")
  }

  return (
    <>
      <Meta title={"Login"} />
      <BreadCrumb title="Login" />

      <CenteredContainer class1="login-wrapper py-4 home-wrapper-2">
        
          <GoogleButton
            onClick={handleGooglelogin}
          />
        
      </CenteredContainer>
    </>
  );
};

export default Login;
