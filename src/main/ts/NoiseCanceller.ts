export class NoiseCanceller {

    
    private volumeNode: GainNode;
    private stream: MediaStream;
    private streamNode: MediaStreamAudioSourceNode;
    public started: boolean;
    

    constructor(
        private audioContext: AudioContext, 
        private inputScale: number,
        private outputScale: number, 
        private whiteNoiseScale: number, 
        private latencyNanoseconds: number, 
        private maxLatencyNanoseconds: number) {

    }

    public setOutputScale(outputScale: number) {
        this.outputScale = outputScale;
        if( this.volumeNode != null ) {
            this.volumeNode.gain.value = outputScale;
        }
    }

    public setInputScale(inputScale: number) {
        this.inputScale = inputScale;
    }

    public setLatencyNanoseconds(latencyNanoseconds: number) {
        this.latencyNanoseconds = latencyNanoseconds;
    }

    public setWhiteNoiseScale(whiteNoiseScale: number) {
        this.whiteNoiseScale = whiteNoiseScale;
    }

    public start(onComplete?: (error?: any) => void) {

        let requestedSampleRate = this.audioContext.sampleRate || 44100;
        let successCallback = (stream: MediaStream) => {
            this.started = true;
            this.stream = stream;

            
            
            this.streamNode = this.audioContext.createMediaStreamSource(stream);
            this.volumeNode = this.audioContext.createGain();
            this.volumeNode.gain.value = this.outputScale;

            let sampleRate = stream.getTracks()[0].getSettings().sampleRate;
            if( !sampleRate ) {
                sampleRate = requestedSampleRate;
            }            

            let length = Math.round(this.maxLatencyNanoseconds * sampleRate / 1000000000)+1;
            let dataBuffers = [new Float32Array(length)];
            let indices = [0];
            
            let processorNode = this.audioContext.createScriptProcessor(1024, 1, 1);
            processorNode.onaudioprocess = (ev: AudioProcessingEvent) => {
                let inputBuffer = ev.inputBuffer;
                let outputBuffer = ev.outputBuffer;
                let sampleSize = Math.round(this.latencyNanoseconds * sampleRate / 1000000000);
                
                for( let channel=0; channel<outputBuffer.numberOfChannels; channel++ ) {

                    

                    let inputData = inputBuffer.getChannelData(channel);
                    let toIndex = indices[channel];
                    let fromIndex = toIndex - sampleSize;
                    while( fromIndex < 0 ) {
                        fromIndex += length;
                    }
                    let dataBuffer = dataBuffers[channel];
                    let outputData = outputBuffer.getChannelData(channel);
                    for( let sample = 0; sample < inputBuffer.length; sample++ ) {
                        // reverse 
                        dataBuffer[toIndex] = inputData[sample];
                        outputData[sample] = -dataBuffer[fromIndex] * this.inputScale + (Math.random() - .5) * 2 * this.whiteNoiseScale;
                        fromIndex = (fromIndex + 1)%length;
                        toIndex = (toIndex+1)%length;
                    }
                    indices[channel] = toIndex;
                }
            }

            this.streamNode.connect(processorNode);
            processorNode.connect(this.volumeNode);
            this.volumeNode.connect(this.audioContext.destination);
            if( onComplete ) {
                onComplete();
            }
        };
        let failureCallback = (e: any) => {
            if( onComplete ) {
                onComplete(e);
            }
        };
        let config: MediaStreamConstraints = {
            audio: {
                sampleRate: requestedSampleRate                
            } 
        };
        if( navigator.mediaDevices && navigator.mediaDevices.getUserMedia ) {
            navigator.mediaDevices.getUserMedia(config).then( successCallback).catch(failureCallback);
        } else {
            if( !navigator.getUserMedia ) {
                //@ts-ignore
                navigator.getUserMedia = navigator['webkitGetUserMedia'] || navigator['mozGetUserMedia'];
            }
            if( navigator.getUserMedia ) {
                navigator.getUserMedia(config, successCallback, failureCallback);
            }
        }
    }

    public stop() {
        if( this.stream != null ) {
            if( this.stream.stop != null) {
                this.stream.stop();
            }
            let tracks = this.stream.getTracks();
            if( tracks != null && tracks.length > 0 ) {
                for( let track of tracks ) {
                    if( track.stop != null ) {
                        track.stop();
                    }
                }
            }
        }
        if( this.streamNode != null ) {
            this.streamNode.disconnect();
        }
        if( this.volumeNode != null ) {
            this.volumeNode.disconnect();
        }
        this.started = false;
    }

}