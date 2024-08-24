import { MantineColorsTuple, createTheme } from "@mantine/core";

const brightGreen: MantineColorsTuple = [
  "#effee7",
  "#e0f8d4",
  "#c2efab",
  "#a2e67e",
  "#87de57",
  "#75d940",
  "#6bd731",
  "#59be23",
  "#4da91b",
  "#3d920c"
];

const theme = createTheme({
  primaryColor: 'green',
  colors: { brightGreen },
  primaryShade: 6,
});

export default theme;
