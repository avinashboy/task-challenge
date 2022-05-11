const { initializeApp } = require("firebase/app");
const { getStorage } =  require("firebase/storage");

const {
  APIKEY,
  AUTHDOMAIN,
  PROJECTID,
  STORAGEBUCKET,
  MESSAGINGSENDERID,
  APPID,
} = require("../config");

const firebaseConfig = {
    apiKey: APIKEY,
    authDomain: AUTHDOMAIN,
    projectId: PROJECTID,
    storageBucket: STORAGEBUCKET,
    messagingSenderId: MESSAGINGSENDERID,
    appId: APPID,
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

module.exports = {storage}