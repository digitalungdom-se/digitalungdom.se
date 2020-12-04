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
            {'Inställningar' /* Translation needed */}
          </ListSubheader>
        }
      >
        <ListItem
          button
          component={Link}
          selected={selected === 'konto'}
          to="/inställningar/konto" /* Translation needed */
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText primary="Konto" /* Translation needed */ />
        </ListItem>
        <ListItem
          button
          component={Link}
          selected={selected === 'säkerhet'}
          to="/inställningar/säkerhet" /* Translation needed */
        >
          <ListItemIcon>
            <SecurityIcon />
          </ListItemIcon>
          <ListItemText primary="Säkerhet" /* Translation needed */ />
        </ListItem>
      </List>
    </Paper>
  );
}

export function SettingsTabs({ selected = '', elevation = 1 }: SettingsListProps): React.ReactElement {
  const tabs = ['konto', 'säkerhet']; /* Translation needed */

  return (
    <AppBar color="inherit" elevation={elevation} position="static">
      <Tabs aria-label="settings list" indicatorColor="primary" textColor="primary" value={tabs.indexOf(selected)}>
        <Tab
          component={Link}
          icon={<PersonIcon />}
          label={tabs[0]}
          to={'/inställningar/' + tabs[0]} /* Translation needed */
        />
        <Tab
          component={Link}
          icon={<SecurityIcon />}
          label={tabs[1]}
          to={'/inställningar/' + tabs[1]} /* Translation needed */
        />
      </Tabs>
    </AppBar>
  );
}

export default SettingsList;
