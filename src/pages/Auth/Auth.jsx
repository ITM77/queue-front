import React  from 'react';
import styled from 'styled-components';
import Login from './Login';

const AuthStyled = styled.div`
  min-height: 100vh;
  background: #f0f2f5;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto 1fr;

  > header {
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 15px 34px;

    > img {
      height: 50px;
    }

    > div {
      display: flex;
      align-items: center;
      column-gap: 34px;

      > h5 {
        margin: 0 !important;
        cursor: pointer;
        color: #00000073;

        &:hover {
          color: #e53540;
        }
      }
    }
  }

  > main {
    display: flex;
    align-items: center;
    justify-content: center;

    > div {
      background: #fff;
      padding: 24px;

      width: 380px;
    }
  }
`;

function Auth() {

  return (
    <AuthStyled>
      <header>
        <h1 style={{color: '#49bff4'}} className='text-3xl font-bold'>CRM</h1>
      </header>
      <main>
        <div>
          <Login/>
        </div>
      </main>
    </AuthStyled>
  );
}

export default Auth;
