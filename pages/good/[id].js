import { useRouter } from "next/router";
import { useState } from "react";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import Galery from "../../components/galery/Galery";
import GoodKind from "../../components/goodKind/GoodKind";
import AppContext from "../../appContext";
import { useContext } from "react";
import config from "../../my.config";

const Good = ({good}) => {
    const {state} = useContext(AppContext)
    const {query} = useRouter()
    const [count, setCount] = useState(0)
    const [overlay, setOverlay] = useState(false)
  
   function next(count, arr) {
    if(count >= arr.length-1){
        setCount(0)
    } else {
        setCount(count+1)
    }
}

function prev(count, arr) {
    if(count <= 0){
        setCount(0)
    } else {
        setCount(count-1)
    }
}

function showOverlay() {
    setOverlay(true)
}

function hideOverlay() {
    setOverlay(false)
}




    return (
        <Layout title = {good.name || 'Hopastore интернет-магазин оптовых продаж бытовых товаров из Турции с доставкой по всей России'}
                description = {`интернет-магазин Hopastore, оптовые продажи ${good.name}, ${good.description}` || "Официальный сайт Hopastore в России. Hopastore - это интернет-магазин оптовых продаж бытовых товаров из Турции с доставкой по всей России. Огромный выбор товаров и выгодные цены на электронику и бытовую технику, одежду для детей и взрослых, товары для дома и сада и многое другое в интернет-магазине hopastore."}
        >
            <Galery images={good.images} 
                    next = {next} 
                    prev = {prev}
                    count = {count} 
                    hideOverlay = {hideOverlay}
                    arr = {good.images}
                    overlay = {overlay}
                    />
            <div className="goodpage__wrapper">
                <div className="goodpage__title">
                    <h1>{good.name}</h1>
                </div>
                <div className="goodpage__content-wrap">
                    <div className="goodpage__galery">
                        <img src= {good.images[0]} onClick = {showOverlay}/>
                        <div className="goodpage__galery-small">
                            {good.images.map((image, i)=> {
                            return (
                                <div className="goodpage__galery-small-item" 
                                     key = {i}
                                     onClick = {showOverlay}
                                     >
                                    <img src= {image}/>
                                </div>
                            )
                        })}
                    </div>
                    </div>
                    <div className="goodpage__options">
                      {state.cart[query.id] ? Object.keys(good.kinds).map((el, i)=> {
                                
                                                return (
                                                <GoodKind article = {el} 
                                                          headArticle = {good.article}
                                                          option = {good.kinds[el].option}
                                                          price = {good.kinds[el].price}
                                                          key = {i}
                                                          addGood = {state.addGood}
                                                          cart = {state.cart}
                                                          sum = {state.cart[good.article][el] ? state.cart[good.article][el].amount : 1} 
                                                          add = {state.cart[good.article][el] ? true : false}
                                                          />
                                                        )}) 
                                            : Object.keys(good.kinds).map((el, i)=> {
                                                return (
                                                <GoodKind article = {el} 
                                                          headArticle = {good.article}
                                                          option = {good.kinds[el].option}
                                                          price = {good.kinds[el].price}
                                                          key = {i}
                                                          addGood = {state.addGood}
                                                          cart = {state.cart}
                                                          sum = {1}
                                                          add = {false}
                                                          />
                                                        )})}
                        <div className="goodpage__price-wrap">
                            {/* <div className="goodpage__price goodpage__oldprice">
                                {oldprice ? <span>{oldprice + ' ' + '₽'}</span> : <></>} 
                            </div> */}
                            {/* <div className="goodpage__price ">
                                <span><small>Цена:</small> {good.price} ₽</span>
                            </div> */}
                        </div>
                      

                    </div>
                </div>
                <div className="goodpage__descr-title">
                    <div className="goodpage__descr-title-item">
                      <i className="fa fa-info-circle"/>  
                      <span>Описание</span>  
                    </div>
                    
                </div>
                <div className="goodpage__descr-text">
                    <p>{good.description}</p>
              
                 

                </div>

            </div>
        </Layout>
    )
}

export async function getServerSideProps({params}) {
    const response = await axios.post(`http://localhost:3000/api/getonegood`, {article: params.id})
    const good = response.data.good
  return {
    props: {good}
  }
}


export default Good;