const { GraphQLServer } = require('graphql-yoga')

let users = [
    {id: 1, name:  'John'},
    {id: 2, name:  'Steve'},
    {id: 3, name:  'Tom'},
    {id: 4, name:  'Mark'}
]

let links = [
    {id: 'link-0', url: 'www.howtographql.com', description: 'Fullstack tutorial for GraphQL'}
]

const resolvers = {
    Query: {
        info: () => `This is the API of a hackernews clone`,
        user: (root, args) => {
            return users.find((user) => user.id == args.id) 
        },
        users: () => users,
        feed: () => links,
        getLink: (root, args) => {
            links.find((link) => link.id === args.id)
        } 
    },
    Mutation: {
        createUser: (root, args) => {
            const newUser = {id: users.length+1, name: args.name}
            users.push(newUser)
            return newUser;
        },
        post: (root, args) => {
            const newPost = {
                id: `link-${links.length++}`,
                url: args.url,
                description: args.description
            }
            links.push(newPost);
            return newPost;
        },
        updatePost: (root, args) => {
            let foundPost = links.find((link) => link.id === args.id);
            const postIndex = links.findIndex((link) => link.id === args.id);
            foundPost = {...args};
            links[postIndex] = foundPost;
            return foundPost;
        },
        deletePost: (root, args) => {
            const deletedPost = { ...links.find((link) => link.id === args.id) };
            const postIndex = links.findIndex((link)=> link.id===args.id);
            links.splice(postIndex, 1);
            return deletedPost;
        }

    }

}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`))