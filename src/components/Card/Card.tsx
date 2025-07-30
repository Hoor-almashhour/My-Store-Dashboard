
import axios from 'axios'
import { useState, type Dispatch, type SetStateAction } from 'react'
import { FaRegTrashAlt } from 'react-icons/fa'
import { Link} from 'react-router-dom'
import { showSuccessToast } from '../ToastUtils/ToastUtils'

interface CardProps{
        id: number
        image_url : string 
        price: string
        name : string
        setItemDeleted ?: Dispatch<SetStateAction<number>>
    }


const Card = ({id , image_url , name , price , setItemDeleted} : CardProps) => {

    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const deleteProduct = () =>{
        axios.delete("https://vica.website/api/items/" + id ,{
            headers : {
                Authorization : "Bearer " + localStorage.getItem ("token"),
                Accept: "application/json" 
            }
        })
        .then(res => {console.log(res)
            if (setItemDeleted){
                setItemDeleted(id)
            }
            setShowDeleteModal(false)
            
        })
        .catch(err => console.log(err))
        showSuccessToast("Product deleted successfully")
    }
    return (
        <div className="w-[250px] h-[100%] rounded-lg dark:bg-dark p-4 dark:text-white bg-white shadow-xl"
            key={id}
            >
            <img className="max-w-[75%] mx-auto mb-2 dark:bg-dark bg-none" src={image_url} alt="" />
            <h2 className="text-lg font-medium">{name}</h2>
            <p className="text-blue-700 mb-2">${price}</p>
            <div className="flex justify-between">
                <Link to={"/dashboard/items/edit/"+ id} className="cursor-pointer bg-gray-200 w-[140px] p-1 rounded-3xl text-sm dark:bg-white/20 text-center ">
                    Edit Product
                </Link>
                <button className="cursor-pointer" title="delete icon" onClick ={() => setShowDeleteModal(true)}>
                    <FaRegTrashAlt/>
                </button>
                {showDeleteModal && (
                    <div className="fixed inset-0 z-50 bg-black/50 flex items-start justify-center">
                        <div className="dark:bg-[#1f2a3c] p-12 rounded-xl bg-white w-[450px]  shadow-lg text-center">
                            <h2 className="text-lg font-semibold mb-6 dark:text-white text-black">Are you sure to delete this product?</h2>
                            <div className="flex justify-center gap-6">
                                <button
                                    onClick={() => setShowDeleteModal(false)}
                                    className="cursor-pointer dark:bg-gray-100 bg-gray-300 text-black px-11 py-2 rounded-md "
                                >
                                    No
                                </button>
                                <button
                                    onClick={deleteProduct}
                                    className="dark:bg-red-600 text-white px-11 py-2 rounded-md bg-red-600  cursor-pointer"
                                    >
                                    Yes
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Card
