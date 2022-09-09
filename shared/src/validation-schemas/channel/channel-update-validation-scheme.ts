import Joi from 'joi';
import { ChannelProfileValidationMessage } from '~/common/enums/enums';
import { ChannelProfileUpdateRequestDto } from '~/common/types/types';

export const channelUpdateValidationSchema = Joi.object<ChannelProfileUpdateRequestDto, true>({
  name: Joi.string()
    .required()
    .trim()
    .min(4)
    .max(100)
    .pattern(/^[a-zA-Z0-9!?%*(),.;|№{} /\\\][]*$/)
    .messages({
      'string.empty': ChannelProfileValidationMessage.CHANNEL_NAME_NOT_EMPTY,
      'string.min': ChannelProfileValidationMessage.CHANNEL_NAME_MIN,
      'string.max': ChannelProfileValidationMessage.CHANNEL_NAME_MAX,
      'string.pattern.base': ChannelProfileValidationMessage.CHANNEL_NAME_WRONG_REGEXP,
    }),
  description: Joi.string()
    .required()
    .trim()
    .min(10)
    .max(500)
    .pattern(/[а-яА-ЯЁёІіЄєЇї]/, { invert: true })
    .messages({
      'string.empty': ChannelProfileValidationMessage.DESCRIPTION_NOT_EMPTY,
      'string.min': ChannelProfileValidationMessage.DESCRIPTION_MIN,
      'string.pattern.invert.base': ChannelProfileValidationMessage.CHANNEL_DESCRIPTION_WRONG_REGEXP,
    }),
});
