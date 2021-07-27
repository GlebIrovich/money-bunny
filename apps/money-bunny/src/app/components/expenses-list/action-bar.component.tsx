import React, { FC } from 'react';
import styled from 'styled-components';
import { TextField } from '@material-ui/core';

const Container = styled.div`
  padding: 15px 0;
  display: flex;
`;

const Margin = styled.div`
  margin-left: auto;
`;

interface Props {
  searchTerm: string;
  onSearch: (value: string) => void;
}

const ActionBarComponent: FC<Props> = ({ children, onSearch, searchTerm }) => {
  return (
    <Container>
      <TextField
        size={'small'}
        value={searchTerm}
        onChange={(event) => onSearch(event.target.value)}
        variant="outlined"
        placeholder={'Type to search'}
      />
      <Margin />
      {children}
    </Container>
  );
};

export default ActionBarComponent;
