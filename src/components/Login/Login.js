import React, { useEffect, useReducer, useState, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import Input from '../UI/Input/Input';
import AuthContext from '../../store/auth-contex';

const emailReducer = (state, action) => {
  if (action.type === 'USER_INPUT') {
    return { value: action.val, isValid: action.val.includes('@') };
  } else if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.includes('@') };
  }

  return { value: '', isValid: false };
};

const passwordReducer = (state, action) => {
  if (action.type === 'PASSWORD_INPUT') {
    return { value: action.val, isValid: action.val.trim().length > 6 };
  } else if (action.type === 'INPUT_BLUR') {
    return { value: state.value, isValid: state.value.trim().length > 6 };
  }

  return { value: '', isValid: false };
};

const Login = () => {
  const authCtx = useContext(AuthContext);
  const [emailState, dispatchEmailAction] = useReducer(emailReducer, { value: '', isValid: null });
  const [passwordState, dispatchPasswordAction] = useReducer(passwordReducer, { value: '', isValid: null });
  const [isFormValid, setIsFormValid] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();

  //Object destructuring, we create two new constants, assiging isValid's value to each new constants
  const { isValid: isEmailValid } = emailState;
  const { isValid: isPasswordValid } = passwordState;

  useEffect(() => {
    const timerId = setTimeout(() => {
      setIsFormValid(isEmailValid && isPasswordValid);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [isEmailValid, isPasswordValid]);

  const emailChangeHandler = (event) => {
    dispatchEmailAction({ type: 'USER_INPUT', val: event.target.value });
  };

  const passwordChangeHandler = (event) => {
    dispatchPasswordAction({ type: 'PASSWORD_INPUT', val: event.target.value });
  };

  const validateEmailHandler = () => {
    dispatchEmailAction({ type: 'INPUT_BLUR' });
  };

  const validatePasswordHandler = () => {
    dispatchPasswordAction({ type: 'INPUT_BLUR' });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (isFormValid) {
      authCtx.onLogin(emailState.value, passwordState.value);
    } else if (!isEmailValid) {
      emailRef.current.focus();
    } else if (!isPasswordValid) {
      passwordRef.current.focus();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailRef}
          className={`${classes.control} ${emailState.isValid === false ? classes.invalid : ''
            }`}
          type="email"
          id="email"
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler}
          label="E-mail"
        />
        <Input
          ref={passwordRef}
          className={`${classes.control} ${passwordState.isValid === false ? classes.invalid : ''
            }`}
          type="password"
          id="password"
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          label="Password"
        />
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;