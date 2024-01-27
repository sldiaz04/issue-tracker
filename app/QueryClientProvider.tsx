'use client'

import {QueryClient, QueryClientProvider as ReactQuery} from "@tanstack/react-query";
import {PropsWithChildren} from "react";

const queryClient = new QueryClient();

const QueryClientProvider = ({children}: PropsWithChildren) => {
    return (
        <ReactQuery client={queryClient}>
            {children}
        </ReactQuery>
    );
}

export default QueryClientProvider;