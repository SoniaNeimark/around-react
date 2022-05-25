import React from 'react';

export const CurrentFormContext = React.createContext();
class Form {
  constructor(props) {
    this.name = props.name
    this.title = props.title
  }
}

const avatar = new Form({
  name: 'avatar',
  title: 'Change profile picture'
})

const profile = new Form({
  name: 'profile',
  title: 'Edit profile'
})

const add = new Form({
  name: 'add',
  title: 'New place'
})

export const currentForms = {
	avatar: avatar,
  profile: profile,
  add: add
};
