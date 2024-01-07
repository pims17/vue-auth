import { createApp } from 'vue'
import App from './App.vue'

import router from "./router"
import katexvue3 from "katex-vue3"
import 'katex/dist/katex.min.css';
import * as MathfieldElement from 'mathlive'
import * as ComputeEngine from '@cortex-js/compute-engine'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDz11HmDEH5CzWfkgotM-0qmzjofDif97w",
  authDomain: "math4students-7b229.firebaseapp.com",
  projectId: "math4students-7b229",
  storageBucket: "math4students-7b229.appspot.com",
  messagingSenderId: "150694267804",
  appId: "1:150694267804:web:f1e11f08869694d3635659",
  measurementId: "G-GS7WH5LJE6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

createApp(App).use(router).use(katexvue3, {
  flag: [
    { left: "$", right: "$" },
    { left: "$$", right: "$$" }
  ],
  options: {
    displayMode: false, 
    throwOnError: false, 
    errorColor: "#FF0000" 
  }
}
).use(MathfieldElement).use(ComputeEngine).mount('#app')