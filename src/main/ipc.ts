import { ipcMain } from 'electron';
import Procedures from '../db/Procedures';
import ConnectionService from '../db/service/ConnectionService';

ipcMain.on('ipc-example', async (event, arg) => {
  const msgTemplate = (pingPong: string) => `IPC test: ${pingPong}`;
  console.log(msgTemplate(arg));
  event.reply('ipc-example', msgTemplate('pong'));
});

ipcMain.handle('procedures:listProcedures', () => {
  return new Procedures().getProceduresForDB(['React']);
});

ipcMain.handle('procedures:listDatabases', () => {
  return new Procedures().getDatabases();
});

ipcMain.handle('procedures:getProcedure', async (_event, ...args) => {
  return new Procedures().fetchContent('React', args[0]);
});

ipcMain.handle('connections:fetch', () => {
  return new ConnectionService().fetch();
});

ipcMain.handle('connections:create', (_event, ...args) => {
  return new ConnectionService().create(args[0]);
});

ipcMain.handle('connections:select', (_event, ...args) => {
  return new ConnectionService().select(args[0]);
});

ipcMain.handle('connections:delete', (_event, ...args) => {
  return new ConnectionService().delete(args[0]);
});