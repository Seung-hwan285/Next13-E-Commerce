"use client";
import React from "react";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import GoogleIcon from "/public/icons/icons8-google.svg";

import Image from "next/image";
import { themState } from "@/lib/jotail/themState";
import { useAtom } from "jotai";

function LoginForm() {
  const {
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm();

  const [activeThem] = useAtom(themState);

  const onSubmit = async () => {
    reset();
  };

  const handleLoginClick = () => {
    signIn("google", {
      // callbackUrl: `${process.env.NEXT_PUBLIC_HOST}`,
      callbackUrl: "https://shop-seung-hwan285.vercel.app/",
    });
  };

  return (
    <>
      <LoginFormBox activeThem={activeThem} onSubmit={handleSubmit(onSubmit)}>
        <LoginContainer>
          <ButtonWrapper>
            <ButtonGoogle
              data-testid="login-icon"
              type="button"
              onClick={handleLoginClick}
            >
              <Image src={GoogleIcon} height={32} width={22} alt="image" />
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
  width: 100%;
  border: 2px solid #ebeaea;
  padding: 0 0.5rem;
  display: flex;
  height: 1.75rem;
  min-width: 1.75rem;
  font-size: 1em;
  margin: 0;
  outline: none;
  align-items: center;
  justify-content: center;
  font-weight: 500;
`;

const LoginContainer = styled.div``;

const LoginFormBox = styled.form`
  background-color: #ffffff;
  width: 35%;
  height: 25rem;
  display: flex;
  align-items: center;
  margin-bottom: 9rem;
  border: 1px solid ${(p) => (p.activeThem === "light" ? "black" : "white")};
  margin-right: 1rem;
  justify-content: center;
  border-radius: 5px;
  color: black;
`;
//
// const LoginUserNameWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
// `;
//
// const Label = styled.label`
//   color: black;
//   margin-right: 12rem;
//   justify-content: flex-end;
// `;
//
// const Input = styled.input`
//   background-color: #fff;
//   border: 1px solid black;
//   font-size: 1.5rem;
//   color: black;
// `;
//
// const PasswordWrapper = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   flex-direction: column;
//   margin-top: 1rem;
// `;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  margin-top: 1rem;
`;

// const Button = styled.button<ButtonType>`
//   color: #ffffff;
//   background-color: rgb(59 130 246);
//   font-size: 20px;
//   margin: 5px;
//   padding: 5px 10px;
//   width: 100%;
//   border-radius: 6px;
//   font-weight: bold;
//   &:hover {
//     background-color: rgba(30 64 175);
//   }
// `;
