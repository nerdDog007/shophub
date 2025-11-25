import { useDispatch, useSelector } from "react-redux";
import { setSelectedCategory } from "../redux/slices/Product";

const List = () => {
    const dispatch = useDispatch();
    const {categories} = useSelector((state: any) => state.product);
  return (
    <>
     <form action="" className="h-10">
        <select className="p-2 border border-gray-300 rounded-md w-full placeholder:font-[300] text-[1.2rem] h-full">
        {
            categories.map((cat: string, index: number) => (
                <option key={index} value={cat} onClick={() => dispatch(setSelectedCategory(cat))} className="text-[.8rem]">{cat}</option>
            ))
        }
        </select>

     </form>
     </>
  )
}

export default List