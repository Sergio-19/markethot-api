import CartItem from "../components/cardItem/CartItem"
import Layout from "../components/layout/Layout"
import { useContext } from "react"
import Loader from '../components/loader/Loader'
import AppContext from "../appContext"
import Modal from "../components/modal/Modal"
import { useRouter } from "next/router"


const Cart = () => {

    const router = useRouter()

    function redirect() {
        setTimeout(()=> {
            router.push('/')
        }, 100)
    }

   


    function inputValidation(valid, touched) {
        const classes = ['input__normal']
        if(valid && touched){ classes.push('input__valid')}
        if(!valid && touched){classes.push('input__invalid')}

        return classes.join(' ')
    }


    const {state} = useContext(AppContext)

    if(Object.keys(state.cart).length === 0){
        redirect()
    }

    const {formcontrolls, formValid} = state.personal

   

    function cartTotal(cart, info) {
        let total = 0
        let keys = Object.keys(cart)

        let arr = []

        keys.forEach((k)=>{
            let x = Object.values(cart[k])
            x.map((item)=>{
                item.headArticle = k
            })
            arr = [...arr, ...x]
        })
        arr.forEach((el)=> {
            total += (Number(info[el.headArticle].kinds[el.article].price) * el.amount)
        })
        return total
    }

    function cartAmount(cart) {
        let amount = 0
        let keys = Object.keys(cart)

        let arr = []

        keys.forEach((k)=>{
            let x = Object.entries(cart[k])
            arr = [...arr, ...x]
        })

        arr.forEach((el)=> {
          amount+=el[1].amount
        })
        return amount
    }

    function cartResult(cart) {
        let amount = 0
        let keys = Object.keys(cart)

        let arr = []

        keys.forEach((k)=>{
            let x = Object.values(cart[k])
            x.map((item)=>{
                item.headArticle = k
            })
            arr = [...arr, ...x]
        })
        return arr
    }

   let cartArray = cartResult(state.cart)





    return (
        <Layout title = 'Hopastore интернет-магазин оптовых продаж бытовых товаров из Турции с доставкой по всей России' 
                description = "Официальный сайт Hopastore в России. Hopastore - это интернет-магазин оптовых продаж бытовых товаров из Турции с доставкой по всей России. Огромный выбор товаров и выгодные цены на электронику и бытовую технику, одежду для детей и взрослых, товары для дома и сада и многое другое в интернет-магазине hopastore.">
            <Modal />
           {Object.keys(state.info).length === 0 ? <Loader /> : 
            <div className="cart__wrap">
            <div className="cart__blocks">
                <div className="cart__blocks-card cart__blocks-good">
                    <div className="cart__blocks-card-title">
                        <h2 id= "cart__block-title">Корзина</h2>
                    </div>
                    {cartArray.map((good, i)=> {
                        return (
                           <CartItem  key = {i}
                                      image = {state.info[good.headArticle].images[0]}  
                                      name = {state.info[good.headArticle].name}
                                      option = {state.info[good.headArticle].kinds[good.article].option}
                                      amount = {good.amount}
                                      price = {state.info[good.headArticle].kinds[good.article].price}
                                      headArticle = {good.headArticle}
                                      article = {good.article}
                                      deleteGood = {state.deleteGood}
                                      goodIncrement = {state.goodIncrement}
                                      goodDecrement = {state.goodDecrement}
                           /> 
                        )
                    })} 
                </div>
                <div className="cart__blocks-card cart__blocks-delivery">
                    <div className="cart__blocks-card-title">
                        <h2>Доставка</h2>
                    </div>
                    <div className="cart__blocks-delivery-content-wrap">
                        <div className="cart__blocks-delivery-content">
                            <div className="cart__blocks-delivery-content-text">
                                <strong>Адрес доставки:</strong>
                                <span>{state.deliveryAddress === '' ? 'Адрес не указан' : state.deliveryAddress}</span>
                                <strong>Способ доставки:</strong>
                                <span>{state.deliveryCheck === 1 ? 'Доставка в пункт выдачи' : "Доставка курьером"}</span>
                            </div>
                            <button onClick = {state.showModalHandler}>Изменить</button>
                        </div>
                    </div>
                </div>
                <div className="cart__blocks-card cart__blocks-personal">
                    <div className="cart__blocks-card-title">
                        <h2>Ваши данные</h2>
                        <p>Уже заказывали у нас? войдите в профиль по e-mail и телефону</p>
                        <button onClick = {()=> router.push('/login')}>Войти</button>
                    </div>
                    <div className="personal__form">
                        <div className="personal__from-item">
                            <label><small>*</small>Телефон</label>
                            <input type = 'number' 
                                   defaultValue={formcontrolls.phone.value}
                                   className = {inputValidation(formcontrolls.phone.valid, formcontrolls.phone.touched)}
                                   onChange = {(event)=> state.changePersonal(event, 'phone')}
                                   />
                        </div>
                        <div className="personal__from-item">
                            <label><small>*</small>E-mail</label>
                            <input type = 'text' 
                                   defaultValue={formcontrolls.email.value} 
                                   className = {inputValidation(formcontrolls.email.valid, formcontrolls.email.touched)}
                                   onChange = {(event)=> state.changePersonal(event, 'email')}
                                   />
                        </div>
                        <div className="personal__from-item">
                            <label><small>*</small>Имя</label>
                            <input type = 'text' 
                                   defaultValue={formcontrolls.name.value} 
                                   className = {inputValidation(formcontrolls.name.valid, formcontrolls.name.touched)}
                                   onChange = {(event)=> state.changePersonal(event, 'name')}
                                   />
                        </div>
                        <div className="personal__from-item">
                            <label>Фамилия</label>
                            <input type = 'text' 
                                   defaultValue={formcontrolls.surname.value} 
                                   onChange = {(event)=> state.changePersonal(event, 'surname')}
                                   className = 'input__normal'
                                   />
                        </div>

                    </div>
                    <div className="cart__blocks-card-title">
                    {formValid && state.deliveryAddress !== "" ? <button onClick = {()=> router.push(`/order/${state.order}`)}>Оформить заказ</button> : <></>}
                    </div>
                </div>
            </div> 
            <div className="cart__order cart__blocks-card">
                    <div className="cart__order-head">
                        <span>Итого:</span>
                        <span id= "cart__order-result" className="cart__order-head-price">{state.deliveryCheck === 2 && state.deliveryAddress !== '' ? cartTotal(state.cart, state.info)+499 : cartTotal(state.cart, state.info)} ₽</span>
                    </div>                                                                              
                    <div className="cart__order-content">
                        <div className="cart__order-content-item">
                            <span id= "cart__order-amount">Товары: {cartAmount(state.cart)} шт.</span>
                            <span id= "cart__order-sum">{cartTotal(state.cart, state.info)} ₽ </span>
                        </div>
                        <div className="cart__order-content-item">
                            <span>Доставка:</span>
                            <span id= "cart__order-delivery">{state.deliveryCheck === 2 &&  state.deliveryAddress !== ''? 499 : 0} ₽</span>
                        </div>
                    </div>
                    <div className="cart__order-option">
                        <span>Адрес:</span>
                        <p>{state.deliveryAddress === '' ? 'Адрес не указан' : state.deliveryAddress}</p>
                    </div>
                    <div className="cart__order-option">
                        <span>Доставка:</span>
                        <p>{state.deliveryAddress !== '' ? 'В течение пяти дней' : ''}</p>
                    </div>
                    <div className="cart__order-option">
                        <span>Оплата:</span>
                        <p>Картой</p>
                    </div>
                    <div className="cart__order-btn">
                        {formValid && state.deliveryAddress !== "" ? <button onClick = {()=> router.push(`/order/${state.order}`)}>Оформить заказ</button> : <></>}
                    </div>
                </div> 
        </div>
           }   
        </Layout>
        
    )
}



export default Cart