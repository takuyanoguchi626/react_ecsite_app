import { createTheme } from "@material-ui/core/styles";
import "../index.css";

// フォントを設定
const fontFamily = [
  "Kaisei Decol",
  "Hachi Maru Pop",
  "Yusei Magic",
  "Noto Sans JP",
  "sans-serif",
  // 使用したいフォントを以降に羅列してください
].join(",");

export const theme = createTheme({
  typography: {
    fontFamily: "Kaisei Decol",
    fontWeightLight: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
  },
  palette: {
    primary: {
      main: "#009688",
      contrastText: "#795548",
    },
    background: {
      default: "#FFEBCD",
    },
    text: { primary: "#663300" },
  },
});
