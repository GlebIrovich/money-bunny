import React, { FC } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  padding: 50px;
`;

const PageLayoutComponent: FC = ({ children }) => {
  return <Container>{children}</Container>;
};

export default PageLayoutComponent;
