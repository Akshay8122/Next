import { Session } from 'inspector';
import NextAuth from 'next-auth';
import SpotifyProvider from 'next-auth/providers/spotify';
import spotifyApi, { LOGIN_URL } from '../../../lib/spotify';


async function refreshAccessToken(token:any) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log('RFRESH TOKEN IS', refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.access_token,
      accessTokenExpires: ((Date.now as any) + refreshedToken.expires_in * 1000),
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    }
  } catch (error) {
    console.error(error)

    return {
      ...token,
      error: 'RefreshAccessTokenError',
    }
  }
}

export default NextAuth({
  // Configure one or more authentication providers

  providers: [
    SpotifyProvider({
      clientId:process.env.NEXT_PUBLIC_CLIENT_ID as string,
      clientSecret:process.env.NEXT_PUBLIC_CLIENT_SECRET as string,
      authorization:LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, account, user }) {
      //initial sign in
      if (account && user) {
        return {
          ...token, 
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires:account.expires_at as number * 1000,
        }
      }

      //retuen previous token if the acces token has not expire yet
    
      if ((Date.now() as any) < (token.accessTokenExpires as any)) {
        console.log('EXISTING ACCESS TOKEN IS VALID');
        return token;
      }
      console.log('ACCESS TOKEN HAS EXPIRED, REFRESHING...')
      return await refreshAccessToken(token)
    },

     async session({ session, token }:{session:Session | any, token:any}) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
})
