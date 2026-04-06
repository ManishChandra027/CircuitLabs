import { Client, Databases, ID } from "appwrite";
import config from "../../config/config";

class ReviewService {
  client = new Client();
  Databases;

  constructor() {
    this.client
      .setEndpoint(config.appwriteEndPoint)
      .setProject(config.appwriteProjectId);
    this.Databases = new Databases(this.client);
  }

  async createReview({ title, slug, description, review, rating, imageId }) {
    try {
      const result = await this.databases.createDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionIdReviews,
        documentId: ID.unique(),
        data: {
          slug,
          title,
          review,
          description,
          rating,
          imageId
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
  async getReview(id,queries=[]) {
    try {
      const result = await this.databases.getDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionIdReviews,
        documentId: id,
        queries
      });
      if (result) {
        console.log(result);
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getReviews(queries = []) {
    try {
      const result = await this.databases.listDocuments({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionIdReviews,
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

  async updateReview(id, {title, slug,description, review, rating,imageId }) {
    try {
      const result = await this.databases.updateDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionIdReviews,
        documentId: id,
        data: {
          title,
          slug,
          description,
          review,
          rating,
          imageId
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

  async deleteReview(id) {
    try {
      const result = await this.databases.deleteDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionIdReviews,
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

const reviewService = new ReviewService();
export default reviewService;
