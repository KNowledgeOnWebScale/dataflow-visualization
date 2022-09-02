import useScreenRecording from "use-screen-recording";

const RecordingTest = () => {

    const {isRecording, recording, toggleRecording} = useScreenRecording();

    function download() {
        const a = document.createElement('a')
        a.href = URL.createObjectURL(recording)
        a.download = 'flow-capture'
        a.click()
    }


    return (
        <div>
            <button onClick={toggleRecording}>
                {isRecording ? "Stop" : "Start Recording"}
            </button>

            {!!recording && (
                download()
                //<video autoPlay src={recording && URL.createObjectURL(recording)} />
            )}
        </div>
    );

}

export default RecordingTest;
