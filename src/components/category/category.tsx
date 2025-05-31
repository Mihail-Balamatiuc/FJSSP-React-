import './category.css'

interface CategoryProps {
    category_name: string;
}

export default function Category({category_name} : CategoryProps){
    return (
        <div className='category-div'>
            <h3 className='category'>{category_name}:</h3>
        </div>
    )
}