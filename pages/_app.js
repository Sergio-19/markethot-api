
import '../styles/app.scss'
import AppContext from '../appContext'
import { useState, useEffect } from 'react'
import axios from "axios"
import generatePassword from '../generatePassword'
import config from '../my.config'



function MyApp({ Component, pageProps }) {

  const [login, setLogin] = useState({formcontrolls: {phone: {value: '', valid: false, touched: false},
                                                      email: {value: '', valid: false, touched: false}
                                                    },
                                                    formValid: false,
                                                    message: ''
                                                  })
  const [token, setToken] = useState('')   
  const [searchInputValue, setSearchInputValue] = useState('')                                             
  const [cart, setCart] = useState({})
  const [info, setInfo] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [searchPointsValue, setSearchPointsValue] = useState('')
  const [points, setPoints] = useState({})
  const [deliveryAddress, setDeliveryAddress] = useState('')
  const [deliveryCheck, setDeliveryCheck] = useState(1)
  const [personal, setPersonal] = useState({formcontrolls: { phone: {value: '', valid: false, touched: false},
                                                             email: {value: '', valid: false, touched: false},
                                                             name: {value: '', valid: false, touched: false},
                                                             surname: {value: '', valid: true}
                                                            },
                                            formValid: false                
                                            })
  const [order, setOrder] = useState('')   
  
//функция очистки корзины после перехода к оплате
function cleanCart() {
  setCart({})
  setInfo([])
  Object.keys(localStorage).forEach((el)=> { 
    if(el !== 'ally-supports-cache' && el !== 'user'){
      localStorage.removeItem(el)
  }
})
}  

//функция получения информации с сервера о товарах в корзине
  async function getCartInfo(cart) {
    const cartKeys = Object.keys(cart)
    const response = await axios.post(`http://localhost:3000/api/cartinfo`, {cart: JSON.stringify(cartKeys)})
    setInfo(response.data.goods)
}

  useEffect(()=> {  
    let obj = {}
    
    Object.keys(localStorage).forEach((el)=> { 
      if(el !== 'ally-supports-cache' && el !== 'user'){
        obj[el] = JSON.parse(localStorage[el])
    }
  })
  if(Object.keys(obj).length > 0){
    getCartInfo(obj)
  }
  setCart(obj)
  getOrder()

  Object.keys(localStorage).forEach((elem)=> {
    if(elem === 'user'){
      getUser(localStorage[elem])
    }
  })

  }, [])

  //функция ввода в инпут для поиска
  function changeSearchInput(e) {
    setSearchInputValue(e.target.value)
  }

  //функция очистки поля поиска
  function cleanInput() {
    console.log('clean')
    setSearchInputValue('')
  }

  //функция получения информации о пользователе
  async function getUser(email){
    const response = await axios.post(`http://localhost:3000/api/getuser`, {email})
    if(response.data.success){
      let personalCopy = {...personal}
      personalCopy.formcontrolls.name.value = response.data.user.name || 'Не указано'
      personalCopy.formcontrolls.phone.value = response.data.user.phone || 'Не указано'
      personalCopy.formcontrolls.email.value = response.data.user.email || 'Не указано'
      personalCopy.formcontrolls.name.touched = true
      personalCopy.formcontrolls.phone.touched = true
      personalCopy.formcontrolls.email.touched = true
      personalCopy.formcontrolls.name.value !== '' && fieldValidator(personalCopy.formcontrolls.name.value, 'name') ? personalCopy.formcontrolls.name.valid = true : false
      personalCopy.formcontrolls.phone.value !== '' && fieldValidator(personalCopy.formcontrolls.phone.value, 'phone') ? personalCopy.formcontrolls.phone.valid = true : false
      personalCopy.formcontrolls.email.value !== '' && fieldValidator(personalCopy.formcontrolls.email.value, 'email') ? personalCopy.formcontrolls.email.valid = true : false
      personalCopy.formcontrolls.name.value !== '' && personalCopy.formcontrolls.phone.value !== '' && personalCopy.formcontrolls.email.value !== '' ? personalCopy.formValid = true : personalCopy.formValid = false
      setPersonal({...personalCopy})
      setDeliveryAddress(response.data.user.address || 'Не указано')
      setToken(response.data.user.email)
    } else {
      console.log(response.data.message)
    }
  }


  //функция добавления товара в корзину
  async function cartStringify(cart) {
    let local = {}
    Object.keys(cart).forEach((el)=> {
        local[el] = JSON.stringify(cart[el])
     }) 
    await addLocaleStorage(local)  
  }

  function addLocaleStorage(cart) {
    Object.keys(cart).forEach((el)=> {
       localStorage[el] = cart[el]
    })
  }
  
  function addGood(headArticle, article, amount) {
    let newCart = {...cart}
    if(newCart[headArticle]){
      newCart[headArticle] = {...cart[headArticle], [article]: {article, amount}} 
      setCart({...newCart})
    } else {
      newCart[headArticle] = {[article]: {article, amount}}
      setCart({...newCart})
    }
    cartStringify(newCart)
    getCartInfo(newCart)   
  }

  //функция удаления товара из корзины

  function deleteGood(headArticle ,article) {
    let cartCopy = {...cart}
    if(Object.keys(cartCopy[headArticle]).length > 1){
      delete cartCopy[headArticle][article]
      setCart({...cartCopy})
      cartStringify(cartCopy)
      getCartInfo(cartCopy)
    } else {
      delete cartCopy[headArticle]
      setCart({...cartCopy})
      localStorage.removeItem([headArticle])
      getCartInfo(cartCopy)
    }
    
  }


  //изменение количества товаров в корзине

  function goodIncrement(headArticle ,article) {
    let cartCopy = {...cart}

    let amount = cartCopy[headArticle][article].amount
    cartCopy[headArticle][article].amount = amount + 1
    setCart({...cartCopy})
    cartStringify(cartCopy)
    getCartInfo(cartCopy)
    
  }

  function goodDecrement(headArticle ,article) {
    let cartCopy = {...cart}
    console.log(headArticle ,article)
    let amount = cartCopy[headArticle][article].amount
    cartCopy[headArticle][article].amount = amount === 1 ? amount : amount - 1
    setCart({...cartCopy})
    cartStringify(cartCopy)
    getCartInfo(cartCopy)
    
  }

  //функция ввода в инпут
  function changeInputPoints(e) {
    setSearchPointsValue(e.target.value)
  }

  //функция запрос для поиска пунктов 

  async function getPoints(query) {
    const search = {search: query}
    const response = await axios.post(`http://localhost:3000/api/searchpoints`, search)
    let arr = response.data.points
    let points = {}
    arr.forEach((point)=>{
      points = {...points, [point.article]: {...point}}
    })
    setPoints(points)
}

//функция сохранения адреса пункта выдачи
function saveAddress(address) {
  setDeliveryAddress(address)
  hideModalHandler()
}


function showModalHandler() {
  setShowModal(true)
}

function hideModalHandler() {
  setShowModal(false)
}

function deliveryCheckHandler(num) {
  setDeliveryCheck(num)
}

//функция для валидации
const validateEmail = (email) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};
function fieldValidator(value, type) {
    switch(type) {
        case 'phone':
          let valid = value.length < 9 ? false : true
          return valid
        case 'email':
          let emailValid = validateEmail(value) ? true : false
          return emailValid
        case 'name':
          let nameValid = value.length < 3 ? false : true
          return nameValid
      default:
        return false
    }
}

