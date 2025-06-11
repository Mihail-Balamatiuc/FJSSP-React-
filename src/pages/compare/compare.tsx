import './compare.css'
import { useEffect, useState } from 'react';
import axios, { type AxiosResponse } from 'axios';
import { Algorithm } from '../../interfaces/Algorithm';

export default function Compare(){

    // State to store the selected file (initially null, will hold a File object)
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [scriptOutput, setScriptOutput] = useState<string>(' ');
    const [algorithmDataLoaded, setAlgorithmDataLoaded] = useState(false);
    const [algorithms, setAlgorithms] = useState<Algorithm[]>([
            { name: 'SA', enabled: false },
            { name: 'HC', enabled: false },
            { name: 'TS', enabled: false },
            { name: 'GA', enabled: false },
            { name: 'ILS', enabled: false }
    ])

    // Get the algorithms when the page is loading
    useEffect(() => {
        // Declaring an async function bc useEffect can't be async
        const fetchAlgorithms = async () => {
            try {
                const response = await axios.get('https://localhost:7179/pythonService/getCompareAlgorithms');
                const enabledAlgoNames: string = response.data;
                //console.log(enabledAlgoNames);
                
                // Update algorithms state based on response
                setAlgorithms(algorithms => 
                    algorithms.map(algo => ({
                        ...algo,
                        enabled: enabledAlgoNames.includes(algo.name)
                    }))
                );

                // Mark the data as loaded
                setAlgorithmDataLoaded(true);
            } catch (err: any) {
                console.error('Error fetching data:', err.message);
            }
        };
        
        // Execute it
        fetchAlgorithms();
    }, []); // [] executes only first time when the page is loading

    // Will save the changes whenever the algorithms change
    useEffect(() => {
        // Only save if the algorithm data is loaded already to prevent
        // saving empty algorithm data
        if(!algorithmDataLoaded) return;

        const saveAlgorithms = async () => {
            try {
                // Get just the names of enabled algorithms
                const enabledAlgorithms = algorithms
                    .filter(algo => algo.enabled)
                    .map(algo => algo.name)
                
                const response: AxiosResponse<string> = await axios.put(
                    'https://localhost:7179/pythonService/saveCompareAlgorithms', 
                    enabledAlgorithms,
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                
                console.log(response.data);
            } catch (err: any) {
                console.error('Error saving the algorithms:', err.message);
            }
        };
        
        saveAlgorithms();
    }, [algorithms]);

    // This function handles checkbox toggling
    const handleAlgorithmToggle = (name: string) => {
        setAlgorithms(algorithms => 
            algorithms.map(algo => 
                algo.name === name ? { ...algo, enabled: !algo.enabled } : algo
            )
        );
    };

    // Runs when the user picks a file fromt the e(event), event is passed automatically by react
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
            const response: AxiosResponse<string> = await axios.put('https://localhost:7179/PythonService/compare', formData, {
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

    // Will download the schedule file
    const downloadSchedule = async () => {
        try {
            console.log("Not functional yet!");
        } catch (error: any) {
            console.error('Error downloading schedule:', error.message);
        }
    };

    return (
        <>
            <div className='title-container'>
                <h1 className="title">Compare Performance</h1>
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

            <div className='checkbox-container'>
                {algorithms.map(algorithm => (
                    <div className='checkbox-item' key={algorithm.name}>
                        <input
                            type="checkbox"
                            id={algorithm.name}
                            className="custom-checkbox"
                            checked={algorithm.enabled}
                            onChange={() => handleAlgorithmToggle(algorithm.name)}
                        />
                        <label htmlFor={algorithm.name}>{algorithm.name}</label>
                    </div>
                ))}
            </div>

            <button className='download-button' onClick={downloadSchedule}>
                Download
            </button>
        </>
    );
}