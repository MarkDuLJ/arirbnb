
import { ApolloServer } from 'apollo-server-express';
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
} from 'apollo-server-core';
import express from 'express';
import http from 'http';
import mongo from './services/mongo.js';
import { typeDefs, resolvers } from './types/index.js'
// mongo.start()

async function startApolloServer(typeDefs, resolvers) {
    // Required logic for integrating with Express
    const app = express();
    // Our httpServer handles incoming requests to our Express app.
    // Below, we tell Apollo Server to "drain" this httpServer,
    // enabling our servers to shut down gracefully.
    const httpServer = http.createServer(app);

    // Same ApolloServer initialization as before, plus the drain plugin
    // for our httpServer.
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: true,
        cache: 'bounded',
        plugins: [
            ApolloServerPluginDrainHttpServer({ httpServer }),
            ApolloServerPluginLandingPageLocalDefault({ embed: true }),
        ],
    });

    // More required logic for integrating with Express
    await server.start();
    server.applyMiddleware({
        app,

        // By default, apollo-server hosts its GraphQL endpoint at the
        // server root. However, *other* Apollo Server packages host it at
        // /graphql. Optionally provide this to match apollo-server.
        path: '/igraphql'
    });

    // Modified server startup
    await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}
mongo.start()


startApolloServer(typeDefs, resolvers)