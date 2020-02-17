import {
  Message as LineMessage,
  TextMessage,
  FlexMessage,
  FlexButton,
  FlexText,
  FlexBubble,
  FlexComponent,
  FlexCarousel,
  FlexContainer,
} from '@line/bot-sdk';
import { Message, ButtonBody, CarouselBody } from './messages';
import { ServerError } from './../../../utils/error';

function generateLineTextMessage(text: string): TextMessage {
  return {
    type: 'text',
    text,
  };
}

function generateTextComponent(text: string): FlexText {
  const textObject = generateLineTextMessage(text);

  return {
    size: 'sm',
    ...textObject,
    wrap: true,
  };
}

function generateButtonComponent(label: string, text: string): FlexButton {
  return {
    type: 'button',
    height: 'sm',
    action: {
      type: 'message',
      text,
      label,
    },
  };
}

function generateBubbleContainer(
  contents: FlexComponent[],
  header?: FlexComponent,
): FlexBubble {
  const bubbleContainer: FlexBubble = {
    type: 'bubble',
    body: {
      type: 'box',
      layout: 'vertical',
      paddingAll: 'none',
      contents,
    },
  };

  if (header) {
    bubbleContainer.header = {
      type: 'box',
      layout: 'vertical',
      paddingAll: 'sm',
      contents: [header],
    };
  }

  return bubbleContainer;
}

function generateCarouselContainer(contents: FlexBubble[]): FlexCarousel {
  return {
    type: 'carousel',
    contents,
  };
}

function generateFlexMessage(contents: FlexContainer): FlexMessage {
  return {
    type: 'flex',
    altText: '\0',
    contents,
  };
}

/**
 * Formats a message to approriate LINE message counterpart
 *
 * @param {Message} message Message to be formatted
 * @return {LineMessage} A preformatted LINE message
 */
function generateLineMessage(
  message: Message,
): LineMessage {
  switch (message.type) {
  case 'basic': {
    if (message.body.length > 1) {
      throw new ServerError('A basic message can only contain 1 body');
    }

    return generateLineTextMessage(message.body[0].text);
  }
  case 'buttons': {
    const messageComponents = message.body.map((content) => {
      if (content.type === 'button') {
        const buttonBody = content as ButtonBody;

        return generateButtonComponent(buttonBody.label, buttonBody.text);
      }

      return generateTextComponent(content.text);
    });

    const boxContainer = generateBubbleContainer(messageComponents);

    return generateFlexMessage(boxContainer);
  }
  case 'carousel': {
    const messages = message.body.map((content) => {
      if (content.type !== 'bubble') {
        throw new ServerError('A carousel can only contain text(s)');
      }

      const carouselBody = content as CarouselBody;

      return generateBubbleContainer(
        [generateTextComponent(carouselBody.text)],
        generateTextComponent(carouselBody.header),
      );
    });

    const carouselContainer = generateCarouselContainer(messages);
    return generateFlexMessage(carouselContainer);
  }
  default:
    throw new ServerError('Illegal message type', 500);
  }
}

/**
 * Formats messages to LINE-compatible message objects
 *
 * @param {Message[]} messages Array of `Message`(s)
 * @return {LineMessage | LineMessage[]} A LINE-compatible message object(s)
 */
export function formatMessages(
  messages: Message[],
): LineMessage | LineMessage[] {
  if (messages.length === 1) {
    return generateLineMessage(messages[0]);
  } else {
    return messages.map(
      message => generateLineMessage(message),
    );
  }
}
