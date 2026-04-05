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
    const result = await databases.createDocument({
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
  }
  async createContact({ name, phone, email, address }) {
    const result = await databases.createDocument({
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
  }
}
