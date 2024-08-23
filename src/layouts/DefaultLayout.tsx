import { Outlet } from "react-router";
import Header from "./components/Header";
import { AppShell } from "@mantine/core";

export function DefaultLayout() {
  return (
    <AppShell header={{ height: 80 }} padding={"md"} navbar={{ width: 320, breakpoint: "sm" }}>
      <AppShell.Header>
        <Header />
      </AppShell.Header>
      <Outlet />
    </AppShell>
  );
}
