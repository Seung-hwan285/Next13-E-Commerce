'use client';
import React from 'react';
import styled from '@emotion/styled';
import { useForm } from 'react-hook-form';
import {
  validateKorenOnEnglish,
  validatePassword,
} from '@/app/(auth)/login/helper/validation';
import { authAPI } from '@/app/api/auth/login';
import { signIn, useSession } from 'next-auth/react';

import GoogleIcon from '/public/icons/icons8-google.svg';
import Image from 'next/image';

type ButtonType = {
  variant: string;
};

function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { data: session } = useSession();

  const onSubmit = async () => {
    reset();

    const data = await authAPI.login();
    console.log(data);
  };

  const handleLoginClick = () => {
    signIn('google', {
      callbackUrl: 'https://shop-seung-hwan285.vercel.app/',
    });
  };

  return (
    <>
      <LoginFormBox onSubmit={handleSubmit(onSubmit)}>
        <LoginContainer>
          <LoginUserNameWrapper>
            <Label for="username">Username</Label>
            <Input
              {...register('username', {
                validate: (value) => validateKorenOnEnglish(value),
              })}
              name="username"
              placeholder="username"
            />
            {errors?.username?.message ? (
              <div>{errors?.username?.message}</div>
            ) : null}
          </LoginUserNameWrapper>
          <PasswordWrapper>
            <Label for="password">Password</Label>
            <Input
              {...register('password', {
                validate: (value) => validatePassword(value),
              })}
              name="password"
              placeholder="password"
            />
            {errors?.password?.message ? (
              <div>{errors?.password?.message}</div>
            ) : null}
          </PasswordWrapper>

          <ButtonWrapper>
            <Button variant="login">Login</Button>
            <Button variant="register">Register</Button>
            <ButtonGoogle type="button" onClick={handleLoginClick}>
              <Image src={GoogleIcon} height={32} width={22} />
              Google Login
            </ButtonGoogle>
          </ButtonWrapper>
        </LoginContainer>
      </LoginFormBox>
    </>
  );
}

export default LoginForm;

const ButtonGoogle = styled.button`
  border-radius: 6px;
  border: 2px solid #ebeaea;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.75rem;
  min-width: 1.75rem;
  font-size: 1em;
  margin: 0;
  outline: none;
  font-weight: 500;
`;

const LoginContainer = styled.div``;

const LoginFormBox = styled.form`
  background-color: #fff;
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
  color: black;
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

const Button = styled.button<ButtonType>`
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
