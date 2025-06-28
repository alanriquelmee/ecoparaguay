import { users, messages } from "../model/dataModel.js";
import { renderUserList, renderMessageList } from "../view/responseView.js";

// Simula obtener todos los usuarios
export function getAllUsers() {
  return renderUserList(users);
}

// Simula obtener mensajes
export function getAllMessages() {
  return renderMessageList(messages);
}

// Simula registrar un nuevo usuario
export function createUser(newUser) {
  users.push(newUser);
  return `Usuario ${newUser.name} creado correctamente.`;
}
