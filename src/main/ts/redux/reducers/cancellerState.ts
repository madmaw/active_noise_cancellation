export interface CancellerState {
    running: boolean;
    transitioning: boolean;
    inputScale: number;
    outputScale: number;
    whiteNoiseScale: number, 
    latencyNanoseconds: number;
    error?: any;
}

export const initialState: CancellerState = {
    running: false, 
    transitioning: false,
    inputScale: 1, // 100%
    outputScale: 1, // 100%
    whiteNoiseScale: 0, // no white noise
    latencyNanoseconds: 0 // no introduced delay
}

export const MAX_LATENCY_NANOSECONDS = 10000000;
