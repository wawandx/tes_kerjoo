import asyncStorage from '@helper/asyncStorage';

let userData = null;

export async function getLogin() {
  if (userData === null) {
    const data = await asyncStorage.getItem('kerjoo_token');
    if (data) {
      userData = data;
    }
  }
  return userData;
}

export async function setLogin(data) {
  await asyncStorage.setItem('kerjoo_token', data);
}

export async function removeLogin() {
  await asyncStorage.removeItem('kerjoo_token');
}
