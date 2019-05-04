import $ from 'jquery';
import moment from 'moment';

import messagesData from '../../helpers/data/messagesData';
import util from '../../helpers/util';

import './chatBox.scss';

let messages = [];
let messageIterator = 6;

const getLimitedMessageLength = () => {
  const messagesToPrint = [...messages];
  if (messagesToPrint.length > 20) {
    return messagesToPrint.splice(-20, 20);
  }
  return messagesToPrint;
};

const chatBoxBuilder = () => {
  const messagesToPrint = getLimitedMessageLength();
  let domString = [];
  messagesToPrint.forEach((message) => {
    if (message.userId === 'chatBot') {
      domString += `<div id="${message.messageId}" class="messageContainer d-flex flex-column mr-2">`;
      domString += `<p class="messageDate">${message.timeStamp}</p>`;
      domString += '<div class="d-flex flex-row">';
      domString += '<button class="deleteBtn fas fa-times mx-1" data-dismiss="alert" type="button" aria-label="Delete Message"></button>';
      domString += '<button class="editBtn fas fa-pencil-alt mx-1 " type="button" aria-label="Edit Message"></button>';
      domString += '<button class="saveBtn fas fa-save mx-1" style="display: none;" aria-label="Save Message"></button>';
      domString += `<p class="messageContent messageBubbleIn">${message.messageContent}</p>`;
      domString += '</div>';
      domString += '</div>';
    } else {
      domString += `<div id="${message.messageId}" class="messageContainer d-flex flex-column align-items-end text-right ml-2">`;
      domString += `<p class="messageDate">${message.timeStamp}</p>`;
      domString += '<div class="d-flex flex-row">';
      domString += `<p class="messageContent messageBubbleOut">${message.messageContent}</p>`;
      domString += '<button class="saveBtn fas fa-save mx-1" style="display: none;" aria-label="Save Message"></button>';
      domString += '<button class="editBtn fas fa-pencil-alt mx-1" aria-label="Edit Message"></button>';
      domString += '<button class="deleteBtn fas fa-times mx-1" data-dismiss="alert" aria-label="Delete Message"></button>';
      domString += '</div>';
      domString += '</div>';
    }
  });
  util.printToDom('chatBox', domString);
};

const clearMessages = () => {
  messages = [];
  chatBoxBuilder();
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
  if (e.keyCode === 13) {
    const messageContent = e.target.value;
    messageBuilder(messageContent);
    e.target.value = [];
  }
};

const editMessage = (e) => {
  e.preventDefault();
  util.handleEditBtn(e);
};

const updateMessageArray = (messageId, messageContents) => {
  $.each(messages, (i) => {
    if (messageId === messages[i].messageId) {
      messages[i].messageContent = messageContents;
    }
  });
};

const saveMessage = (e) => {
  e.preventDefault();
  const messageId = e.target.parentElement.parentElement.id;
  const messageContents = $(e.target).closest('.messageContainer').find('.messageContent').html();
  util.handleSaveBtn(e);
  updateMessageArray(messageId, messageContents);
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

export default {
  initializeMessages, newMessageEvent, clearMessages, editMessage, saveMessage,
};
