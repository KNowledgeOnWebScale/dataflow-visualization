import {useState} from "react";
import {ScreenCapture} from "react-screen-capture";

// Hiermee selecteer je een deel van je scherm om dat dan te downloaden als png

const RecordingTest2 = () => {

    const [screenCapture, setScreenCapture] = useState("")

    const handleScreenCapture = screenCapture => {
        setScreenCapture(screenCapture);
    };

    const handleSave = () => {
        const screenCaptureSource = screenCapture;
        const downloadLink = document.createElement('a');
        const fileName = 'react-screen-capture.png';

        downloadLink.href = screenCaptureSource;
        downloadLink.download = fileName;
        downloadLink.click();
    };

    return (
        <ScreenCapture onEndCapture={handleScreenCapture}>
            {({onStartCapture}) => (
                <div>
                    <button onClick={onStartCapture}>Capture</button>
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam
                        distinctio exercitationem a tempore delectus ducimus necessitatibus
                        dolor voluptatum aut est quaerat aspernatur, vero quod aperiam odio.
                        Exercitationem distinctio in voluptates?
                    </p>
                    <p>
                        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ut molestiae
                        deserunt voluptas, labore a expedita error eligendi sunt fugit, nesciunt
                        ullam corrupti quas natus, officia rerum? Officia cum amet quidem.
                    </p>
                    <p>
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quaerat, iusto
                        repellat quae quos in rerum sunt obcaecati provident placeat hic saepe
                        possimus eaque repellendus consequuntur quisquam nihil, sit ullam
                        ratione.
                    </p>
                    <center>
                        <img src={screenCapture} alt='react-screen-capture'/>
                        <p>
                            {screenCapture && <button onClick={handleSave}>Download</button>}
                        </p>
                    </center>
                </div>
            )}
        </ScreenCapture>
    );
};

export default RecordingTest2;