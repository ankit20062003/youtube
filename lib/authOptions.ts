import { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {

    providers: [
        // add multiple providers
        GithubProvider({
          clientId: 'Ov23ctmwWrtezoQQpzwq',
          clientSecret: 'af4e63cf745b1db51f68ff702f458b21e9b13c85',
        }),
        // ...add more providers here
      ],
}