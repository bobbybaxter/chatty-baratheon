import '../styles/main.scss';
import 'bootstrap';
import $ from 'jquery';

import eventListeners from './components/eventListeners';
import initialize from './firebaseInitialize';
import getData from './firebaseGet';
import user from './firebaseUser';

import logoLight from '../assets/baratheon-logo-light.svg';

$('#navImg').attr('src', logoLight);


const init = () => {
  initialize.firebaseInitialize();
  getData.firebaseGetMessages();
  // getData.getPageLoad();
  user.showModal();
  eventListeners.eventListeners();
};

init();
