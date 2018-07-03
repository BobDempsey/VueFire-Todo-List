import { initializeApp } from "firebase";

const app = initializeApp({});

export const db = app.database();
export const namesRef = db.ref("names");
