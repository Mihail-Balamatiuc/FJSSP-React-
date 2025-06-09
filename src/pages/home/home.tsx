import './home.css'
import { useEffect, useState } from 'react';
import axios, { type AxiosResponse } from 'axios';

export default function Home(){

    // State to store the selected file (initially null, will hold a File object)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const [data, setData] = useState<any>(null);                // store fetched data for get request
    const [loading, setLoading] = useState<boolean>(false);
    const [scriptOutput, setScriptOutput] = useState<string>(' ');

    // Runs when the user picks a file fromt the e(event)
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0]; // Get the first file from the input, which is our file
        if (file) {
            if (file.name.endsWith('.txt')) { // Check extension
                setSelectedFile(file);
            }
            else {
                console.error('Please select a .txt file');
                setSelectedFile(null); // Reset if invalid
            }
        }
    };

    
    // Here is the code for sending the request to run python file
    const runPython = async () => {
        if (!selectedFile) {
            console.error('No file selected');
            return;
        }
        
        setLoading(true);

        try {
            // Create a FormData object to package the file for sending(a predefined JavaScript class)
            const formData = new FormData();
            // Append the file to FormData with key 'file' (backend expects this key)
            formData.append('file', selectedFile);

            // Send POST request to the backend with the file
            const response: AxiosResponse<string> = await axios.post('https://localhost:7179/PythonService/start', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data', // Tells backend this is form data with a file
                },
            });

            // Save the response in scriptOutput
            setScriptOutput(response.data);
            console.log('Script output:', response.data);
        } catch (error: any) {
            console.error('Error:', error.message);
            // Reset output on error
            setScriptOutput('');
        } finally {
            setLoading(false);
        }
    };

    // Will run when the scriptOutput changes (it will be set in my case)
    useEffect(() => {
        if(scriptOutput){
            console.log('Script output was updated');
            console.log(scriptOutput);
        }
    }, [scriptOutput]);

    const logOutput = () => {
        console.log(scriptOutput);
    };

    // Will download the schedule file
    const downloadSchedule = async () => {
        try {
            // I can request like this in a simple way but it wouldn't log errors in case the server is down
            //
            //const timestamp = new Date().getTime();
            //window.location.href = `https://localhost:7179/PythonService/getSchedule?t=${timestamp}`;

            const timestamp = new Date().getTime();
            const response = await axios.get(`https://localhost:7179/PythonService/getSchedule?t=${timestamp}`, {
                responseType: 'blob'
            });

            // Create downloadable file from response
            const blob = new Blob([response.data], { type: 'text/plain' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'schedule.txt';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

        } catch (error: any) {
            console.error('Error downloading schedule:', error.message);
        }
    };

    return (
        <>
            <div className='title-container'>
                <h1 className="title">FJSSP Scheduling</h1>
            </div>

            <div className='file-input-wrapper'>
                <div className='input-wrapper'>
                    {/* The real file input, kept in the DOM for accessibility */}
                    <input
                        id="file-upload"
                        type="file"
                        accept='.txt' // Suggests only .txt files, though not enforced
                        className="file-input-native"
                        onChange={handleFileChange}
                    />

                    {/* A <label> tied to the input */}
                    <label htmlFor="file-upload" className="file-input-button">
                        <p>Choose</p>
                    </label>
                    
                    {/* Show the chosen file’s name from state */}
                    <span className="file-input-filename">{selectedFile ? selectedFile.name : 'No file selected'}</span>
                </div>
                <button className='start-button' onClick={runPython} disabled={!selectedFile || loading}>
                    {loading ? 'Wait...' : 'Start'}
                </button>
            </div>

            <button className='download-button' onClick={downloadSchedule}>
                Download
            </button>
        </>
    );
}