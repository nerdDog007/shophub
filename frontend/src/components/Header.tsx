import { CiDark } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode } from "../redux/slices/theme";
import Filter from "./Filter";
import List from "./List";
import FilterByPrice from "./FilterByPrice";
import { CiShoppingCart } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const Header = () => {  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {isDarkMode} = useSelector((state: any) => state.this);
  const {products} = useSelector((state: any) => state.cart);
  function toggleDarkMode() {
    dispatch(setDarkMode(!isDarkMode))
  }
  return (
    <div className={`flex flex-col text-2xl font-semibold text-blue-600 gap-6  ${isDarkMode ===false ? 'bg-[#f8f9fa]' : 'bg-black'}  p-6`}>
      <div className="flex justify-between items-center">
      <h1 onClick={() =>navigate('/')} className="cursor-pointer">ShopHub</h1>
      <div className="flex relative"
      onClick={() =>navigate('/cart')}
      >
      <CiShoppingCart className="ml-2 text-4xl cursor-pointer" />
      <span className="ml-2 text-[.8rem] absolute bottom-0 right-0">{products.length}</span>
     </div>
     {isDarkMode ===false? <CiDark className="ml-2 text-3xl cursor-pointer" onClick={toggleDarkMode} />
     :
     <MdDarkMode className="ml-2 text-3xl cursor-pointer" onClick={toggleDarkMode} />}
     </div>
     <div className={`${isDarkMode ? 'text-white' : 'text-black'} flex flex-col gap-4 lg:flex-row lg:justify-between`}>
      <Filter />
      <List/>
      <FilterByPrice />
     </div>
    </div>
  )
}
export default Header