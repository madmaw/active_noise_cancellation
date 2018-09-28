import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../redux/reducers";
import { getCancellerWhiteNoiseScale } from "../redux/selectors";
import {setNoiseCancellationWhiteNoiseScale} from "../redux/actions";

interface NoiseCancellationWhiteNoiseScaleComponentProps {
    whiteNoiseScale: number;
    setNoiseCancellationWhiteNoiseScale?: (whiteNoiseScale: number)=> void
}

function mapStateToProps(state: RootState): NoiseCancellationWhiteNoiseScaleComponentProps {
    return {
        whiteNoiseScale: getCancellerWhiteNoiseScale(state)
    }
}

class NoiseCancellationWhiteNoiseScaleComponent extends React.Component<NoiseCancellationWhiteNoiseScaleComponentProps> {

    onScaleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let whiteNoiseScaleString = e.target.value;
        let whiteNoiseScale = parseFloat(whiteNoiseScaleString);
        if( whiteNoiseScale != null && !Number.isNaN(whiteNoiseScale) ) {
            this.props.setNoiseCancellationWhiteNoiseScale(whiteNoiseScale);
        }
    }

    render() {
        return (
            <div className="row">
                <div className="col-12 col-md-2">White Noise</div> 
                <div className="col-12 col-md-10"><input type="range" min="0" max=".1" value={this.props.whiteNoiseScale} step=".001" onChange={this.onScaleChange}></input>{Math.round(this.props.whiteNoiseScale*100)}%</div>                
            </div>
        );
    }
}


export default connect(
    mapStateToProps, 
    {
        setNoiseCancellationWhiteNoiseScale
    }
)(NoiseCancellationWhiteNoiseScaleComponent);