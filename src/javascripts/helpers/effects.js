import $ from 'jquery';

import logoLight from '../../assets/baratheon-logo-light.svg';
import logoDark from '../../assets/baratheon-logo.svg';

const messageMouseenter = (e) => {
  e.preventDefault();
  const messageContentContainer = $(e.target).closest('.messageContainer').find('.messageContent');
  const messageBtns = $(e.target).closest('.messageContainer').find('#messageBtns');
  if ((messageContentContainer).hasClass('messageContentRight')) {
    $(messageContentContainer).animate({
      right: '+=25px',
    });
    $(messageBtns).animate({
      opacity: '1',
    });
  }
};

const messageMouseleave = (e) => {
  e.preventDefault();
  const messageContentContainer = $(e.target).closest('.messageContainer').find('.messageContent');
  const messageBtns = $(e.target).closest('.messageContainer').find('#messageBtns');
  if ((messageContentContainer).hasClass('messageContentRight')) {
    $(messageContentContainer).animate({
      right: '-25px',
    });
    $(messageBtns).animate({
      opacity: '0',
    });
  }
};

const toggleLogo = () => {
  const currentImg = $('#navImg');
  if (currentImg.is('.light')) {
    $('#navImg').attr('src', logoDark);
    currentImg.addClass('dark');
    currentImg.removeClass('light');
  } else {
    $('#navImg').attr('src', logoLight);
    currentImg.addClass('light');
    currentImg.removeClass('dark');
  }
};

export default { messageMouseenter, messageMouseleave, toggleLogo };
