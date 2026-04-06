const config = {
  appwriteEndPoint: String(import.meta.env.VITE_END_POINT_URL),
  appwriteProjectId: String(import.meta.env.VITE_PROJECT_ID),
  appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
  appwriteCollectionIdReviews: String(import.meta.env.VITE_COLLECTION_REVIEWS),
  appwriteCollectionIdProfiles: String(import.meta.env.VITE_COLLECTION_PROFILES)
};


export default config;