# GraphQL Tutorial

See [here](https://www.howtographql.com/graphql-js/4-adding-a-database/) for more information on the Tutorial.

## Getting Started

- Install project dependencies:
````
$ npm i
````

- Anything that requires authorization will need a token to be added in HTTP Headers as
````
{
    "Authorization": "Bearer <Token>"
}
````

- Database GraphQL API requires token too

````
prisma token
````
The above command gets the token and it can be added to HTTPS headers as shown above
