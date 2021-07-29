import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { Currency, ExpenseDto } from '@money-bunny/models';
import styled from 'styled-components';
import { displayCurrencyHelper } from '../../helpers/display-currency.helper';

const Container = styled.div`
  width: 350px;
`;

const InputContainer = styled.div`
  padding: 10px 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
  button {
    margin-left: 10px;
  }
`;

export interface ExpenseFormState {
  currency: Currency;
  recipient?: string;
  amount: number;
  category: string;
}

interface Props {
  isOpen: boolean;
  close: () => void;
  expense?: ExpenseDto;
  onSave: (expense: ExpenseFormState) => void;
}

const initialState: ExpenseFormState = {
  currency: Currency.CHF,
  recipient: '',
  amount: 0,
  category: '',
};

const DialogComponent: FC<Props> = ({ isOpen, close, expense, onSave }) => {
  const [formState, setFormState] = useState<ExpenseFormState>(initialState);

  useEffect(() => expense && setFormState(expense), [expense, setFormState]);

  const handleInput =
    (key: keyof ExpenseFormState) =>
    (event: React.ChangeEvent<HTMLInputElement>) =>
      setFormState((state) => ({ ...state, [key]: event.target.value }));
  const handleSave = () => onSave(formState);

  const title = expense ? 'Edit expense' : 'Add expense';

  return (
    <Dialog onClose={close} aria-labelledby="simple-dialog-title" open={isOpen}>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <Container>
        <InputContainer>
          <TextField
            required
            size={'small'}
            variant="outlined"
            type={'number'}
            placeholder={'Amount'}
            value={formState.amount}
            onChange={handleInput('amount')}
          />
        </InputContainer>

        <InputContainer>
          <Select value={Currency.CHF} disabled>
            <MenuItem value={Currency.CHF}>
              {displayCurrencyHelper(Currency.CHF)}
            </MenuItem>
          </Select>
        </InputContainer>

        <InputContainer>
          <TextField
            required
            size={'small'}
            variant="outlined"
            placeholder={'Category'}
            value={formState.category}
            onChange={handleInput('category')}
          />
        </InputContainer>
        <InputContainer>
          <TextField
            size={'small'}
            variant="outlined"
            placeholder={'Recipient'}
            value={formState.recipient}
            onChange={handleInput('recipient')}
          />
        </InputContainer>

        <ButtonContainer>
          <Button
            size={'medium'}
            color={'default'}
            variant={'outlined'}
            onClick={close}
          >
            Cancel
          </Button>
          <Button
            disabled={!isValid(formState)}
            size={'medium'}
            color={'primary'}
            variant={'outlined'}
            onClick={handleSave}
          >
            Save
          </Button>
        </ButtonContainer>
      </Container>
    </Dialog>
  );
};

export default DialogComponent;

function isValid(formState: ExpenseFormState): boolean {
  return !!formState.category;
}