//функция общей валидации формы
function allValidation(personalCopy){
  let validator = false
  if(personalCopy.formcontrolls.phone.valid && personalCopy.formcontrolls.email.valid && personalCopy.formcontrolls.name.valid){
    validator = true
  }
  return validator
}

//функция валидации формы на странице login
function loginValidation(copy) {
  let validator = false
  if(copy.formcontrolls.phone.valid && copy.formcontrolls.email.valid){
    validator = true
  }
  return validator
}

//изменение полей ввода персональных данных и валидация

function changePersonal(event, type) {
  let personalCopy = {...personal}
  personalCopy.formcontrolls[type].touched = true
  personalCopy.formcontrolls[type].value = event.target.value
  personalCopy.formcontrolls[type].valid = fieldValidator(event.target.value, type)
  personalCopy.formValid = allValidation(personal)
  setPersonal({...personalCopy})
}

//изменение полей ввода на странице login
function changeLogin(event, type) {
  let loginCopy = {...login}
  loginCopy.formcontrolls[type].touched = true
  loginCopy.formcontrolls[type].value = event.target.value
  loginCopy.formcontrolls[type].valid = fieldValidator(event.target.value, type)
  loginCopy.formValid = loginValidation(login)
  setLogin({...loginCopy})
}

//функция для получения номера заказа

