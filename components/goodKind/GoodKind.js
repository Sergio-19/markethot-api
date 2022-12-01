import { useState } from "react";


const GoodKind = ({article, option, price, addGood, headArticle, sum, add}) => {
   

    const [amount, setAmount] = useState(sum)

        
 

    function goodIncrement() {
        setAmount(amount + 1)
    }

    function goodDecrement() {
        if(amount === 1) {
            setAmount(amount)
        } else {
            setAmount(amount - 1)
        }
    }


    return (
        <div className="goodpage__option">
                        <div className="goodpage__options-item goodpage__options-item-circle">
                                <span><i className="fa fa-circle" /></span>
                            </div>
                            <div className="goodpage__options-item goodpage__options-item-article">
                                <small>Артикул</small>
                                <strong>{article}</strong>
                            </div>
                            <div className="goodpage__options-item">
                                {/* <small>Опция</small> */}
                                <strong>{option === 'Пустое поле' ? '' : option}</strong>
                            </div>
                            <div className="goodpage__options-item">
                                <small>Цена</small>
                                <strong>{price} ₽</strong>
                            </div>
                            <div className="goodpage__addcart-wrap">
                            <div className="goodpage__addcart-count">
                                <div className="goodpage__addcart-count-btn" onClick = {goodDecrement}>
                                  <i className="fa fa-minus" style = {{color: add ? '#E9ECEE' : '#626060'}}/>   
                                </div>
                                <span>{sum > 1 ? sum : amount}</span>
                                <div className="goodpage__addcart-count-btn" onClick = {goodIncrement}>
                                  <i className="fa fa-plus" style = {{color: add ? '#E9ECEE' : '#626060'}}/>   
                                </div>
                            </div>
                            <div className="goodpage__addcart-btn">
                                <button onClick = {()=> addGood(headArticle, article, amount)} 
                                        disabled = {add}
                                        style = {{background: add ? '#CE6260' : '#00B863'}}
                                >{add ? 'В корзине' : 'В корзину'}</button>
                            </div>

                        </div>

                        </div>
    )
}

export default GoodKind;