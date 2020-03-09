import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import Client from "./Apollo/Client";
import { ApolloProvider } from "react-apollo-hooks";
import { ApolloClient } from 'apollo-boost';

ReactDOM.render(
    <ApolloProvider client={Client}>
        <App />
    </ApolloProvider>, 
    document.getElementById('root')
);