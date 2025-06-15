import './about.css'

export default function About(){
    return (
        <div className="about-container">
            <div className="about-title-container">
                <h1 className="about-title">About FJSSP Scheduler</h1>
            </div>
            
            <div className="about-content">
                <section className="about-section">
                    <h2 className="about-section-title">What is FJSSP?</h2>
                    <p className="about-text">
                        The Flexible Job Shop Scheduling Problem (FJSSP) is a complex optimization challenge where multiple jobs, 
                        each consisting of several operations, must be scheduled on multiple machines. Each operation can be 
                        performed on any machine from a set of compatible machines, with varying processing times.
                    </p>
                    <p className="about-text">
                        The goal is to find the optimal assignment of operations to machines and their sequence to minimize 
                        the makespan (total completion time) while respecting all constraints.
                    </p>
                </section>
                
                <section className="about-section">
                    <h2 className="about-section-title">Configuration Parameters</h2>
                    
                    <div className="about-param-group">
                        <h3 className="about-param-title">Global Settings</h3>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Operation-Machine Ratio (O-M Ratio)</h4>
                            <p className="about-param-desc">
                                A value between 0 and 1 that controls the balance between operation swaps and machine swaps 
                                during the optimization process:
                            </p>
                            <ul className="about-list">
                                <li><strong>Lower values (closer to 0):</strong> Prioritize machine swaps for operations</li>
                                <li><strong>Higher values (closer to 1):</strong> Prioritize swapping operations while respecting precedence constraints</li>
                            </ul>
                            <p className="about-param-desc">
                                This parameter affects the neighborhood exploration strategy of the metaheuristic algorithms.
                            </p>
                        </div>
                    </div>
                    
                    <div className="about-param-group">
                        <h3 className="about-param-title">Simulated Annealing</h3>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Initial Temperature</h4>
                            <p className="about-param-desc">
                                Controls the initial probability of accepting worse solutions. Higher values allow the algorithm 
                                to explore more diverse solutions at the beginning.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Cooling Rate</h4>
                            <p className="about-param-desc">
                                Determines how quickly the temperature decreases. Values closer to 1 result in slower cooling 
                                and more exploration, while lower values make the algorithm converge faster.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Min Temperature</h4>
                            <p className="about-param-desc">
                                The stopping condition for the cooling process.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Max Iterations</h4>
                            <p className="about-param-desc">
                                Maximum number of iterations.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Restarts</h4>
                            <p className="about-param-desc">
                                Number of times to restart the algorithm with a fresh initial solution. 
                                Higher values improve exploration of the solution space at the cost of computation time.
                            </p>
                        </div>
                    </div>
                    
                    <div className="about-param-group">
                        <h3 className="about-param-title">Hill Climbing</h3>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Max Iterations</h4>
                            <p className="about-param-desc">
                                Maximum number of iterations.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Improvement Tries</h4>
                            <p className="about-param-desc">
                                Number of consecutive non-improving moves allowed before considering a local optimum reached.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Restarts</h4>
                            <p className="about-param-desc">
                                Number of times to restart from a new random solution. Helps escape local optima.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Neighbor Number</h4>
                            <p className="about-param-desc">
                                Number of neighbors to evaluate at each iteration. Higher values improve the chance of finding 
                                better solutions but increase computation time.
                            </p>
                        </div>
                    </div>
                    
                    <div className="about-param-group">
                        <h3 className="about-param-title">Tabu Search</h3>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Tabu Tenure</h4>
                            <p className="about-param-desc">
                                Number of iterations a move remains tabu (forbidden). Controls the algorithm's memory and 
                                prevents cycling between the same solutions.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Max Iterations</h4>
                            <p className="about-param-desc">
                                Maximum number of iterations before terminating the search.
                            </p>
                        </div>
                    </div>
                    
                    <div className="about-param-group">
                        <h3 className="about-param-title">Genetic Algorithm</h3>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Population Size</h4>
                            <p className="about-param-desc">
                                Number of individuals (solutions) in each generation. Larger populations provide more diversity 
                                but require more computation.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Number of Generations</h4>
                            <p className="about-param-desc">
                                Maximum number of evolution cycles before terminating.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Crossover Rate</h4>
                            <p className="about-param-desc">
                                Probability of performing crossover (combining two parent solutions). Higher values promote 
                                exploitation of existing solutions.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Mutation Rate</h4>
                            <p className="about-param-desc">
                                Probability of mutating (randomly changing) a solution. Higher values promote exploration 
                                of new areas in the solution space.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Tournament Size</h4>
                            <p className="about-param-desc">
                                Number of individuals that compete in each selection tournament. Larger tournaments increase 
                                selection pressure toward fitter individuals.
                            </p>
                        </div>
                    </div>
                    
                    <div className="about-param-group">
                        <h3 className="about-param-title">Iterated Local Search</h3>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Max Iterations</h4>
                            <p className="about-param-desc">
                                Maximum number of iterations.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Perturbation Strength</h4>
                            <p className="about-param-desc">
                                Determines how much the current solution is modified during perturbation. Higher values lead to 
                                more significant changes.
                            </p>
                        </div>
                        
                        <div className="about-param">
                            <h4 className="about-param-name">Improvement Tries</h4>
                            <p className="about-param-desc">
                                Number of consecutive non-improving iterations before terminating the local search phase.
                            </p>
                        </div>
                    </div>
                </section>
                
                <section className="about-section">
                    <h2 className="about-section-title">About This Application</h2>
                    <p className="about-text">
                        This application provides a user-friendly interface to solve FJSSP instances using various metaheuristic 
                        algorithms. You can configure algorithm parameters, compare performance, visualize and download
                        results.
                    </p>
                </section>
            </div>
        </div>
    );
}