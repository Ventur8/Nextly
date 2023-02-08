import NextAuth from 'next-auth'
import SpótifyProvider from 'next-auth/providers/spotify'
import spotifyApi,{ LOGIN_URL } from '../../../lib/spotify'




async function refreshAccesToken(token) {
    try {
        spotifyApi.setRefreshToken(token.refreshToken);
        spotifyApi.setAccessToken(token.accessToken);

        const {body:refreshedToken} = await spotifyApi.refreshAccessToken();
        console.log("refeshedToken es ",refreshedToken);

        return{
            ...token,
            accessToken: refreshedToken.access_token,
            accesTokenExpires: Date.now() + refreshedToken.expires_in * 1000,

            refreshToken: refreshedToken.refresh_token ?? token.refreshToken
        }
    } catch (error) {
        console.log(error);
        return{
            ...token,
            error:"RefreshTokenError"
        }
    }
}





export default NextAuth({

    // Configure one or more authentication providers
    providers: [
        SpótifyProvider({
            clientId: process.env.SPOTIFY_CLIENT_ID,
            clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
            authorization: LOGIN_URL
        }),
        // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages : {
        signIn: '/login'
    },
    callbacks: {
        async jwt({token,account,user}){
            if(account && user){
             return{
                    ...token,
                    accessToken: account.accessToken,
                    refreshToken: account.refreshToken,
                    username: account.providerAccountId,
                    accesTokenExpires: account.expires_at * 1000
             };
            };
            if(Date.now() < token.accesTokenExpires) {
                console.log('Token no expirado');
                return token;
            };
            console.log('Token expirado');
            //La token expira
            return await refreshAccesToken(token);
        },
       async session({session,token}){
           session.user.accessToken = token.accessToken;
           session.user.refreshToken = token.refreshToken;
           session.user.username = token.username;

            return session;
        }
    }
})