function getOrder() {
  setOrder(generatePassword(10))
}

function clearOrder() {
  setOrder('')
}

//вход в профиль
async function loginHandler(phone, email) {
  const data = {phone, email}
  const response = await axios.post(`http://localhost:3000/api/login`, data)
  if(response.data.success){
    let personalCopy = {...personal}
    personalCopy.formcontrolls.name.value = response.data.user.name || 'Не указано'
    personalCopy.formcontrolls.phone.value = response.data.user.phone || 'Не указано'
    personalCopy.formcontrolls.email.value = response.data.user.email || 'Не указано'
    personalCopy.formcontrolls.name.touched = true
    personalCopy.formcontrolls.phone.touched = true
    personalCopy.formcontrolls.email.touched = true
    personalCopy.formcontrolls.name.value !== '' && fieldValidator(personalCopy.formcontrolls.name.value, 'name') ? personalCopy.formcontrolls.name.valid = true : false
    personalCopy.formcontrolls.phone.value !== '' && fieldValidator(personalCopy.formcontrolls.phone.value, 'phone') ? personalCopy.formcontrolls.phone.valid = true : false
    personalCopy.formcontrolls.email.value !== '' && fieldValidator(personalCopy.formcontrolls.email.value, 'email') ? personalCopy.formcontrolls.email.valid = true : false
    personalCopy.formcontrolls.name.value !== '' && personalCopy.formcontrolls.phone.value !== '' && personalCopy.formcontrolls.email.value !== '' ? personalCopy.formValid = true : personalCopy.formValid = false
    setPersonal({...personalCopy})
    setDeliveryAddress(response.data.user.address || 'Не указано')
    setToken(response.data.user.email)
    localStorage.user = response.data.user.email
  } else {
    let loginCopy = {...login}
    loginCopy.message = response.data.message
    setLogin({...loginCopy})
  }
}


  return (
    <AppContext.Provider value={{
      state: {  cart, //корзина
                addGood,
                info, //информация по товарам в корзине с сервера
                deleteGood,
                goodIncrement,
                goodDecrement,
                searchPointsValue, //поисковый запрос, для адреса пунктов выдачи
                changeInputPoints,
                getPoints,
                points, //пункты выдачи товаров
                deliveryAddress, //адрес доставки
                saveAddress,
                showModal,
                showModalHandler,
                hideModalHandler,
                deliveryCheck,  //если 1 - доставка в пункт выдачи если 2 доствка курьером
                deliveryCheckHandler,
                personal, //данные покупателя 
                changePersonal,
                order, //номер заказа
                getOrder,
                login, //даные login
                changeLogin,
                loginHandler, 
                token,
                searchInputValue,
                changeSearchInput,
                cleanInput,
                cleanCart,
                clearOrder
      }
    }}>
      <Component {...pageProps}/> 
    </AppContext.Provider>
  ) 
}

export default MyApp
