import { Client, Databases, ID, Storage } from "appwrite";
import config from "../../config/config";

class ProfileService {
  client = new Client();
  databases;
  bucket;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndPoint)
      .setProject(config.appwriteProjectId);
    this.databases = new Databases(this.client);
    this.bucket = new Storage(this.client);
  }

  async createProfile({ userId, username, bio, avatarId }) {
    try {
      const result = await this.databases.createDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionIdProfiles,
        documentId: ID.unique(),
        data: {
          avatarId,
          bio,
          userId,
          username,
        },
      });
      if (result) {
        // console.log(result);
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getProfile(id, queries = []) {
    try {
      const result = await this.databases.getDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionIdProfiles,
        documentId: id,
        queries,
      });
      if (result) {
        // console.log(result);
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getProfiles(queries = []) {
    try {
      const result = await this.databases.listDocuments({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionIdProfiles,
        queries, // optional
      });
      if (result) {
        // console.log(result);
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateProfile(id, { bio, avatarId }) {
    try {
      const result = await this.databases.updateDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionIdProfiles,
        documentId: id,
        data: {
          bio,
          avatarId,
        },
      });
      if (result) {
        // console.log(result);
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async uplodeImage(imgFile) {
    try {
      const result = await this.bucket.createFile({
        bucketId: config.appwriteBucketId,
        fileId: ID.unique(),
        file: imgFile,
      });
      // console.log("bucket iamge" + result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  getImage(fileId) {
    try {
      const result = this.bucket.getFileView({
        bucketId: config.appwriteBucketId,
        fileId,
      });
      // console.log("bucket iamge" + result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }

  async delImage(fileId) {
    try {
      const result = await this.bucket.deleteFile({
        bucketId: config.appwriteBucketId,
        fileId,
      });
      // console.log("bucket iamge" + result);
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

const profileService = new ProfileService();
export default profileService;
