import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from 'context';
import { FormContent, SectionWrapper } from 'components';
import { useModal } from 'hooks';
import { mapErrorCodeToMessage } from 'utils';
import classes from './Login.module.scss';

const INITIAL_FORM_DATA = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dob: '',
  image: '',
};

const Login = _ => {
  const { signIn } = useContext(AppContext);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [userData, setUserData] = useState(INITIAL_FORM_DATA);

  const [ErrorModal, openErrorModal] = useModal();
  const [SignUpSuccessModal, openSignUpSuccesModal] = useModal({
    onClose: _ => {
      setUserData(INITIAL_FORM_DATA);
      setIsSigningUp(false);
    },
  });

  // no need for try/catch here because we are already catching this invocation in handleSubmit
  const handleSignUp = async _ => {
    const formData = new FormData();

    Object.keys(userData).forEach(field => formData.append(field, userData[field]));

    const { data } = await axios.post('/users', formData, { headers: { 'content-type': 'multipart/form-data' } });

    if (data.error || !data.success) throw new Error(mapErrorCodeToMessage(data.error));

    openSignUpSuccesModal('User created successfully');
  };

  const handleFormChange = field => evt => setUserData({ ...userData, [field]: evt.target.value });

  const handleFileUpload = evt => setUserData({ ...userData, image: evt.target.files[0] });

  const handleSubmit = async e => {
    e.preventDefault();

    try {
      await (isSigningUp ? handleSignUp() : signIn(userData));
      setUserData(INITIAL_FORM_DATA);
    } catch (err) {
      openErrorModal(err.message);
    }
  };

  const AuthFormContent = isSigningUp ? FormContent.SignUpFormContent : FormContent.LoginFormContent;

  const [formHeader, swapFormText] = isSigningUp
    ? ['Create your account!', 'Have an account? Login']
    : ['Login in to continue!', "Don't have an account? Sign Up"];

  const handleSwapAuthForm = _ => {
    setUserData(INITIAL_FORM_DATA);
    setIsSigningUp(!isSigningUp);
  };

  return (
    <SectionWrapper>
      <div className={classes.loginWrapper}>
        <h1>{formHeader}</h1>
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <AuthFormContent {...userData} onChange={handleFormChange} onFileUpload={handleFileUpload} />
          <div className={classes.formActions}>
            <button type='submit'>Submit</button>
            <button onClick={handleSwapAuthForm}>{swapFormText}</button>
          </div>
        </form>
        <ErrorModal icon='error' className='errorModal' />
        <SignUpSuccessModal icon='check_circle' className='successModal' />
      </div>
    </SectionWrapper>
  );
};

export default Login;
