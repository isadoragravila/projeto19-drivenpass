import joi from 'joi';
import { ICardSchema } from '../types/cardTypes';

const cardSchema = joi.object<ICardSchema>({
    title: joi.string().required(),
    number: joi.string().required(),
    cardHolderName: joi.string().required(),
    securityCode: joi.string().length(3).required(),
    expirationDate: joi.string().required(),
    password: joi.string().required(),
    isVirtual: joi.boolean().strict().required(),
    type: joi.string().valid('credit', 'debit', 'both').required()
  });

  export default cardSchema;