import {atom} from "recoil"

export const currenTrackIdState = atom({
    key:"currentTrsckIdState",
    default:null,
});


export const isPlayingState = atom({
   key:"isPlayingState",
   default:false,
});