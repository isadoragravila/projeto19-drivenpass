import { Request, Response } from 'express';
import * as wifiService from '../services/wifiService';
import { IWifiSchema } from '../types/wifiTypes';

export async function createWifi(req: Request, res: Response) {
    const { id } = res.locals.responseJwt;
    const wifi: IWifiSchema = req.body;

    const result = await wifiService.createWifi({userId: Number(id), ...wifi});

    return res.status(201).send(result);
}

export async function getWifis(req: Request, res: Response) {
    const { id: userId } = res.locals.responseJwt;

    const result = await wifiService.getWifis(Number(userId));

    return res.status(200).send(result);
}

export async function getWifiById(req: Request, res: Response) {
    const { id: userId } = res.locals.responseJwt;
    const { wifiId } = req.params;

    const result = await wifiService.getWifiById(Number(userId), Number(wifiId));

    return res.status(200).send(result);
}

export async function deleteWifiById(req: Request, res: Response) {
    const { id: userId } = res.locals.responseJwt;
    const { wifiId } = req.params;

    const result = await wifiService.deleteWifiById(Number(userId), Number(wifiId));

    return res.status(200).send(result);
}