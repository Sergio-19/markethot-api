import Layout from "../components/layout/Layout"
import { useRouter } from "next/router"

const Error = () => {
    const router = useRouter()

    const redirect = () => {
        setTimeout(()=> {
            router.push('/')
        }, 1000)
    }

    redirect()

    return (
        <Layout>
        <div className="info__wrapper">
            <div className="error__content">
                    <div>
                    <h1>Ошибка 404!</h1>
                    <h2>Похоже такой страницы не существует...</h2>
                    </div>
            </div>
             
        </div> 
     </Layout>
     
    )
}

export default Error