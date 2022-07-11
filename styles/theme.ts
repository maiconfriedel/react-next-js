import { extendTheme } from "@chakra-ui/react";
import { mode, StyleFunctionProps } from "@chakra-ui/theme-tools";

const colors = {
  gray: {
    700: "#333",
    800: "#121214",
  },
  red: {
    200: "#C53030",
    300: "#F56565",
  },
};

const styles = {
  global: (props: StyleFunctionProps) => ({
    body: {
      bg: mode("gray.100", "gray.800")(props),
    },
  }),
};

export const theme = extendTheme({ colors, styles });
