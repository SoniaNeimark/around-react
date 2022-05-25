import React from 'react';

export const CurrentInputContext = React.createContext();

class Input {
  constructor(props) {
    this.key = props.name
    this.type = props.type
    this.name = props.name
    this.placeholder = props.placeholder
    this.minLength = props.minLength
    this.maxLength = props.maxLength
  }
}

const avatar = new Input({
    type: 'url',
    name: 'avatarUrl',
    placeholder: 'Image link'
  })

const profileName = new Input({
  type: 'text',
  name: 'name',
  placeholder: 'Name',
  minLength: '2',
  maxLength: '40'
})

const profileAbout = new Input({
  type: 'text',
  name: 'about',
  placeholder: 'About me',
  minLength: '2',
  maxLength: '200'
})

const addTitle = new Input({
  type: 'text',
  name: 'title',
  placeholder: 'Title',
  minLength: '2',
  maxLength: '30'
})

const addUrl = new Input({
  type: 'url',
  name: 'url',
  placeholder: 'Image link',
})

export const currentInputs = {
  avatar: avatar,
  profileName: profileName,
  profileAbout: profileAbout,
  addTitle: addTitle,
  addUrl: addUrl
};
