import { HIDE_ANIMATION, SIGNED_IN, SIGNED_OUT } from "./types";


export const signedIn = (user) => ({
    type: SIGNED_IN,
    payload: user
})

export const signedOut = () => ({
    type: SIGNED_OUT
})

export const hideAnimation = () => ({
    type: HIDE_ANIMATION
})
