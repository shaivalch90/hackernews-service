const { Prisma } = require("prisma-binding");
const { GraphQLServer } = require("graphql-yoga");
const Mutation = require("./src/resolvers/Mutation");
const AuthPayload = require("./src/resolvers/AuthPayload");
const Query = require("./src/resolvers/Query");

let people = [
    {id: 1, name:  'John'},
    {id: 2, name:  'Steve'},
    {id: 3, name:  'Tom'},
    {id: 4, name:  'Mark'}
]

const resolvers = {
    Query,
    Mutation,
    AuthPayload
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
            typeDefs: 'src/generated/prisma.graphql',
            endpoint: 'https://eu1.prisma.sh/public-jadecarp-354/hackernews-service/dev',
            secret: 'p@55w0rd123',
            debug: true,
        })
    })
})
module.exports =  {
    people
}
server.start(() => console.log(`Server is running on http://localhost:4000`))