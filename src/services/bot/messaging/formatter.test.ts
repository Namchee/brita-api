import {
  Message,
  createTextMessage,
  createTextBody,
  createButtonMessage,
  createButtonBody,
  createCarouselMessage,
} from './messages';
import { formatMessages } from './formatter';
import { FlexMessage, Message as LineMessage, TextMessage } from '@line/bot-sdk';

describe('Line message formatter unit test', () => {
  const textMessage: Message = createTextMessage(createTextBody('Text'));
  const buttonsMessage: Message = createButtonMessage([
    createTextBody('Text message'),
    createButtonBody('Label', 'Button message'),
  ]);
  const carouselMessage: Message = createCarouselMessage([
    textMessage.body[0],
    textMessage.body[0],
  ]);
  const pushMessage = [
    textMessage,
    buttonsMessage,
  ];

  it('should return a preformatted line text message', () => {
    const message = formatMessages([textMessage]);

    expect(Array.isArray(message)).toBe(false);
  });

  it('should return a preformatted line buttons flex message', () => {
    const message = formatMessages([buttonsMessage]);

    expect(Array.isArray(message)).toBe(false);
    expect((message as FlexMessage).contents.type).toBe('bubble');
  });

  it('should return a preformatted carousel message', () => {
    const message = formatMessages([carouselMessage]);

    expect(Array.isArray(message)).toBe(false);
    expect((message as FlexMessage).contents.type).toBe('carousel');
  });

  it('should return a preformatted push messages', () => {
    const messages = formatMessages(pushMessage);

    expect(messages).toBeInstanceOf(Array);
  });
});
