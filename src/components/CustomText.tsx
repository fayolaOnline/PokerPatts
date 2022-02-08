import React, { FunctionComponent } from "react";
import { Text, StyleSheet, TextStyle } from "react-native";
type CustomTextProps = {
  style?: TextStyle | TextStyle[];
  textType?: "regular" | "bold" | "light";
};

const CustomText: FunctionComponent<CustomTextProps> = ({
  children,
  textStyle,
  style
}) => {
  let textStyle: {};
  switch (textType) {
    case "regular":
      textStyle = styles.regular;
      break;
    case "bold":
      textStyle = styles.bold;
      break;
    case "light":
      textStyle = styles.light;
      break;
    default:
      textStyle = styles.regular;
      break;
  }
  const passedStyles = Array.isArray(style)
    ? Object.assign({}, ...style)
    : style;
  return <Text style={[textStyle, { ...passedStyles }]}>{children}</Text>;
};
const styles = StyleSheet.create({
  regular: {
    fontFamily: "Lato-Regular"
  },
  bold: {
    fontFamily: "Lato-Bold"
  },
  light: {
    fontFamily: "Lato-Light"
  }
});
export default CustomText;
