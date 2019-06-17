import {CHANGE_NATIONALITY} from "../Constants/Settings";

export const changeNationality = (nat) => {
    return {
        type: CHANGE_NATIONALITY,
        payload: nat
    };
};