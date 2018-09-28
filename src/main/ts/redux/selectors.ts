import { RootState } from "./reducers";
import { CancellerState, initialState } from "./reducers/cancellerState";

export function getCancellerState(state: RootState): CancellerState {
    let result = state.cancellerState;
    if( result == null ) {
        result = initialState;
    }
    return result;
}

export function getCancellerRunning(state: RootState): boolean {
    return getCancellerState(state).running;
}

export function getCancellerError(state: RootState): any {
    return getCancellerState(state).error;
}

export function getCancellerTransitioning(state: RootState): boolean {
    return getCancellerState(state).transitioning;
}

export function getCancellerOutputScale(state: RootState): number {
    return getCancellerState(state).outputScale;
}

export function getCancellerInputScale(state: RootState): number {
    return getCancellerState(state).inputScale;
}

export function getCancellerLatency(state: RootState): number {
    return getCancellerState(state).latencyNanoseconds;
}

export function getCancellerWhiteNoiseScale(state: RootState): number {
    return getCancellerState(state).whiteNoiseScale;
}