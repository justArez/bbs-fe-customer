import queryClient from '@/libs/tanstack-query';
import { MantineProvider } from '@mantine/core';
import { QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import Error from '@/components/Error';
import { Toaster } from 'react-hot-toast';



export default function AppProvider({ children }: { children: React.ReactNode }) {
    return (
        <ErrorBoundary fallback={<Error />}>
            <Suspense fallback={<div className="h-screen w-screen"></div>}>
                <MantineProvider>
                    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
                </MantineProvider>
            </Suspense>
            <Toaster
                toastOptions={{
                    className: 'font-semibold text-sm',
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },
                }}
            />
        </ErrorBoundary>
    );
}