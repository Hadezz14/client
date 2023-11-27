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

      <CenteredContainer className="py-4 home-wrapper-2 ">
          <div className="d-flex justify-content-center">
          <GoogleButton
            onClick={handleGooglelogin}
          />
          </div>
      </CenteredContainer>
    </>
  );
};

export default Login;
