import { CiCirclePlus } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminItemsPage() {
  return (
    <div className="w-full h-full bg-amber-50 relative">
      <div>
        <Link to="/admin/addItems">
        <CiCirclePlus className="text-4xl m-4 hover:text:bg-red-100 absolute right-2 bottom-1"/>
        </Link>
      </div>

      
    </div>
  )
}
