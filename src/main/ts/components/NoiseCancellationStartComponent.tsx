import * as React from "react";
import { connect } from "react-redux";
import {startNoiseCancellationRequest, stopNoiseCancellation} from "../redux/actions";
import { RootState } from "../redux/reducers";
import { getCancellerRunning, getCancellerTransitioning, getCancellerError } from "../redux/selectors";

interface NoiseCancellationStartComponentProps {
    running: boolean,
    transitioning: boolean,
    error?: string,
    startNoiseCancellation?: ()=>void, 
    stopNoiseCancellation?: ()=>void
}

function mapStateToProps(state: RootState): NoiseCancellationStartComponentProps {
    let running = getCancellerRunning(state);
    let transitioning = getCancellerTransitioning(state);
    let error = getCancellerError(state);
    return {
        running,
        transitioning, 
        error
    }
}

class NoiseCancellationStartComponent extends React.Component<NoiseCancellationStartComponentProps> {

    toggleNoiseCancellation = () => {
        if( !this.props.transitioning ) {
            if( this.props.running ) {
                this.props.stopNoiseCancellation();
            } else {
                this.props.startNoiseCancellation();
            }    
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12">
                    <button className="btn btn-primary" disabled={this.props.transitioning} onClick={this.toggleNoiseCancellation}>{this.props.running?"Stop":"Start"}</button>
                    {this.props.error?""+this.props.error:""}
                </div>
            </div>
        );
    }
}

export default connect(
    mapStateToProps, 
    {
        startNoiseCancellation: startNoiseCancellationRequest, 
        stopNoiseCancellation
    }
)(NoiseCancellationStartComponent);