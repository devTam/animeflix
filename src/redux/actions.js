import {SIGNED_IN, SIGNED_OUT } from "./types";


export const signedIn = (user) => ({
    type: SIGNED_IN,
    payload: user
})

export const signedOut = () => ({
    type: SIGNED_OUT
})
