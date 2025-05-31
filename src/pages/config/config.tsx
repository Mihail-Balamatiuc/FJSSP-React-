import './config.css'
import { PythonConfig } from '../../interfaces/pythonConfig'
import { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import Category from '../../components/category/category';
import CategoryInput from '../../components/category-input/category-input';

export default function Config(){
    const [loading, setLoading] = useState<boolean>(false);
    const [saveLoading, setSaveLoading] = useState<boolean>(false);
    const [configData, setConfigData] = useState<PythonConfig | null>(null);
    
    // Get the data when the page si loading
    useEffect(() => {
        const fetchConfig = async () => {
            setLoading(true);
            try {
                const response = await axios.get('https://localhost:7179/pythonService/getConfig');
                setConfigData(response.data as PythonConfig);
            } catch (err: any) {
                console.error('Error fetching data:', err.message);
            } finally {
                setLoading(false);
            }
        };
        
        // Execute it
        fetchConfig();
    }, []); // [] executes only first time when the page is loading
                
    // Will console.log the data once it's loaded
    useEffect(() => {
        console.log(configData);
    }, [configData]);

    // This updates the config based on the input
    const updateConfigValue = (section: keyof PythonConfig, field: string, value: string) => {
        if (configData) {
            setConfigData({
                ...configData,                // Copy entire object
                [section]: {                  // Target specific section
                    ...configData[section],   // Keep other properties in section
                    [field]: value === '' ? null : Number(value)    // We allow null so we can have empty number in the input otherwise will be always 0
                }
            });
        }
    };    

    const handleSave = async () => {
        if(!configData)
            return;

        // Create updated config with nulls replaced by zeros
        const updatedConfig = JSON.parse(JSON.stringify(configData, (key, value) => 
            value === null ? 0 : value
        ));
        
        // Update the state
        setConfigData(updatedConfig);

        setSaveLoading(true);
        try{
            const response: AxiosResponse<string> = await axios.post('https://localhost:7179/pythonService/saveConfig',
                // Send updatedConfig to the backend since the setConfigData is async and can be unupdated yet
                JSON.stringify(updatedConfig, null, 2), // this will make the sent json look in a pretty json fromat and not one line
            { headers: { 'Content-Type': 'application/json' } }
        );
        console.log('Config saved:', response.data);
        } catch (err: any) {
            console.error('Error saving config:', err.message);
        } finally {
            setSaveLoading(false);
        }
    }    

    return (
        <>
            <div className='config-container'>
                {loading ? (
                    <h1 className="title">Loading...</h1>
                ) : (
                    <>
                        <h1 className="title">Config</h1>

                        <Category category_name='Global Settings' />
                        <div className='slector-container'>
                            <CategoryInput 
                                config_name='O-M Ratio'
                                value={configData?.global_configs.operation_machine_ratio}
                                onInputChange={(value) => updateConfigValue('global_configs', 'operation_machine_ratio', value)}
                            />
                        </div>
                        
                        <Category category_name='Simulated Annealing'/>
                        <div className='slector-container'>
                            <CategoryInput 
                                config_name='Initial Temp'
                                value={configData?.simulated_annealing.initial_temperature}
                                onInputChange={(value) => updateConfigValue('simulated_annealing', 'initial_temperature', value)}
                            />
                            <CategoryInput 
                                config_name='Cooling'
                                value={configData?.simulated_annealing.cooling_rate}
                                onInputChange={(value) => updateConfigValue('simulated_annealing', 'cooling_rate', value)}
                            />
                            <CategoryInput 
                                config_name='Min Temp'
                                value={configData?.simulated_annealing.min_temperature}
                                onInputChange={(value) => updateConfigValue('simulated_annealing', 'min_temperature', value)}
                            />
                            <CategoryInput 
                                config_name='Max Iterations'
                                value={configData?.simulated_annealing.max_iterations}
                                onInputChange={(value) => updateConfigValue('simulated_annealing', 'max_iterations', value)}
                            />
                            <CategoryInput 
                                config_name='Restarts'
                                value={configData?.simulated_annealing.restarts}
                                onInputChange={(value) => updateConfigValue('simulated_annealing', 'restarts', value)}
                            />
                        </div>

                        <Category category_name='Hill Climbing'/>
                        <div className='slector-container'>
                            <CategoryInput 
                                config_name='Max Iterations'
                                value={configData?.hill_climbing.max_iterations}
                                onInputChange={(value) => updateConfigValue('hill_climbing', 'max_iterations', value)}
                            />
                            <CategoryInput 
                                config_name='Improvement Tries'
                                value={configData?.hill_climbing.improvement_tries}
                                onInputChange={(value) => updateConfigValue('hill_climbing', 'improvement_tries', value)}
                            />
                            <CategoryInput 
                                config_name='Restarts'
                                value={configData?.hill_climbing.restarts}
                                onInputChange={(value) => updateConfigValue('hill_climbing', 'restarts', value)}
                            />
                            <CategoryInput 
                                config_name='Neighbor Nr'
                                value={configData?.hill_climbing.neighbors_number}
                                onInputChange={(value) => updateConfigValue('hill_climbing', 'neighbors_number', value)}
                            />
                        </div>

                        <Category category_name='Tabu Search'/>
                        <div className='slector-container'>
                            <CategoryInput 
                                config_name='Tabu Tenure'
                                value={configData?.tabu_search.tabu_tenure}
                                onInputChange={(value) => updateConfigValue('tabu_search', 'tabu_tenure', value)}
                            />
                            <CategoryInput 
                                config_name='Max Iterations'
                                value={configData?.tabu_search.max_iterations}
                                onInputChange={(value) => updateConfigValue('tabu_search', 'max_iterations', value)}
                            />
                        </div>

                        <Category category_name='Genetic Algorithm'/>
                        <div className='slector-container'>
                            <CategoryInput 
                                config_name='Population Size'
                                value={configData?.genetic_algorithm.population_size}
                                onInputChange={(value) => updateConfigValue('genetic_algorithm', 'population_size', value)}
                            />
                            <CategoryInput 
                                config_name='Nr Generations'
                                value={configData?.genetic_algorithm.num_generations}
                                onInputChange={(value) => updateConfigValue('genetic_algorithm', 'num_generations', value)}
                            />
                            <CategoryInput 
                                config_name='Crossover Rate'
                                value={configData?.genetic_algorithm.crossover_rate}
                                onInputChange={(value) => updateConfigValue('genetic_algorithm', 'crossover_rate', value)}
                            />
                            <CategoryInput 
                                config_name='Mutation Rate'
                                value={configData?.genetic_algorithm.mutation_rate}
                                onInputChange={(value) => updateConfigValue('genetic_algorithm', 'mutation_rate', value)}
                            />
                            <CategoryInput 
                                config_name='Tournament Size'
                                value={configData?.genetic_algorithm.tournament_size}
                                onInputChange={(value) => updateConfigValue('genetic_algorithm', 'tournament_size', value)}
                            />
                        </div>

                        <Category category_name='Iterated Local Search'/>
                        <div className='slector-container'>
                            <CategoryInput 
                                config_name='Max Iterations'
                                value={configData?.iterated_local_search.max_iterations}
                                onInputChange={(value) => updateConfigValue('iterated_local_search', 'max_iterations', value)}
                            />
                            <CategoryInput 
                                config_name='Perturbation Strength'
                                value={configData?.iterated_local_search.perturbation_strength}
                                onInputChange={(value) => updateConfigValue('iterated_local_search', 'perturbation_strength', value)}
                            />
                            <CategoryInput 
                                config_name='Improvement Tries'
                                value={configData?.iterated_local_search.improvement_tries}
                                onInputChange={(value) => updateConfigValue('iterated_local_search', 'improvement_tries', value)}
                            />
                        </div>

                        <button className='save-button' onClick={handleSave}>
                            {saveLoading ? 'Wait...' : 'Save'}
                        </button>
                    </>
                )}
            </div>
        </>
    );
}
