import joi from 'joi';
import { IUserData } from '../types/authTypes';

const authSchema = joi.object<IUserData>({
    email: joi.string().email().required(),
    password: joi.string().min(10).required(),
  });

  export default authSchema;