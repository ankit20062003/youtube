import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import { authOptions } from "../../../../../lib/authOptions"

// const handler = NextAuth ({
//   // Configure one or more authentication providers 
//   providers: [
//     // add multiple providers
//     GithubProvider({
//       clientId: 'Ov23ctmwWrtezoQQpzwq',
//       clientSecret: 'af4e63cf745b1db51f68ff702f458b21e9b13c85',
//     }),
//     // ...add more providers here
//   ],
// })

const handler = NextAuth(authOptions)

export {handler as GET, handler  as POST}

// integrate tailwind css
// do something with databases ->upload video probably
// 