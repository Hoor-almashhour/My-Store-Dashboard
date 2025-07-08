import { useEffect, useState } from "react"
import ItemForm from "../components/ItemForm/ItemForm"
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios"
import { showSuccessToast } from "../components/ToastUtils/ToastUtils"

interface NewProduct{
        name : string
        price: string
        image : Blob|null
}

interface CardProps{
        id: number
        image_url : string 
        price: string
        name : string
}
const EditItem = () => {

    const params = useParams()
    const navigate = useNavigate()
    const [data , setData] = useState<NewProduct>({
        name : "" ,
        price: "" ,
        image : null
    })
    const [oldData , setOldData] = useState<CardProps>({
        id : 0 ,
        name : "" ,
        price: "" ,
        image_url : ""
    })
    useEffect(()=>{
        axios.get("https://vica.website/api/items/" + params.id ,{
            headers : {
                    Authorization : "Bearer " + localStorage.getItem ("token"),
                    Accept: "application/json"
                }
        })
        .then(res => {
                console.log(res);
                setOldData({
                    id : res.data.id ,
                    name : res.data.name ,
                    image_url: res.data.image_url ,
                    price: res.data.price ,
                })
            })
        .catch(err => console.log(err))
    }, [])
    useEffect(()=>{
        if (data.name != ""){
            axios.post("https://vica.website/api/items/" + params.id ,{
                    name : data.name ,
                    image: data.image ,
                    price: data.price ,
                    _method : "PUT"
            }
                ,{
                headers : {
                        Authorization : "Bearer " + localStorage.getItem ("token"),
                        Accept: "application/json" ,
                        "Content-Type" : "multipart/form-data"
                    }
            })
            .then(res => {
                console.log(res);
                navigate("/dashboard/items")
                showSuccessToast("Product Updated successfully")
            })
            .catch(err => console.log(err))
    }
    }, [data])

    return (
        <div className=" bg-gray-100 dark:bg-dark">
                <h1 className="text-2xl dark:text-white font-semibold">Edit Product</h1>
                <ItemForm setData={setData} oldData={oldData} />
        </div>
    )
}

export default EditItem
