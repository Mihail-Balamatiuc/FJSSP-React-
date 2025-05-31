import './category-input.css'

interface CategoryInputProps{
    config_name: string;
    value: number | undefined;
    onInputChange: (value: string) => void;
}
//This component has to pe wrappend in the 'selector-container' div
export default function({config_name, value, onInputChange} : CategoryInputProps){
    return(
        <div className='input-container'>
            <h4 className='config-name'>{config_name}:</h4>
            <input 
                className='selector-input' 
                type="number"
                value={value ?? ''}
                onChange={(e) => onInputChange(e.target.value)}
                // This will prevent the user's scroll to change the number
                onWheel={(e) => e.target instanceof HTMLElement && e.target.blur()}
            />
        </div>
    )
}