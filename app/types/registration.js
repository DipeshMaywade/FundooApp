const { GraphQLObjectType, GraphQLString } = require('graphql')

const userType = new GraphQLObjectType({
    name: "User",
    fields: () => {
        return{
            id: { type: GraphQLString },
            firstName: { type: GraphQLString },
            lastName: { type: GraphQLString },
            email: { type: GraphQLString },
            password: { type: GraphQLString }
        }
    }
});

module.exports = { userType }
