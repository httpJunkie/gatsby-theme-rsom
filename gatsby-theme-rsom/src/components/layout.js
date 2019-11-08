import React from 'react';
import { Layout as Themelayout, Header, Main, Container } from 'theme-ui';

const Layout = ({children}) => (
  <Themelayout>
    <Header>
      <h1>Gatsby Talks Theme</h1>
    </Header>
    <Main>
      <Container>{children}</Container>
    </Main>
  </Themelayout>
)

export default Layout;