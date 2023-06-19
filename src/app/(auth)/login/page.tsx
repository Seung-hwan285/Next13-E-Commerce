'use client';
import React, { useState } from 'react';
import LoginForm from '@/app/(auth)/login/components/LoginForm';
import styled from '@emotion/styled';

function LoginPage() {
  return (
    <LoginContainer>
      <LoginForm />
    </LoginContainer>
  );
}
export default LoginPage;

const LoginContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  height: 100vh;
`;
