import moment from 'moment';

import messagesData from '../../helpers/data/messagesData';
import util from '../../helpers/util';

import './chatBox.scss';

let messages = [];
let messageIterator = 6;

const chatBoxBuilder = () => {
  let domString = [];
  messages.forEach((message) => {
    if (message.userId === 'chatBot') {
      domString += `<div id="${message.messageId}" class="d-flex flex-column mr-2">`;
      domString += `<p class="messageDate">${message.timeStamp}</p>`;
      domString += '<div class="d-flex flex-row">';
      domString += '<button type="button" class="close mx-2" data-dismiss="alert" aria-label="DeleteMessage">';
      domString += '<span aria-hidden="true">&times;</span>';
      domString += '</button>';
      domString += `<p class="message messageBubbleIn">${message.messageContent}</p>`;
      domString += '</div>';
      domString += '</div>';
    } else {
      domString += `<div id="${message.messageId}" class="d-flex flex-column align-items-end text-right ml-2">`;
      domString += `<p class="messageDate">${message.timeStamp}</p>`;
      domString += '<div class="d-flex flex-row">';
      domString += `<p class="message messageBubbleOut">${message.messageContent}</p>`;
      domString += '<button type="button" class="close mx-2" data-dismiss="alert" aria-label="Delete Message">';
      domString += '<span aria-hidden="true">&times;</span>';
      domString += '</button>';
      domString += '</div>';
      domString += '</div>';
    }
  });
  util.printToDom('chatBox', domString);
};

const messageBuilder = (messageToPrint) => {
  const newMessage = {
    messageId: `message${messageIterator}`,
    userId: 'user1',
    name: 'me',
    timeStamp: moment().format('MMMM D, YYYY h:mm A'),
    messageContent: String(messageToPrint),
  };
  messages.push(newMessage);
  messageIterator += 1;
  chatBoxBuilder();
};

const newMessageEvent = (e) => {
  e.preventDefault();
  console.error('event', e);
  if (e.keyCode === 13) {
    const messageContent = e.target.value;
    messageBuilder(messageContent);
  }
};

const initializeMessages = () => {
  messagesData.getMessagesData()
    .then((resp) => {
      const messageResults = resp.data.messages;
      messages = messageResults;
      chatBoxBuilder();
    })
    .catch(err => console.error(err));
};

export default { initializeMessages, newMessageEvent };
