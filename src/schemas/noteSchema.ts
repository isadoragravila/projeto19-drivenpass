import joi from 'joi';
import { INoteSchema } from '../types/noteTypes';

const noteSchema = joi.object<INoteSchema>({
    title: joi.string().max(50).required(),
    description: joi.string().max(1000).required()
  });

  export default noteSchema;