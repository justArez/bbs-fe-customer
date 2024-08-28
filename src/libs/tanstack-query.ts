import { DefaultOptions } from "@tanstack/query-core";
import { QueryClient } from "@tanstack/react-query";

const queryConfig: DefaultOptions = {
  queries: {
    refetchOnWindowFocus: false,
    placeholderData: (prevData: any) => prevData,
  },
};

const queryClient = new QueryClient({ defaultOptions: queryConfig });

export default queryClient;
