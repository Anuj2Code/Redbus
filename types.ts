import {server,Member,User} from '@prisma/client'

export type serverWithMemberChannelWithProfile = server & {
 Members: (Member & {User:User})[];
}


// The type serverWithMemberChannelWithProfile is being defined and exported.
// The type extends the base server type with additional information.
// Breaking Down the Structure:
// server & {...}: The type is an extension of the server model. This means it includes all the properties of the server type.

// Members: (Member & { user: User })[];:

// This defines that each server object has a property called Members.
// Members is an array of Member objects.
// Each Member object has an additional property: a user, which is of type User.
// Essentially, this type describes a server that has many Members, and each Member has an associated user (profile).

// Summary:
// serverWithMemberChannelWithProfile is a custom type that represents a server object with an array of Members.
// Each Member object includes a related User (representing their profile).
// This type is useful when you want to fetch or manipulate data that includes not just the server but also its members and their corresponding user profiles in a single query.
// This is likely part of a Prisma query that involves relationships between a server, its Members, and the User associated with each Member.