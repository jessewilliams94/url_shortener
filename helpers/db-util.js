import { MongoClient } from "mongodb";

export async function connectDatabase() {
  const client = await MongoClient.connect(
    "mongodb+srv://bum558:benshaman2@cluster0.gza5mjo.mongodb.net/test"
  );

  return client;
}

export async function insertDocument(client, collection, document) {
  const db = client.db();

  const result = await db.collection(collection).insertOne(document);

  return result;
}

export async function getAllUrls(clint, collection, find, sort) {
  const db = client.db();

  const urls = await db.collection(collection).find(find).sort(sort).toArray();

  return urls;
}
