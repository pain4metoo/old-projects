import { state } from "../../../common/state";

export function isTrueAnswer() {
    return state.warmup.answers.includes(state.warmup.trueAnswer) ? true : false;
}