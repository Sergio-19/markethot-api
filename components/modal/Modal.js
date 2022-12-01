import { useContext } from "react"
import AppContext from "../../appContext"
const Modal = () => {

    const {state} = useContext(AppContext)

    const classes = ["modal__wrapper"]
    const cl = ["modal__overlay"]
    if(state.showModal){
        cl.push('modal__overlay-show')
        classes.push('modal__wrapper-show')
    }


    return (
        <>
        <div className={cl.join(' ')}></div>
        <div className={classes.join(' ')}>
            <div className="modal__head">
                <i className="fa fa-times" onClick = {state.hideModalHandler} style = {{cursor: 'pointer'}}/>
            </div>
            <div className="modal__title">
                <h2>Доставка</h2>
            </div>
            <div className="modal__content">
                <div className="modal__content-head">
                    <div className="modal__content-head-item">
                        <div className="modal__content-check" onClick = {()=> state.deliveryCheckHandler(1)}>
                            <i className="fa fa-check" style = {{display: state.deliveryCheck === 1 ? 'block' : 'none'}}/>
                        </div>
                        <span>Доставка в пункт выдачи (бесплатно)</span>
                    </div>
                    <div className="modal__content-head-item">
                        <div className="modal__content-check" onClick = {()=> state.deliveryCheckHandler(2)}>
                            <i className="fa fa-check" style = {{display: state.deliveryCheck === 2 ? 'block' : 'none'}}/>
                        </div>
                        <span>Доставка курьером (платно)</span>
                    </div>
                </div>
                {state.deliveryCheck === 1 ? <><div className="modal__content-search">
                    <div className="modal__content-search-input">
                        <i className="fa fa-search"/>
                        <input type= 'text' 
                               placeholder = 'Ваш город' 
                               defaultValue={state.searchPointsValue}
                               onChange = {(e)=> state.changeInputPoints(e)}
                               />
                        <button onClick={()=> state.getPoints(state.searchPointsValue)}>Поиск</button>
                    </div>
                </div>
                <div style = {{textAlign: 'center', padding: '10px'}}>
                    <p>Выберите пункт выдачи заказов из списка, воспользовавшись поиском</p>
                </div>
                <div className="modal__points">
                    <ul>
                        {Object.keys(state.points).length > 0 ? Object.keys(state.points).map((point, i)=> {
                            return(
                                <li key = {i} onClick = {()=> state.saveAddress(`${state.points[point].city} ${state.points[point].address}`)}>
                                    <span><strong>Адрес:</strong>&nbsp;{state.points[point].city}&nbsp;{state.points[point].address}</span><br/>
                                    <span><strong>Телефон:</strong>&nbsp;{state.points[point].phone}</span><br/>
                                    <span><strong>Время работы:</strong>&nbsp;{state.points[point].chart}</span><br/>
                                </li>
                            )
                        }) : <></>}
                    </ul>

                </div></> : <div className="modal2__content">
                <div style = {{textAlign: 'center', padding: '30px'}}>
                    <p>Введите ваш адрес для курьерской доставки в поле ниже, стоимость доставки будет включена в сумму заказа</p>
                </div>
                <div className="modal2__text"> 
                    <textarea defaultValue={state.searchPointsValue}
                              placeholder = 'Введите адрес (город, улица, дом, квартира, почтовый индекс)' 
                              onChange = {(e)=> state.changeInputPoints(e)} 
                    />
                </div>
                    </div>}

            </div>
            <div className="modal__btn">
                {state.deliveryCheck === 1 ? <></> : <button onClick = {()=> state.saveAddress(state.searchPointsValue)}>Сохранить</button>}
            </div>
        </div>
        </>
        
    )
}


export default Modal