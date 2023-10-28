import { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import React from 'react';

const initFromValue = {
  name:"",
  email:"",
  password:"",
  confirmPassword:"",
};

const isEmptyValue = (value) => {
  return value.trim() === '';
};

const isEmailInvalid = (email) => {
  // Sử dụng một biểu thức chính quy đơn giản để kiểm tra tính hợp lệ của email
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return !emailPattern.test(email);
};

const Register = () => {
  const navigate = useNavigate();

  const onLogoContainerClick = useCallback(() => {
    navigate("/");
  }, [navigate]);

  const onButtClick = useCallback(() => {
    navigate("/login");
  }, [navigate]);

  //#region component
  const [formValue, setFromValue] = useState(initFromValue);
  const [formError, setFromError] = useState(initFromValue);
  const handleInputChange = (event) => {
    const { value, name } = event.target;
    setFromValue({
      ...formValue,
      [name]: value,
    });
  };
 
  const validateForm = () => {
    const error = {};

    if(isEmptyValue(formValue.name))
    {
      error["name"] = "Name is required";
    }

    if(isEmptyValue(formValue.email))
    {
      error["email"] = "Email is required";
    }
    else if(!isEmailInvalid(formValue.email))
    {
      error["email"] = "Email is invalid";
    }

    if(isEmptyValue(formValue.password))
    {
      error["password"] = "Password is required";
    }

    if(isEmptyValue(formValue.confirmPassword))
    {
      error["confirmPassword"] = "Confirm password is required";
    }
    else if(formValue.password !== formValue.confirmPassword)
    {
      error["confirmPassword"] = "Confirm password not match";
    }

    setFromError(error);
    return Object.keys(error).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if(validateForm())
    {
      console.log("Form values:", formValue);
    }
    else
    {
      console.log("Form invalid:");
    }

    
  };
  //#endregion

  return (
    <div className="register">
      <div className="decor3">
        <img className="image-9-icon3" alt="" src="/image-91@2x.png" />
        <img className="image-10-icon3" alt="" src="/image-10@2x.png" />
      </div>
      <div className="logo4" onClick={onLogoContainerClick}>
        <div className="kidtube5">Kidtube</div>
        <img className="logo-child1" alt="" src="/group-2444.svg" />
      </div>
      <form onSubmit={handleSubmit}>
        <div className="reg">
          <div className="name2">
            <input
              className="what-is-your"
              placeholder="What is your kid’s name ?"
              type="text"
              name="name"
              value={formValue.name}
              onChange={handleInputChange}
            />
            {formError.name && (
              <div className="error-feedback">{formError.name}</div>
            )}
          </div>
          <div className="email2">
            <input
              className="lets-us-know"
              placeholder="Let’s us know your email ^_^"
              type="email"
              name="email"
              value={formValue.email}
              onChange={handleInputChange}
            />
            {formError.email && (
              <div className="error-feedback">{formError.email}</div>
            )}
          </div>
          <div className="password1">
            <input
              className="pass2"
              placeholder="Type your password here ..."
              type="password"
              name="password"
              value={formValue.password}
              onChange={handleInputChange}
            />
            {formError.password && (
              <div className="error-feedback">{formError.password}</div>
            )}
          </div>
          <div className="confirm">
            <input
              className="and-confirm-it"
              placeholder="... And confirm it !"
              type="password"
              name="confirmPassword"
              value={formValue.confirmPassword}
              onChange={handleInputChange}
            />
            {formError.confirmPassword && (
              <div className="error-feedback">{formError.confirmPassword}</div>
            )}
          </div>
          <button type="submit" className="butt1">
            <div className="button7">Start!</div>
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
