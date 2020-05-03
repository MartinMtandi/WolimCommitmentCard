import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import {AppBar, Tabs, Tab, Typography, Box, Container, CssBaseline} from '@material-ui/core';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';

import HouseholdList from '../components/HouseholdsList';
import FilterBy from '../components/FilterBy';
import AdminAppBar from  '../components/AdminAppBar';
import SearchBy from '../components/SearchBy';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    'aria-controls': `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  appBar: {
    backgroundColor: '#9D43FF',
    color: '#fff',
    fontWeight: 700
}
}));

export default function AdminTabs() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
    <AdminAppBar />
      <AppBar position="static" className={classes.appBar}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="fullWidth"
          scrollButtons="off"
          aria-label="scrollable admin tab"
        >
          <Tab icon={<AssignmentIndIcon />} aria-label="Household" {...a11yProps(0)} />
          <Tab icon={<MonetizationOnIcon />} aria-label="Make Sale" {...a11yProps(1)} />
          <Tab icon={<ScheduleIcon />} aria-label="Scheduling" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
      <CssBaseline />
      <Container maxWidth="sm">
        <FilterBy />
        <HouseholdList />
      </Container>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CssBaseline />
        <Container maxWidth="sm">
          <SearchBy />
        </Container>
      </TabPanel>
      <TabPanel value={value} index={2}>
        Item Three
      </TabPanel>
    </div>
  );
}

