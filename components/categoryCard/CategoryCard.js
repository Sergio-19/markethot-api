import { useRouter } from "next/router"


const CategoryCard = ({title, category, image}) => {
    const router = useRouter()
    return(
        <div className="categorycard__wrap" onClick={()=> router.push(`/categories/${category}`)}>
            <div className="categorycard__title">
                 <p>{title}</p>
             </div>
             <div className="categorycard__img">
                 <img src={image} alt = {title}/>
             </div>
        </div>
   
    )
}

export default CategoryCard