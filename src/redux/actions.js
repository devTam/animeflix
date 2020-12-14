import { SIGNED_IN } from "./types";


export const signedIn = (user) => ({
    type: SIGNED_IN,
    payload: user
})
