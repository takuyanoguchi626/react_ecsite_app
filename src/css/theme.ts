import { createTheme } from "@material-ui/core/styles";

// フォントを設定
const fontFamily = [
  "Noto Sans JP",
  "sans-serif",
  "kaisei",
  // 使用したいフォントを以降に羅列してください
].join(",");
export const theme = createTheme({
  typography: {
    fontFamily: fontFamily,
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
