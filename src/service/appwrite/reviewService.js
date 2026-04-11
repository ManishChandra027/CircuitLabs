import { Client, Databases, ID ,Storage} from "appwrite";
import config from "../../config/config";

class ReviewService {
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

  async createReview({ title,description, review, rating=5, imageId,userId ,username}) {
    try {
      const result = await this.databases.createDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionIdReviews,
        documentId: ID.unique(),
        data: {
          slug:ID.unique(),
          title,
          review,
          description,
          rating,
          imageId,
          userId,
          username
        },
      });
      if (result) {
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }
  async getReview(id, queries = []) {
    try {
      const result = await this.databases.getDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionIdReviews,
        documentId: id,
        queries,
      });
      if (result) {
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
        return result;
      }
    } catch (err) {
      console.log(err);
    }
  }

  async updateReview(
    id,
    { title, description, review, rating, imageId },
  ) {
    try {
      const result = await this.databases.updateDocument({
        databaseId: config.appwriteDatabaseId,
        collectionId: config.appwriteCollectionIdReviews,
        documentId: id,
        data: {
          title,
          description,
          review,
          rating,
          imageId,
        },
      });
      if (result) {
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
      return result;
    } catch (err) {
      console.log(err);
    }
  }

   getImage(fileId) {
    try {
      const result= this.bucket.getFileView({
        bucketId: config.appwriteBucketId,
        fileId,
      });
        return result;
    } catch (err) {
      console.log(err);
    }
  }

  async delImage(fileId) {
    try {
      const result = await this.bucket.deleteFile({
        bucketId: config.appwriteBucketId,
        fileId
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

const reviewService = new ReviewService();
export default reviewService;
