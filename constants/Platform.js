import { Platform, Dimension } from "react-native";

export const isAndroid = Platform.OS === "ios" ? false : true;
export const isiOS = Platform.OS === "ios" ? true : false;

export const isIphoneX = () => {
  let d = Dimensions.get("window");
  const { height, width } = d;

  return (
    // This has to be iOS duh
    Platform.OS === "ios" &&
    // Accounting for the height in either orientation
    (height === 812 || width === 812)
  );
};
