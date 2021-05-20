import React, { useState, useEffect, useReducer, useContext, useRef } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';
import AuthContext from '../../context/auth-context';
import Input from '../UI/Input/Input';

const emailReducer = (state, action) => {
  if (action.type === 'USER_EMAIL') {
    return {
      value: action.val,
      isValid: action.val.includes('@')
    }
  }
  if (action.type === 'INPUT_BLUR') {
    return {
      value: state.value,
      isValid: state.value.includes('@')
    }
  }
  return {
    value: '',
    isValid: false
  };
};

const passwordReducer = (state, action) => {
  if (action.type === 'USER_PASSWORD') {
    return {
      value: action.val,
      isValid: action.val.trim().length > 6
    }
  }
  if (action.type === 'PASSWORD_BLUR') {
    return {
      value: state.value,
      isValid: state.value.trim().length > 6
    }
  }
  return {
    value: '',
    isValid: false
  };
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  // const [enteredPassword, setEnteredPassword] = useState('');
  // const [passwordIsValid, setPasswordIsValid] = useState();
  const [formIsValid, setFormIsValid] = useState(false);

  const [emailState, dispatchEmail] = useReducer(emailReducer, {
    value: '',
    isValid: null,
  });

  const [passwordState, dispatchPassword] = useReducer(passwordReducer, {
    value: '',
    isValid: null,
  })

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const { isValid: emailIsValid } = emailState; //alias assignment - object destructuring, not a value assignment because it's on the left side of the equal sign
  const { isValid: passwordIsValid } = passwordState;

  const useCtx = useContext(AuthContext);

  useEffect(() => {
    const identifier = setTimeout(() => {
      console.log('Checking for validity')
      setFormIsValid(
        emailIsValid && passwordIsValid
      );
    }, 500)

    return () => {
      console.log('CLEANUP')
      clearTimeout(identifier)
    }
  }, [emailIsValid, passwordIsValid]);

  const emailChangeHandler = (event) => {
    dispatchEmail({ type: 'USER_EMAIL', val: event.target.value })
    // setFormIsValid(
    //   event.target.value.includes('@') && passwordState.isValid
    // );
  };

  const passwordChangeHandler = (event) => {
    dispatchPassword({ type: 'USER_PASSWORD', val: event.target.value })
    // setFormIsValid(
    //   emailState.isValid && event.target.value.trim().length > 6
    // );
  };

  const validateEmailHandler = () => {
    dispatchEmail({ type: 'INPUT_BLUR' })
  };

  const validatePasswordHandler = () => {
    dispatchPassword({ type: 'PASSWORD_BLUR' })
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (formIsValid) {
      useCtx.onLogin(emailState.value, passwordState.value);
    } else if (!emailIsValid) {
      emailInputRef.current.activated();
    } else {
      passwordInputRef.current.activated();
    }
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <Input
          ref={emailInputRef}
          id="email"
          label="E-mail"
          isValid={emailIsValid}
          value={emailState.value}
          onChange={emailChangeHandler}
          onBlur={validateEmailHandler} />
        <Input
          ref={passwordInputRef}
          id="password"
          label="Password"
          isValid={passwordIsValid}
          value={passwordState.value}
          onChange={passwordChangeHandler}
          onBlur={validatePasswordHandler}
          type="password" />

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
