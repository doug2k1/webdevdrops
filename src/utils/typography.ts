import Typography from "typography"
import { themeColor } from "../styles/vars"

const typography = new Typography({
  googleFonts: [
    {
      name: "Fira Sans",
      styles: ["700"],
    },
    {
      name: "Open Sans",
      styles: ["400", "600"],
    },
  ],
  bodyColor: "#333",
  scaleRatio: 2.75,
  baseLineHeight: 1.6,
  baseFontSize: "16px",
  headerFontFamily: ["Fira Sans", "sans-serif"],
  headerWeight: "700",
  bodyFontFamily: ["Open Sans", "sans-serif"],
  bodyWeight: "400",
  boldWeight: "600",
  overrideStyles: ({ adjustFontSizeTo, rhythm }, options, styles) => ({
    h2: {
      fontSize: "30px",
      margin: "60px 0 30px",
    },
    h3: {
      fontSize: "24px",
      margin: "60px 0 30px",
    },
    a: {
      color: themeColor,
      fontWeight: "600",
      textDecoration: "none",
    },
    "a:hover": {
      color: "#000",
    },
  }),
})

// Hot reload typography in development.
if (process.env.NODE_ENV !== `production`) {
  typography.injectStyles()
}

export default typography
export const rhythm = typography.rhythm
export const scale = typography.scale
