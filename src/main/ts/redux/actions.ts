import { Action, Dispatch } from "redux";
import { NoiseCanceller } from "../NoiseCanceller";
import { initialState, MAX_LATENCY_NANOSECONDS } from "./reducers/cancellerState";

export enum ActionTypes {
    StartNoiseCancellationRequest, 
    StartNoiseCancellationSuccess, 
    StartNoiseCancellationFailure,
    StopNoiseCancellation, 
    SetNoiseCancellationInputScale, 
    SetNoiseCancellationOutputScale, 
    SetNoiseCancellationLatency, 
    SetNoiseCancellationWhiteNoiseScale
}

export interface StartNoiseCancellationRequestAction extends Action<ActionTypes> {
    type: ActionTypes.StartNoiseCancellationRequest
}

export interface StartNoiseCancellationSuccessAction extends Action<ActionTypes> {
    type: ActionTypes.StartNoiseCancellationSuccess
}

export interface StartNoiseCancellationFailureAction extends Action<ActionTypes> {
    type: ActionTypes.StartNoiseCancellationFailure, 
    error: any
}

export interface StopNoiseCancellationAction extends Action<ActionTypes> {
    type: ActionTypes.StopNoiseCancellation
}

export interface SetNoiseCancellationInputScaleAction extends Action<ActionTypes> {
    type: ActionTypes.SetNoiseCancellationInputScale, 
    inputScale: number
}

export interface SetNoiseCancellationOutputScaleAction extends Action<ActionTypes> {
    type: ActionTypes.SetNoiseCancellationOutputScale, 
    outputScale: number
}

export interface SetNoiseCancellationLatencyAction extends Action<ActionTypes> {
    type: ActionTypes.SetNoiseCancellationLatency, 
    latencyNanoseconds: number
}

export interface SetNoiseCancellationWhiteNoiseScaleAction extends Action<ActionTypes> {
    type: ActionTypes.SetNoiseCancellationWhiteNoiseScale, 
    whiteNoiseScale: number
}

export type NoiseCancellationAction = 
    StopNoiseCancellationAction | 
    StartNoiseCancellationRequestAction | 
    StartNoiseCancellationSuccessAction | 
    StartNoiseCancellationFailureAction | 
    SetNoiseCancellationInputScaleAction |
    SetNoiseCancellationOutputScaleAction |
    SetNoiseCancellationLatencyAction |
    SetNoiseCancellationWhiteNoiseScaleAction;

let audioContext: AudioContext;
//@ts-ignore
if( window["AudioContext"] ) {
    audioContext = new AudioContext();
//@ts-ignore
} else if( window["webkitAudioContext"] ) {
    //@ts-ignore
    audioContext = new window["webkitAudioContext"]();
}
let noiseCanceller = new NoiseCanceller(audioContext, initialState.inputScale, initialState.outputScale, initialState.whiteNoiseScale, initialState.latencyNanoseconds, MAX_LATENCY_NANOSECONDS);
    
export function startNoiseCancellationRequest() {
    return function(dispatch: Dispatch<NoiseCancellationAction>) {
        if( !noiseCanceller.started ) {
            dispatch({
                type: ActionTypes.StartNoiseCancellationRequest
            });
            try {
                noiseCanceller.start(function(error: any) {
                    if( error ) {
                        dispatch({
                            type: ActionTypes.StartNoiseCancellationFailure, 
                            error: error
                        });
                    } else {
                        dispatch({
                            type: ActionTypes.StartNoiseCancellationSuccess                    
                        });
                    }
                })        
            } catch( error ) {
                dispatch({
                    type: ActionTypes.StartNoiseCancellationFailure, 
                    error: error
                });
            }
        }
    }
}

export function stopNoiseCancellation() : StopNoiseCancellationAction {
    if( noiseCanceller.started ) {
        noiseCanceller.stop();
    }
    return {
        type: ActionTypes.StopNoiseCancellation
    }    
}

export function setNoiseCancellationInputScale (volume: number): SetNoiseCancellationInputScaleAction {
    noiseCanceller.setInputScale(volume);
    return {
        type: ActionTypes.SetNoiseCancellationInputScale, 
        inputScale: volume
    }
}

export function setNoiseCancellationOutputScale (volume: number): SetNoiseCancellationOutputScaleAction {
    noiseCanceller.setOutputScale(volume);
    return {
        type: ActionTypes.SetNoiseCancellationOutputScale, 
        outputScale: volume
    }
}

export function setNoiseCancellationLatency(latencyNanoseconds: number): SetNoiseCancellationLatencyAction {
    noiseCanceller.setLatencyNanoseconds(latencyNanoseconds);
    return {
        type: ActionTypes.SetNoiseCancellationLatency, 
        latencyNanoseconds: latencyNanoseconds
    }
}

export function setNoiseCancellationWhiteNoiseScale(whiteNoiseScale: number): SetNoiseCancellationWhiteNoiseScaleAction {
    noiseCanceller.setWhiteNoiseScale(whiteNoiseScale);
    return {
        type: ActionTypes.SetNoiseCancellationWhiteNoiseScale, 
        whiteNoiseScale: whiteNoiseScale
    }
}