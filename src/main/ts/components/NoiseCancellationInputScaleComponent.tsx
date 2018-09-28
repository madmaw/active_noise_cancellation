import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../redux/reducers";
import { getCancellerInputScale } from "../redux/selectors";
import {setNoiseCancellationInputScale} from "../redux/actions";

interface NoiseCancellationInputScaleComponentProps {
    currentVolume: number;
    setNoiseCancellationInputScale?: (volume: number)=> void
}

function mapStateToProps(state: RootState): NoiseCancellationInputScaleComponentProps {
    return {
        currentVolume: getCancellerInputScale(state)
    }
}

class NoiseCancellationInputScaleComponent extends React.Component<NoiseCancellationInputScaleComponentProps> {

    onVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let volumeString = e.target.value;
        let volume = parseFloat(volumeString);
        if( volume != null && !Number.isNaN(volume) ) {
            this.props.setNoiseCancellationInputScale(volume);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-2">Microphone</div> 
                <div className="col-12 col-md-10"><input type="range" min="0" max="4" value={this.props.currentVolume} step=".05" onChange={this.onVolumeChange}></input>{Math.round(this.props.currentVolume*100)}%</div>                
            </div>
        );
    }
}


export default connect(
    mapStateToProps, 
    {
        setNoiseCancellationInputScale
    }
)(NoiseCancellationInputScaleComponent);