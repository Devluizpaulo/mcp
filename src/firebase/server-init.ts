
'use server';

import { initializeApp, getApp, getApps, type AppOptions } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';

// These are automatically set by App Hosting.
const projectId = process.env.GCLOUD_PROJECT;
const databaseURL = `${projectId}.firebaseio.com`;

const serverConfig: AppOptions = {
  projectId,
  databaseURL,
  // Credential is not needed in App Hosting environment
};

export async function initializeServerFirebase() {
  if (!getApps().length) {
    initializeApp(serverConfig);
  }
  return {
    auth: getAuth(),
    firestore: getFirestore(),
  };
}
