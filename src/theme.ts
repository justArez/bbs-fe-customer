import { MantineColorsTuple, createTheme } from "@mantine/core";

const lightBlueColor: MantineColorsTuple = [
    "#e0fbff",
    "#cbf2ff",
    "#9ae2ff",
    "#64d2ff",
    "#3cc5fe",
    "#23bcfe",
    "#09b8ff",
    "#00a1e4",
    "#0090cd",
    "#007cb5"
];


const theme = createTheme({
    colors: { lightBlueColor },
    primaryShade: 6,
});

export default theme;