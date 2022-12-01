import Link from "next/link";


const Footer = () => {

    return(
        <footer>
            <div className='container'>
                <div className="footer__wrap">
                    <div className="footer__item">
                        <h4 className="'footer__item-title'">Покупателям</h4>
                        <ul>
                            <li><Link href="/info/delivery"><a>Как сделать заказ</a></Link></li>
                            <li><Link href="/info/delivery"><a>Доставка</a></Link></li>
                            <li><Link href="/info/delivery"><a>Оплата</a></Link></li>
                            <li><Link href="/info/delivery"><a>Возврат денежных средств</a></Link></li>
                            <li><Link href="/info/delivery"><a>Возврат товара</a></Link></li>
                        </ul>
                    </div>
                     <div className="footer__item">
                        <h4 className="'footer__item-title'">Компания</h4>
                        <ul>
                            <li><Link href="/info/contact"><a>О нас</a></Link></li>
                            <li><Link href="/info/contact"><a>Контакты</a></Link></li>
                            <li><Link href="/info/rules"><a>Пользовательское соглашение</a></Link></li>
                        </ul>
                    </div>
                </div>
                <div className="footer__sub">
                    <p>Интернет - магазин оптовых продаж бытовых товаров, все права защищены. 2020 год.</p>
                </div>
            </div>
        </footer>
    )
}

export default Footer;