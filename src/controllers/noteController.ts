import { Request, Response } from 'express';
import * as noteService from '../services/noteService';
import { INoteSchema } from '../types/noteTypes';

export async function createNote(req: Request, res: Response) {
    const { id } = res.locals.responseJwt;
    const note: INoteSchema = req.body;

    const result = await noteService.createNote({userId: Number(id), ...note});

    return res.status(201).send(result);
}

export async function getNotes(req: Request, res: Response) {
    const { id: userId } = res.locals.responseJwt;

    const result = await noteService.getNotes(Number(userId));

    return res.status(200).send(result);
}

export async function getNoteById(req: Request, res: Response) {
    const { id: userId } = res.locals.responseJwt;
    const { noteId } = req.params;

    const result = await noteService.getNoteById(Number(userId), Number(noteId));

    return res.status(200).send(result);
}

export async function deleteNoteById(req: Request, res: Response) {
    const { id: userId } = res.locals.responseJwt;
    const { noteId } = req.params;

    const result = await noteService.deleteNoteById(Number(userId), Number(noteId));

    return res.status(200).send(result);
}