
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore, CollectionReference } from 'firebase-admin/firestore';
import { config } from 'dotenv';
import { components } from '../lib/components-data';

// Load environment variables from .env file
config();

async function getServiceAccount() {
    const key = process.env.FIREBASE_SERVICE_ACCOUNT_KEY;
    if (!key) {
        throw new Error('FIREBASE_SERVICE_ACCOUNT_KEY environment variable is not set. Please provide it in your .env file. You can generate it from your Firebase project settings.');
    }
    try {
        return JSON.parse(Buffer.from(key, 'base64').toString('utf8'));
    } catch (e) {
        throw new Error('Could not parse FIREBASE_SERVICE_ACCOUNT_KEY. Make sure it is a valid base64 encoded JSON object.');
    }
}

async function seedDatabase() {
  try {
    console.log('Authenticating with Firebase...');
    const serviceAccount = await getServiceAccount();
    const projectId = serviceAccount.project_id;

    initializeApp({
      credential: cert(serviceAccount),
      databaseURL: `https://${projectId}.firebaseio.com`,
    });

    const db = getFirestore();
    console.log('Firebase authenticated successfully.');

    const componentsCollection = db.collection('components') as CollectionReference<typeof components[0]>;

    console.log('Starting to seed components...');

    for (const component of components) {
        const snapshot = await componentsCollection.where('name', '==', component.name).get();
        
        if (snapshot.empty) {
            await componentsCollection.add(component);
            console.log(`  -> Added component: ${component.name}`);
        } else {
            console.log(`  -> Skipping existing component: ${component.name}`);
        }
    }

    console.log('\nSeeding complete! Your database has been populated with initial component data.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

