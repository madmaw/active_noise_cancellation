import {ActionTypes, NoiseCancellationAction} from "../actions";
import { initialState } from "./cancellerState";

export default function(state = initialState, action: NoiseCancellationAction) {
    switch(action.type) {
        case ActionTypes.StartNoiseCancellationRequest:
            if( !state.running ) {
                return {
                    ...state, 
                    running: true, 
                    transitioning: true, 
                    error: null
                }    
            } else {
                return state;
            }
        case ActionTypes.StartNoiseCancellationSuccess:
            return {
                ...state, 
                transitioning: false
            }
        case ActionTypes.StartNoiseCancellationFailure:
            return {
                ...state, 
                transitioning: false, 
                running: false, 
                error: action.error
            }
        case ActionTypes.StopNoiseCancellation:
            if( state.running ) {
                return {
                    ...state, 
                    running: false, 
                    transitioning: false
                }    
            } else {
                return state;
            }
        case ActionTypes.SetNoiseCancellationInputScale:
            return {
                ...state, 
                inputScale: action.inputScale
            }    
        case ActionTypes.SetNoiseCancellationOutputScale:
            return {
                ...state, 
                outputScale: action.outputScale
            }    
        case ActionTypes.SetNoiseCancellationLatency:
            return {
                ...state, 
                latencyNanoseconds: action.latencyNanoseconds
            }
        case ActionTypes.SetNoiseCancellationWhiteNoiseScale:
            return {
                ...state, 
                whiteNoiseScale: action.whiteNoiseScale
            }
        default: 
            return state;
    }
}