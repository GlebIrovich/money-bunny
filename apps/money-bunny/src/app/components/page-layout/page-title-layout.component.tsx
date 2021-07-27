import React, { FC } from 'react';
import styled from 'styled-components';
import { Typography } from '@material-ui/core';

const Container = styled.div`
  padding: 20px 0;
`;

const PageTitleLayoutComponent: FC = ({ children }) => {
  return (
    <Container>
      <Typography variant={'h3'}>{children}</Typography>
    </Container>
  );
};

export default PageTitleLayoutComponent;
