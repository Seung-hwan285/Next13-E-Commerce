'use client';
import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import {
  validateKorenOnEnglish,
  validatePassword,
} from '@/app/(auth)/login/helper/validation';

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = () => {
    reset();
  };

  return (
    <>
      <LoginFormBox onSubmit={handleSubmit(onSubmit)}>
        <LoginContainer>
          <LoginUserNameWrapper>
            <Label>Username</Label>
            <Input
              {...register('username', {
                validate: (value) => validateKorenOnEnglish(value),
              })}
              name="username"
              placeholder="username"
            />

            {errors?.username ? <div>{errors?.username?.message}</div> : null}
          </LoginUserNameWrapper>
          <PasswordWrapper>
            <Label>Password</Label>
            <Input
              {...register('password', {
                validate: (value) => validatePassword(value),
              })}
              name="password"
              placeholder="password"
            />
            {errors?.password ? <div>{errors?.password?.message}</div> : null}
          </PasswordWrapper>

          <ButtonWrapper>
            <Button variant="login">Login</Button>

            <Button variant="register">Register</Button>
          </ButtonWrapper>
        </LoginContainer>
      </LoginFormBox>
    </>
  );
}
export default LoginForm;

const LoginContainer = styled.div``;

const LoginFormBox = styled.form`
  background-color: ${(props) => props.theme.colors.white};
  width: 35%;
  height: 25rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 5px;
  color: black;
`;

const LoginUserNameWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Label = styled.label`
  color: ${(props) => props.theme.colors.black};
  margin-right: 12rem;
`;

const Input = styled.input`
  background-color: #fff;
  border: 1px solid black;
  font-size: 1.5rem;
  color: black;
`;

const PasswordWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 4rem;
`;

const Button = styled.button`
  color: ${(props) => (props.variant === 'login' ? 'white' : 'black')};
  background-color: ${(props) =>
    props.variant === 'login' ? 'rgb(59 130 246)' : ''};
  font-size: 20px;
  margin: 10px;
  border: 1px solid ${(props) => (props.variant === 'login' ? 'white' : 'none')};
  padding: 5px 10px;
  border-radius: 6px;
  font-weight: bold;

  &:hover {
    background-color: ${(props) =>
      props.variant === 'login' ? 'rgb(29 78 216)' : ''};

    color: ${(props) => (props.variant === 'login' ? '' : 'rgb(30 64 175);')};
  }
`;
