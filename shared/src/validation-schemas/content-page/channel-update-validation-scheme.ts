import Joi from 'joi';
import { VideoValidationMessage } from '~/common/enums/content-page/video-change-validation-message';
import { UpdateVideoInfoDto } from '~/common/types/types';

export const videoUpdateValidationSchema = Joi.object<Omit<UpdateVideoInfoDto, 'videoId'>, true>({
  title: Joi.string()
    .required()
    .trim()
    .min(4)
    .max(100)
    .pattern(/^[a-zA-Z0-9!?%*(),.;'"|№{} /\\\][]*$/)
    .messages({
      'string.empty': VideoValidationMessage.VIDEO_NAME_NOT_EMPTY,
      'string.min': VideoValidationMessage.VIDEO_NAME_MIN,
      'string.max': VideoValidationMessage.VIDEO_NAME_MAX,
      'string.pattern.base': VideoValidationMessage.VIDEO_NAME_WRONG_REGEXP,
    }),
  description: Joi.string()
    .required()
    .trim()
    .min(10)
    .max(5000)
    .pattern(/[а-яА-ЯЁёІіЄєЇї]/, { invert: true })
    .messages({
      'string.empty': VideoValidationMessage.DESCRIPTION_NOT_EMPTY,
      'string.min': VideoValidationMessage.DESCRIPTION_MIN,
      'string.max': VideoValidationMessage.DESCRIPTION_MAX,
      'string.pattern.invert.base': VideoValidationMessage.VIDEO_DESCRIPTION_WRONG_REGEXP,
    }),
});
