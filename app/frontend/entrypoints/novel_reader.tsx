import React from 'react';
import ReactDOM from 'react-dom/client';
import NovelApp from "../components/NovelApp";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

const apolloClient = new ApolloClient({
    uri: "/graphql",
    cache: new InMemoryCache(),
});

const RootComponent = () => (
    <React.StrictMode>
        <ApolloProvider client={apolloClient}>
            <NovelApp />
        </ApolloProvider>
    </React.StrictMode>
)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<RootComponent />);