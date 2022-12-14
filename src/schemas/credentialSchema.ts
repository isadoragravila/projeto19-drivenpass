import joi from 'joi';
import { ICredentialSchema } from '../types/credentialTypes';

const credentialSchema = joi.object<ICredentialSchema>({
    title: joi.string().required(),
    url: joi.string().uri().required(),
    username: joi.string().required(),
    password: joi.string().required()
  });

  export default credentialSchema;