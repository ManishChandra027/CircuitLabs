import { Client, Databases, ID } from "appwrite";
import config from "../../config/config";

class Service {
  client = new Client();
  database;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndPoint)
      .setProject(config.appwriteProjectId);
    this.database = new Databases(this.client);
  }

  async createContact({ name, phone, email, address }) {
    try {
      const result = await this.databases.createDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionId,
        documentId: ID.unique(),
        data: {
          name,
          email,
          phone,
          address,
        },
      });
      if (result) {
        console.log(result);
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getContact(id) {
    try {
      const result = await this.databases.getDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionId,
        documentId: id,
        queries: [], // optional
      });
      if (result) {
        console.log(result);
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getContacts(id, queries = []) {
    try {
      const result = await this.databases.listDocuments({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionId,

        queries, // optional
      });
      if (result) {
        console.log(result);
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateContact(id, { name, phone, email, address }) {
    try {
      const result = await this.databases.updateDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionId,
        documentId: id,
        data: {
          name,
          email,
          phone,
          address,
        },
      });
      if (result) {
        console.log(result);
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async deleteContact(id) {
    try {
      const result = await this.databases.deleteDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionId,
        documentId: id,
      });

      if (result) {
        console.log(result);
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }
}
