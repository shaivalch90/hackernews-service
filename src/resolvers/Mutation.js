const people = require("../../index");
const { getUserId, APP_SECRET } = require('../utils');
const jwt = require('jsonwebtoken');
const bycrypt = require('bcryptjs')

function createPerson(root, args) {
    const newPerson = { id: people.length + 1, name: args.name }
    persons.push(newPerson)
    return newPerson;
};

/**
 * Async Function for Signup
 */
async function signup(root, args, context, info) {
    const password = await bycrypt.hash(args.password, 10)

    const user = await context.db.mutation.createUser({
        data: { ...args, password }
    }, `{ id }`)

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user,
    }
}

/**
 * Async function for Login
 */
async function login(root, args, context, info) {
    const user = await context.db.query.user({ where: { email: args.email } }, `{ id password }`)
    if (!user) {
        throw new Error('No such user found')
    }

    const valid = await bycrypt.compare(args.password, user.password)
    if (!valid) {
        throw new Error('Invalid password')
    }

    const token = jwt.sign({ userId: user.id }, APP_SECRET)

    return {
        token,
        user
    }
};

/**
 * Post a link as a user
 */
function post(root, args, context, info) {
    const userId = getUserId(context)
    return context.db.mutation.createLink({
        data: {
            url: args.url,
            description: args.description,
            postedBy: { connect: { id: userId } }
        }
    }, info)

}

module.exports = {
    createPerson,
    signup,
    login,
    post
}