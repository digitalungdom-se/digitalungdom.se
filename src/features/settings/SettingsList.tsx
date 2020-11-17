import AppBar from '@material-ui/core/AppBar';
import { Link } from 'react-router-dom';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import Paper from '@material-ui/core/Paper';
import PersonIcon from '@material-ui/icons/Person';
import React from 'react';
import SecurityIcon from '@material-ui/icons/Security';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

interface SettingsListProps {
  selected?: string;
  elevation?: number;
}

function SettingsList({ selected, elevation = 1 }: SettingsListProps): React.ReactElement {
  return (
    <Paper elevation={elevation} style={{ width: 200 }}>
      <List
        aria-label="settings-list"
        aria-labelledby="settings-list-subheader"
        component="nav"
        subheader={
          <ListSubheader component="div" id="settings-list-subheader">
            Settings
          </ListSubheader>
        }
      >
        <ListItem button component={Link} selected={selected === 'account'} to="/settings/account">
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Account" />
        </ListItem>
        <ListItem button component={Link} selected={selected === 'security'} to="/settings/security">
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText primary="Security" />
        </ListItem>
      </List>
    </Paper>
  );
}

export function SettingsTabs({ selected = '', elevation = 1 }: SettingsListProps): React.ReactElement {
  const tabs = ['account', 'security'];

  return (
    <AppBar color="inherit" elevation={elevation} position="static">
      <Tabs aria-label="settings list" indicatorColor="primary" textColor="primary" value={tabs.indexOf(selected)}>
        <Tab component={Link} icon={<PersonIcon />} label={tabs[0]} to={'/settings/' + tabs[0]} />
        <Tab component={Link} icon={<SecurityIcon />} label={tabs[1]} to={'/settings/' + tabs[1]} />
      </Tabs>
    </AppBar>
  );
}

export default SettingsList;
