import { useSelector } from "react-redux";
import Header from "../components/Header"
import Cartt from '../components/Cart'

const Cart = () => {
    const {products} = useSelector((state: any) => state.cart);
    console.log(products)
    const {isDarkMode} = useSelector((state: any) => state.this);
    console.log(isDarkMode);
    
  return (
    <div className= {`${isDarkMode ? 'bg-gray-900 text-white min-h-screen' : 'bg-gray-100 text-gray-900 min-h-screen'}`}>
        <Header />
        <div>
            {
                products.map((product:any, index:any) => {
                    return <div key={index}>
                        <Cartt product={product} />
                    </div>
                })
            }
        </div>
    </div>
  )
}

export default Cart