import { createTheme, rem } from "@mantine/core";
import { generateColors } from "@mantine/colors-generator";

export const theme = createTheme({
  defaultRadius: "md",
  headings: {
    fontFamily: "Source Sans Pro, Open Sans, sans-serif",
    sizes: {
      h1: { fontSize: rem(34) },
      h2: { fontSize: rem(26) },
      h3: { fontSize: rem(22) },
    },
  },
  fontFamily: "Source Sans Pro, Open Sans, sans-serif",
  fontSizes: {
    xs: rem(12),
    sm: rem(14),
    md: rem(16),
    lg: rem(20),
    xl: rem(24),
  },
  breakpoints: {
    xs: rem(375),
    sm: rem(768),
    md: rem(1024),
    lg: rem(1280),
    xl: rem(1680),
  },
  spacing: {
    xs: rem(4),
    sm: rem(8),
    md: rem(16),
    lg: rem(32),
    xl: rem(64),
  },
  colors: {
    limeGreen: generateColors("#92DF18"),
    magenta: generateColors("#E0246A"),
    blue: generateColors("#2358E0"),
  },
  black: "#08090E",
  primaryColor: "limeGreen",
  primaryShade: 6,
  white: "#EAEAEA",
});
