import { useDispatch } from "react-redux";
import { setFilterByPrice } from "../redux/slices/Product";

const FilterByPrice = () => {

    const dispatch = useDispatch();
  return (
    <div>
        <form action="" className="h-10">
            <select name="" id="" className="p-2 h-full border border-gray-300 rounded-md w-full placeholder:font-[300] text-[1rem]">
                <option value="low-to-high"
                onClick={() => dispatch(setFilterByPrice('low-to-high'))}
                >Price: Low to High</option>
                <option value="high-to-low" 
                onClick={() => dispatch(setFilterByPrice('high-to-low'))}
                >Price: High to Low</option>
            </select>
        </form>
    </div>
  )
}

export default FilterByPrice