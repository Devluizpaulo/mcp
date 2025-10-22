# Firebase Studio

This is a NextJS starter in Firebase Studio.

To get started, take a look at src/app/page.tsx.

## Populating the Database

To use the app's features, you need to populate the Firestore database with component data.
This project includes a seeding script to do this for you.

Run the following command in your terminal:

```bash
npm run db:seed
```

This will add a list of initial hardware components to your Firestore `components` collection, allowing the app's features to work correctly.
