import { Platform } from "react-native";

export const isAndroid = Platform.OS === "ios" ? false : true;
export const isiOS = Platform.OS === "ios" ? true : false;
