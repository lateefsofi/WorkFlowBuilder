/**
 * Title: Javascript storage.
 * Description: set/get the data to/from the local and session storage
 * Author:    Lateef Sofi
 * Created:   18/11/2018
 * Last Modified: 18/11/2018
 **/

const addToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
}

const getFromLocalStorage = (key) => {
    //Parse the string back to object.
    let data = localStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    } else {
        return data;
    }
}

const removeFromLocalStorage = (key) => {
    localStorage.removeItem(key);
}

const addToSessionStorage = (key, data) => {
    sessionStorage.setItem(key, JSON.stringify(data));
}

const getFromSessionStorage = (key) => {
    //Parse the string back to object.
    let data = sessionStorage.getItem(key);
    if (data) {
        return JSON.parse(data);
    } else {
        return data;
    }
}

const removeFromSessionStorage = (key) => {
    sessionStorage.removeItem(key);
}

export {
  addToLocalStorage,
  getFromLocalStorage,
  removeFromLocalStorage,
  addToSessionStorage,
  getFromSessionStorage,
  removeFromSessionStorage
}
