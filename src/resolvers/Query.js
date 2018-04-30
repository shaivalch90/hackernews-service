const people = require('../../index');

function info() { return `This is the API of a hackernews clone` };
function person(root, args) {
    return people.find((person) => person.id == args.id)
};
function persons() { return people };
function feed(root, args, context, info) {
    return context.db.query.links({}, info)
};

module.exports = {
    info, person, persons, feed
};