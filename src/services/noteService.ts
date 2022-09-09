import { verifyUser } from './authService';
import * as noteRepository from '../repositories/noteRepository';
import { INoteData } from '../types/noteTypes';

export async function createNote(note: INoteData) {
    const { userId, title } = note;
    await verifyUser(userId);
    await verifyTitle(userId, title);

    await noteRepository.insert(note);

    return "Note created";
}

async function verifyTitle (userId: number, title: string) {
    const result = await noteRepository.findByTitleAndUserId(userId, title);
    if (result) throw { code: "conflict_error", message: "This title already exists" };
}

export async function getNotes(userId: number) {
    await verifyUser(userId);

    const notes = await noteRepository.find(userId);

    return notes;
}

export async function getNoteById(userId: number, noteId: number) {
    await verifyUser(userId);

    const note = await verifyNoteAndUserId(userId, noteId);

    return note;
}

export async function deleteNoteById(userId: number, noteId: number) {
    await verifyUser(userId);

    await verifyNoteAndUserId(userId, noteId);
    
    await noteRepository.deleteById(noteId);

    return "Note deleted";
}

async function verifyNoteAndUserId(userId: number, noteId: number) {
    const note = await noteRepository.findById(noteId);

    if(!note) throw { code: "notfound_error", message: "This note doesn't exist" };

    if (note.userId !== userId) throw { code: "unauthorized_error", message: "This note doesn't belong to this user" };

    return note;
}