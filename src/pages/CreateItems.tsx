import { useEffect, useState } from "react"
import ItemForm from "../components/ItemForm/ItemForm"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { showSuccessToast } from "../components/ToastUtils/ToastUtils"


interface NewProduct{
        name : string
        price: string
        image : Blob|null
}

const CreateItems = () => {
  
    const [data , setData] = useState<NewProduct>({
        name : "" ,
        price: "" ,
        image : null
    })
    
      
    const navigate = useNavigate()
    useEffect(()=>{
      if(data.image != null && data.name != "" && data.price != ""){
          axios.post("http://vica.website/api/items" , data ,{
          headers : {
              Authorization : "Bearer " + localStorage.getItem ("token"),
              Accept: "application/json",
              "Content-Type" : "multipart/form-data"
          }
        })
        .then(res =>{ console.log(res)
          navigate("/dashboard/items")
          showSuccessToast("Product added successfully")
          })
          .catch(err => console.log(err))
          }
  },[data])

  return (
    <div className=" bg-gray-100 dark:bg-dark">
      <h1 className="text-2xl dark:text-white font-semibold">Create Product</h1>
      <ItemForm setData={setData}  />
    </div>
  )
}

export default CreateItems
