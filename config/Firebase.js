import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAzz9zugXLtDjPcD2Fi0UdnU1xClGAfy1g",
  authDomain: "native-recommendation-app.firebaseapp.com",
  databaseURL: "https://native-recommendation-app.firebaseio.com",
  projectId: "native-recommendation-app",
  storageBucket: "native-recommendation-app.appspot.com",
  messagingSenderId: "56162003170"
};
let app = firebase.initializeApp(firebaseConfig);

export const database = app.database();
