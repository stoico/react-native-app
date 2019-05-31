import * as firebase from "firebase";
import { FirebaseSecretAPI } from "../apis/keys";

const firebaseConfig = {
  apiKey: FirebaseSecretAPI,
  authDomain: "native-recommendation-app.firebaseapp.com",
  databaseURL: "https://native-recommendation-app.firebaseio.com",
  projectId: "native-recommendation-app",
  storageBucket: "native-recommendation-app.appspot.com",
  messagingSenderId: "56162003170"
};
let app = firebase.initializeApp(firebaseConfig);

export const database = app.database();
