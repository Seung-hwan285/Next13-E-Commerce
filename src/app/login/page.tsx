'use client';

import React from 'react';
import LoginForm from '@/components/login/LoginForm';
import styled from '@emotion/styled';

async function LoginPage() {
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
