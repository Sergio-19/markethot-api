import { useRouter } from "next/router";




const GoodCard = ({article, image, title, oldprice, price}) => {
    const router = useRouter()
    return(
        <div className="goodcard">
           <div className="goodcard__head" onClick={()=> router.push(`/good/${article}`)}>
                <div className="goodcard__img">
                    <img src={image} alt = {title}/>
                </div>
                <div className="goodcard__title">
                    <p>{title}</p>
                </div>
           </div>
            <div className="goodcard__price goodcard__oldprice">
                <span>{oldprice ? oldprice + ' ' + '₽' : ''} </span>
            </div>
            <div className="goodcard__btn">
                <div className="goodcard__price">
                <span>{price} ₽</span>
                </div>
                <button onClick={()=> router.push(`/good/${article}`)}>
                    <i className="fa fa-shopping-cart"/>&nbsp;Купить</button>

            </div>

        </div>
    )
}


export default GoodCard;