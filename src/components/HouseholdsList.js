import React, {useState,useEffect, Fragment} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import {ListItem, Button, Divider, ListItemText, Typography} from '@material-ui/core';
import Swal from 'sweetalert2';
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import { fetchSchedule } from '../actions/scheduleActions';
import { connect, useSelector, useDispatch } from 'react-redux';
import SaleView from './SaleView';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
    textTransform: 'uppercase'
  },
  inlinePadding: {
    display: 'inline',
    marginLeft: '3ch'
  },
  margin: {
    margin: theme.spacing(1),
  },
}));

export default function HouseholdsList() {
  const classes = useStyles();

  const[verified, setVerified]=useState(false)
  const dispatch = useDispatch();

  useEffect(() => {

    // this.props.fetchPosts();    
    dispatch(fetchSchedule());
    
    
 }
 , [])

 const schedule = useSelector(state => state.schedule.items)

  const handleClick = () => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Make Sale!'
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Account Debited!',
            'Sale has been made.',
            'success'
          )
        }
      })
  }

  const handleVerification = () => {
    Swal.fire({
        title: 'Enter ticket number',
        input: 'text',
        inputAttributes: {
          autocapitalize: 'off'
        },
        showCancelButton: true,
        confirmButtonText: 'Verify',
        showLoaderOnConfirm: true,
        //for testing purposes enter your github username to test what happens when you fireup this function
        preConfirm: (login) => {
          return fetch(`//api.github.com/users/${login}`)
            .then(response => {
              if (!response.ok) {
                throw new Error(response.statusText)
              }
              return response.json()
            })
            .catch(error => {
              Swal.showValidationMessage(
                `Request failed: ${error}`
              )
            })
        },
        allowOutsideClick: () => !Swal.isLoading()
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Verification Successful!',
            'Ticket No. is valid',
            'success'
          )
        }
      })
  }

  return (
    <List className={classes.root}>
      {schedule.map(s =>
        
        <SaleView
          key={s.id}
         id={s.id}
          address={s.household.address}
          identifier={s.family.identifier}
          members={s.family.number_of_people}
          ticket_number={22/*s.ticket_number*/}
          ward={s.household.ward}
          head={s.family.head}
          phone={s.family.contact}
        
        />
      
      )}

    </List>
  );
}
