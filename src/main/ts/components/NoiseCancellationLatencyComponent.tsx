import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../redux/reducers";
import { getCancellerOutputScale, getCancellerLatency } from "../redux/selectors";
import {setNoiseCancellationLatency} from "../redux/actions";
import { MAX_LATENCY_NANOSECONDS } from "../redux/reducers/cancellerState";

interface NoiseCancellationLatencyComponentProps {
    currentLatency: number;
    setNoiseCancellationLatency?: (volume: number)=> void
}

function mapStateToProps(state: RootState): NoiseCancellationLatencyComponentProps {
    return {
        currentLatency: getCancellerLatency(state)
    }
}

class NoiseCancellationLatencyComponent extends React.Component<NoiseCancellationLatencyComponentProps> {

    onLatencyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let latencyString = e.target.value;
        let latency = parseFloat(latencyString);
        if( latency != null && !Number.isNaN(latency) ) {
            this.props.setNoiseCancellationLatency(latency);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-2">Delay</div>
                <div className="col-12 col-md-10">
                    <input type="range" min="0" max={MAX_LATENCY_NANOSECONDS} value={this.props.currentLatency} step="500" onChange={this.onLatencyChange}></input>
                    <input type="number" value={this.props.currentLatency} onChange={this.onLatencyChange}></input>nanoseconds
                </div>
                
            </div>
        );
    }
}


export default connect(
    mapStateToProps, 
    {
        setNoiseCancellationLatency
    }
)(NoiseCancellationLatencyComponent);