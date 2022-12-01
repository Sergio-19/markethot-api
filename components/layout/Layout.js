import Head from 'next/head'
import Footer from '../footer/Footer';
import Header from '../header/Header'



const Layout = (props) => {
    return(
        <>
        <Head>
            <link rel="canonical" href="https://hopastore.ru"/>
            <meta name="description" content= {props.description || "Официальный сайт Hopastore в России. Hopastore - это интернет-магазин оптовых продаж бытовых товаров из Турции с доставкой по всей России. Огромный выбор товаров и выгодные цены на электронику и бытовую технику, одежду для детей и взрослых, товары для дома и сада и многое другое в интернет-магазине hopastore."}/>
            <title>{props.title || 'Hopastore интернет-магазин оптовых продаж бытовых товаров из Турции с доставкой по всей России'}</title>
            <link href="https://use.fontawesome.com/releases/v5.0.13/css/all.css" rel="stylesheet"/>
            <link rel="apple-touch-icon" sizes="180x180" href="https://st.aliexpress.ru/mixer-storage/favicon/apple-touch-icon.png"/>
            <link rel="icon" type="image/png" sizes="32x32" href="https://st.aliexpress.ru/mixer-storage/favicon/favicon-32x32.png"/>
            <link rel="icon" type="image/png" sizes="16x16" href="https://st.aliexpress.ru/mixer-storage/favicon/favicon-16x16.png"/>
        </Head>
        <div className="main">
            <Header />
            <div className='container'>
                {props.children}
            </div>
            <Footer />        
        </div>
        </>
        
    )
}

export default Layout;