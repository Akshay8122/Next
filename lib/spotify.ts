import SpotifywebApi from "spotify-web-api-node";

const scopes =  [
    "user-read-email",
    "user-read-private",
    "playlist-read-private",
    "playlist-read-collaborative",
    "playlist-modify-public",
    "user-read-private",
    "user-library-read",
    "user-top-read",
    "user-library-modify",
    "user-read-playback-state",
    "user-read-currently-playing",
    "user-read-playback-position",
    "user-modify-playback-state",
    "user-read-recently-played",
    "user-follow-read"
].join(',')

const params = {
    scope: scopes,
};

const queryParamString = new URLSearchParams(params);

// const LOGIN_URL = "https://accounts.spotify.com/authorize?" + queryParamString.toString();
const LOGIN_URL = `https://accounts.spotify.com/authorize?${queryParamString.toString()}`;

const spotifyApi = new SpotifywebApi ({
    clientId:process.env.NEXT_PUBLIC_CLIENT_ID,
    clientSecret:process.env.NEXT_PUBLIC_CLIENT_SECRET,
}); 
export default spotifyApi;

export{LOGIN_URL}; 