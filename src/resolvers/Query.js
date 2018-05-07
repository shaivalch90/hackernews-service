const people = require('../../index');

function info() { return `This is the API of a hackernews clone` };
function person(root, args) {
    return people.find((person) => person.id == args.id)
};
function persons() { return people };
function feed(root, args, context, info) {
    const where = args.filter ? {
        OR: [{url_contains: args.filter}, {description_contains: args.filter}]
    } : {}
    return context.db.query.links({where}, info)
};

module.exports = {
    info, person, persons, feed
};