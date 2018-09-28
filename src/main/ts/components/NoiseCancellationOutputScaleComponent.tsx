import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../redux/reducers";
import { getCancellerOutputScale } from "../redux/selectors";
import {setNoiseCancellationOutputScale} from "../redux/actions";

interface NoiseCancellationOutputScaleComponentProps {
    currentVolume: number;
    setNoiseCancellationOutputScale?: (volume: number)=> void
}

function mapStateToProps(state: RootState): NoiseCancellationOutputScaleComponentProps {
    return {
        currentVolume: getCancellerOutputScale(state)
    }
}

class NoiseCancellationOutputScaleComponent extends React.Component<NoiseCancellationOutputScaleComponentProps> {

    onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let volumeString = e.target.value;
        let volume = parseFloat(volumeString);
        if( volume != null && !Number.isNaN(volume) ) {
            this.props.setNoiseCancellationOutputScale(volume);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-2">Speakers</div> 
                <div className="col-12 col-md-10"><input type="range" min="0" max="4" value={this.props.currentVolume} step=".05" onChange={this.onVolumeChange}></input>{Math.round(this.props.currentVolume*100)}%</div>                
            </div>
        );
    }
}


export default connect(
    mapStateToProps, 
    {
        setNoiseCancellationOutputScale
    }
)(NoiseCancellationOutputScaleComponent);