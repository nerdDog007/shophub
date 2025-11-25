import { useDispatch, useSelector } from "react-redux";
import { setSearch } from "../redux/slices/Product";

const Filter = () => {
  const dispatch = useDispatch();
  const {search} = useSelector((state: any) => state.product);
  return (
        <form action="" className="h-10 w-full">
        <input onChange={(e) => {
          e.preventDefault();
          dispatch(setSearch(e.target.value))
        }
          } value={search} type="text" placeholder="Search products..." className="p-2 border h-full w-full border-gray-300 rounded-md placeholder:font-[300] placeholder:text-[.9rem]"/>
        </form>
  )
}
export default Filter