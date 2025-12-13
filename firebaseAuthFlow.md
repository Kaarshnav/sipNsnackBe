1.  Go to Firebase Console → Project Settings → Service Accounts → Generate new private key → download JSON.
2.  Install Firebase Admin SDK:
    npm install firebase-admin
3.  Initialize Firebase in backend:

            // src/services/firebaseAdmin.ts
            import admin from "firebase-admin";
            import serviceAccount from "../../firebase-service.json";

            admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            });

            export default admin;
            //

    // tried a lot of things with firebase and amazon SNS ( simple notification service ), both are not wokring as firebase is more FE centric so don't want to use, in AWS SNS , some issues seems to be there in IAM and all
    // using 2factor and other service provider doesn't seems to be industry standart
    // hence shifting to nodemailer
