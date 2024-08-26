import queryClient from "@/libs/tanstack-query";
import { MantineProvider } from "@mantine/core";
import { QueryClientProvider } from "@tanstack/react-query";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import { Error } from "@/components/Error";
import { Toaster } from "react-hot-toast";
import HistoryProvider from "./HistoryProvider";
import theme from "@/theme";
import AuthProvider from "./AuthProvider";
import { ModalsProvider } from "@mantine/modals";
import { domAnimation, LazyMotion } from "framer-motion";

export default function AppProvider({ children }: { children: React.ReactNode }) {
  return (
    <ErrorBoundary fallback={<Error />}>
      <HistoryProvider>
        <Suspense fallback={<div className="h-screen w-screen"></div>}>
          <MantineProvider theme={theme}>
            <Suspense fallback={<div className="h-screen w-screen bg-white"></div>}>
              <LazyMotion features={domAnimation}>
                <QueryClientProvider client={queryClient}>
                  <ModalsProvider>
                    <AuthProvider>{children}</AuthProvider>
                  </ModalsProvider>
                </QueryClientProvider>
              </LazyMotion>
            </Suspense>
          </MantineProvider>
        </Suspense>
      </HistoryProvider>
      <Toaster
        toastOptions={{
          className: "font-semibold text-sm",
        }}
      />
    </ErrorBoundary>
  );
}
