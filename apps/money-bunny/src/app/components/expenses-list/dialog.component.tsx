import React, { FC, useEffect, useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  MenuItem,
  Select,
  TextField,
} from '@material-ui/core';
import { CreateExpenseDto, Currency, ExpenseDto } from '@money-bunny/models';
import styled from 'styled-components';
import { displayCurrencyHelper } from '../../helpers/display-currency.helper';

const Container = styled.div`
  width: 350px;
`;

interface Props {
  isOpen: boolean;
  close: () => void;
  expense?: ExpenseDto;
  onSave: (expense: Partial<ExpenseDto>) => void;
}

const initialState: CreateExpenseDto = {
  currency: Currency.CHF,
  recipient: '',
  amount: 0,
  category: '',
};

const DialogComponent: FC<Props> = ({ isOpen, close, expense, onSave }) => {
  const [formState, setFormState] = useState<Partial<ExpenseDto>>(initialState);

  useEffect(() => expense && setFormState(expense), [expense, setFormState]);

  const handleInput =
    (key: keyof ExpenseDto) => (event: React.ChangeEvent<HTMLInputElement>) =>
      setFormState((state) => ({ ...state, [key]: event.target.value }));
  const handleSave = () => onSave(formState);

  const title = expense ? 'Edit expense' : 'Add expense';

  return (
    <Dialog onClose={close} aria-labelledby="simple-dialog-title" open={isOpen}>
      <DialogTitle id="simple-dialog-title">{title}</DialogTitle>
      <Container>
        <TextField
          required
          size={'small'}
          variant="outlined"
          type={'number'}
          placeholder={'Amount'}
          value={formState.amount}
          onChange={handleInput('amount')}
        />

        <Select value={Currency.CHF} disabled>
          <MenuItem value={Currency.CHF}>
            {displayCurrencyHelper(Currency.CHF)}
          </MenuItem>
        </Select>

        <TextField
          required
          size={'small'}
          variant="outlined"
          placeholder={'Category'}
          value={formState.category}
          onChange={handleInput('category')}
        />
        <TextField
          size={'small'}
          variant="outlined"
          placeholder={'Recipient'}
          value={formState.recipient}
          onChange={handleInput('recipient')}
        />

        <Button
          size={'medium'}
          color={'default'}
          variant={'outlined'}
          onClick={close}
        >
          Cancel
        </Button>
        <Button
          size={'medium'}
          color={'primary'}
          variant={'outlined'}
          onClick={handleSave}
        >
          Save
        </Button>
      </Container>
    </Dialog>
  );
};

export default DialogComponent;
