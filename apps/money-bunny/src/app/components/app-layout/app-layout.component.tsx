import React, { FC } from 'react';
import {
  AppBar,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { BarChartOutlined, PaymentOutlined } from '@material-ui/icons';
import styled from 'styled-components';
import { ActivePage, useActivePage } from '../../hooks/use-active-page.hook';
import { useHistory } from 'react-router-dom';

const DrawerContent = styled.div`
  padding-top: 64px;
  width: 250px;
`;

const AppLayoutComponent: FC = ({ children }) => {
  const activePage = useActivePage();
  const history = useHistory();

  const navigateTo = (page: ActivePage) => () => history.push(`/${page}`);

  return (
    <div>
      <CssBaseline />
      <AppBar position={'relative'}>
        <Toolbar>
          <Typography variant="h5" noWrap>
            Money Bunny
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer anchor={'right'} variant={'permanent'}>
        <DrawerContent>
          <List>
            <ListItem
              button
              selected={activePage === ActivePage.EXPENSES}
              onClick={navigateTo(ActivePage.EXPENSES)}
            >
              <ListItemIcon>
                <PaymentOutlined />
              </ListItemIcon>
              <ListItemText primary={'Expenses'} />
            </ListItem>
            <ListItem
              button
              selected={activePage === ActivePage.STATISTICS}
              onClick={navigateTo(ActivePage.STATISTICS)}
            >
              <ListItemIcon>
                <BarChartOutlined />
              </ListItemIcon>
              <ListItemText primary={'Statistics'} />
            </ListItem>
          </List>
        </DrawerContent>
      </Drawer>
      <main>{children}</main>
    </div>
  );
};

export default AppLayoutComponent;
