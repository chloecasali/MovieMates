import { Persistence, ReactNativeAsyncStorage } from "firebase/auth";

// la fonction existe pour le mobile, mais les types publics de firebase l'oublient
declare module "firebase/auth" {
  export function getReactNativePersistence(
    storage: ReactNativeAsyncStorage,
  ): Persistence;
}
