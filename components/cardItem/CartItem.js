import { useRouter } from "next/router"

const CartItem = ({image, name, option, amount, price, headArticle, article, deleteGood, goodIncrement, goodDecrement}) => {
    const router = useRouter()
    return (
        <>
         <div className="cart__blocks-good-item">
    <div className="cart__blocks-good-item-info">
        <div className="cart__blocks-good-item-info-image" onClick={()=> router.push(`/good/${headArticle}`)}>
            <img src= {image} alt= 'name'/>
        </div>
        <div className="cart__blocks-good-item-info-text" onClick={()=> router.push(`/good/${headArticle}`)}>
            <p>{name}</p>
            <span>{option === 'Пустое поле' ? '' : `(${option})`}</span>
        </div>
    </div>
    <div className="cart__blocks-good-item-amount">
        <button  className= 'j-minus' onClick = {()=> goodDecrement(headArticle ,article)}>-</button>
        <div className="cart__blocks-good-item-amount-delete">
            <strong>{amount}</strong>
            <span className="j-delete" onClick = {()=> deleteGood(headArticle ,article)}>Удалить</span>
        </div>
        <button  className='j-plus' onClick = {()=> goodIncrement(headArticle ,article)}>+</button>
    </div>
    <div className="cart__blocks-good-item-price">
        <strong>{price} ₽</strong>
    </div>
</div>
        </>
       
    )
}

export default CartItem