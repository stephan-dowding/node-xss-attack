import sqlite from 'sqlite';

let db

export const init = async () => {
  db = await sqlite.open(':memory:');

  await db.run("CREATE TABLE comments (datetime TEXT, comment TEXT)");
}

export const addComment = async (comment) => {
  await db.run("INSERT INTO comments (datetime, comment) VALUES (datetime(), ?);", comment);
}

export const getComments = async (comment) => {
  return await db.all("SELECT comment FROM comments ORDER BY datetime ASC;");
}
