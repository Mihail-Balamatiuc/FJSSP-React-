export interface PythonConfig {
    global_configs: { 
        operation_machine_ratio: number 
    };
    simulated_annealing: {
        initial_temperature: number;
        cooling_rate: number;
        min_temperature: number;
        max_iterations: number;
        restarts: number;
    };
    hill_climbing: {
        max_iterations: number;
        improvement_tries: number;
        restarts: number;
        neighbors_number: number;
    };
    tabu_search: { 
        tabu_tenure: number; 
        max_iterations: number 
    };
    genetic_algorithm: {
        population_size: number;
        num_generations: number;
        crossover_rate: number;
        mutation_rate: number;
        tournament_size: number;
    };
    iterated_local_search: {
        max_iterations: number;
        perturbation_strength: number;
        improvement_tries: number;
    };
}