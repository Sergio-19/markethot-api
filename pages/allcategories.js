import Layout from "../components/layout/Layout";
import CategoryCard from "../components/categoryCard/CategoryCard";


const AllCategories = () => {

    return (
        <Layout title = 'Hopastore интернет-магазин оптовых продаж бытовых товаров из Турции с доставкой по всей России' 
                description = 'Hopastore, Оптовые продажи товаров категорий: товары для дома, красота и здоровье, электроника, детские товары, подарки и хобби, спорт и отдых, авто товары, товары к празднику и еще многие другие.'>
         <div className="home__sale-wrap">
            <div className="home__sale">
              <p>Товары для Нового Года со скидкой до 70%!!!</p>
            </div>
         </div>
         <div className="page__title">
                <h3>Категории</h3>
            </div>
         <div className="home__content-wrap">
            <div className="home__content">
             <CategoryCard  title = 'Товары для дома'
                            category = 'tovary_dlya_doma' 
                            image = 'https://ae01.alicdn.com/kf/H1e7c9f2651624a02b1517271f578c7d9g.png'
             />
             <CategoryCard  title = 'Красота и здоровье'
                            category = 'krasota_i_zdorove' 
                            image = 'https://ae01.alicdn.com/kf/H57b14893975544d6808458ad610f3b7fC.png'
             />
             <CategoryCard  title = 'Электроника'
                            category = 'elektronika' 
                            image = 'https://ae01.alicdn.com/kf/H2d153b8bcd5540df84b185308883f021N.png'
             />
             <CategoryCard  title = 'Детские товары'
                            category = 'detskie_tovary' 
                            image = 'https://ae01.alicdn.com/kf/Haeaa04672bbd46eb8927ffffcdc80322k.png'
             />
             <CategoryCard  title = 'Подарки и хобби'
                            category = 'podarki_i_khobbi' 
                            image = 'https://ae01.alicdn.com/kf/Hacf0b01c1b3f4b70809e86856605d7e1c.png'
             />
             <CategoryCard  title = 'TV-товары'
                            category = 'tv-tovari' 
                            image = 'https://ae01.alicdn.com/kf/Hd4d5d2c159464c56b04c4b1a2246a0e7e.jpg'
             />
             <CategoryCard  title = 'Спорт и отдых'
                            category = 'sport_i_otdykh' 
                            image = 'https://ae01.alicdn.com/kf/Scd6d97f6dd624e5d95917a75ad1531fcu.png'
             />
             <CategoryCard  title = 'Автотовары'
                            category = 'avto' 
                            image = 'https://ae01.alicdn.com/kf/H7374ddb39820477cb751ec06c25e049fL.png'
             />
             <CategoryCard  title = 'Товары к празднику'
                            category = 'Noviy_god' 
                            image = 'https://ae01.alicdn.com/kf/Hdc47a1019f474e1d87ea7f9bd590f1efP.png'
             />
             <CategoryCard  title = 'Текстиль и аксессуары'
                            category = 'clothes' 
                            image = 'https://ae01.alicdn.com/kf/Hf1821cb4f55540058d8b7a6863a8439dU.png'
             />
             {/* <CategoryCard  title = 'Ликвидация'
                            category = 'sale' 
                            image = 'https://ae01.alicdn.com/kf/H02a0780e561e460a817c4d317f66cfaaj.jpg'
             />
             <CategoryCard  title = 'Весь каталог'
                            category = 'catalog' 
                            image = 'https://ae01.alicdn.com/kf/H1e7c9f2651624a02b1517271f578c7d9g.png'
             /> */}
    
            </div>
    
         </div>
        </Layout>
      )
}

export default AllCategories;