import { initializeApp } from "firebase/app";
import firebaseConfig from "./Firebase.config";

const initializeGoogleAuthentication = () => {
    initializeApp(firebaseConfig);
}
export default initializeGoogleAuthentication;