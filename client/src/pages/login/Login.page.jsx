import React, { useContext, useState } from 'react';
import axios from 'axios';
import { AppContext } from 'context';
import { FormContent, SectionWrapper } from 'components';
import { useModal } from 'hooks';
import classes from './Login.module.scss';

const INITIAL_FORM_DATA = {
  email: '',
  password: '',
  firstName: '',
  lastName: '',
  dob: '',
};

const Login = _ => {
  const { signIn } = useContext(AppContext);
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);

  const [ErrorModal, openErrorModal] = useModal();
  const [SignUpSuccessModal, openSignUpSuccesModal] = useModal({
    onClose: () => {
      setFormData(INITIAL_FORM_DATA);
      setIsSigningUp(false);
    },
  });

  // no need for try/catch here because we are already catching this invocation in handleSubmit
  const handleSignUp = async _ => {
    const { data } = await axios.post('/users', formData);

    if (data.error) throw new Error('Signup Error');

    openSignUpSuccesModal();
  };

  const handleFormChange = field => evt => setFormData({ ...formData, [field]: evt.target.value });

  const handleSubmit = async e => {
    try {
      e.preventDefault();

      await (isSigningUp ? handleSignUp() : signIn(formData));

      setFormData(INITIAL_FORM_DATA);
    } catch {
      openErrorModal();
    }
  };

  const AuthFormContent = isSigningUp ? FormContent.SignUpFormContent : FormContent.LoginFormContent;

  const [formHeader, swapFormText] = isSigningUp
    ? ['Create your account!', 'Have an account? Login']
    : ['Login in to continue!', "Don't have an account? Sign Up"];

  const handleSwapAuthForm = _ => {
    setFormData(INITIAL_FORM_DATA);
    setIsSigningUp(!isSigningUp);
  };

  return (
    <SectionWrapper>
      <div className={classes.loginWrapper}>
        <h1>{formHeader}</h1>
        <form className={classes.loginForm} onSubmit={handleSubmit}>
          <AuthFormContent {...formData} onChange={handleFormChange} />
          <div className={classes.formActions}>
            <button type='submit'>Submit</button>
            <button onClick={handleSwapAuthForm}>{swapFormText}</button>
          </div>
        </form>
        <ErrorModal icon='error' className='errorModal'>
          <div className={classes.modalText}>
            <h3>{isSigningUp ? 'Error signing up' : 'Could not locate user with email/password'}</h3>
          </div>
        </ErrorModal>
        <SignUpSuccessModal icon='check_circle' className='successModal'>
          <div className={classes.modalText}>
            <h3>User Successfully Created</h3>
          </div>
        </SignUpSuccessModal>
      </div>
    </SectionWrapper>
  );
};

export default Login;
