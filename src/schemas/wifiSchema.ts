import joi from 'joi';
import { IWifiSchema } from '../types/wifiTypes';

const wifiSchema = joi.object<IWifiSchema>({
    title: joi.string().required(),
    networkName: joi.string().required(),
    password: joi.string().required()
  });

  export default wifiSchema;