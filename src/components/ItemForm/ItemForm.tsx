import { useRef, useState, type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react"
import { MdOutlineFileUpload } from "react-icons/md"

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

const ItemForm = ({setData , oldData} : {setData : Dispatch<SetStateAction<NewProduct>> , oldData? : CardProps}) => {
    
    const [imageUrl , setImageUrl] = useState<string>("")

    const data = useRef<NewProduct>({
            name : "" ,
            price : "",
            image : null
        })
    const sendData =(event : FormEvent) =>{
        event.preventDefault()
        setData(data.current)
    }


    const handleImage = (event : ChangeEvent<HTMLInputElement>) =>{
        if( event.target.files?.[0]){
            data.current = {...data.current , image: event.target.files?.[0] }
            setImageUrl( URL.createObjectURL(event.target.files?.[0]))
        }
    }
    return (
        <form onSubmit={sendData}>
            <div className="flex justify-between mt-9">
                <div className="w-[40%] dark:text-white ">
                    <div className="mb-8">
                        <label htmlFor="name"> Product Name:</label>
                        <input type="text" placeholder="Enter Product Name"id="name" className=" dark:bg-dark w-full h-[40px] mb-[8px] rounded-lg ps-[15px] bg-gray-200 border border-gray-300 focus:border-sky-950 outline-[0]" 
                            onChange={(event) =>data.current = {...data.current , name : event.target.value}} defaultValue={oldData?.name} required/>
                    </div>
                
                    <div>
                        <label htmlFor="price"> Product Price:</label>
                        <input type="number" placeholder="Enter Product Price" id="price" className=" dark:bg-dark w-full h-[40px] mb-[8px] rounded-lg ps-[15px] bg-gray-200 border border-gray-300 focus:border-sky-950 outline-[0]" 
                            onChange={(event) =>data.current = {...data.current , price: event.target.value}} defaultValue={oldData?.price} required/>
                    </div>
                </div>
                <div  className="w-[40%]">
                    <label htmlFor="image" className="w-full h-full border-2 border-dashed rounded-2xl border-blue-500 flex flex-col justify-center items-center mb-1">{imageUrl != ""? <img src={imageUrl} alt="" /> : oldData?.image_url ? <img src={oldData?.image_url} alt=""/> : <MdOutlineFileUpload className="text-blue-500 text-8xl cursor-pointer"/> }   Upload Product Image </label>
                    <input type="file"  id="image"  className="hidden"
                        onChange={handleImage} required/>
                </div>
            </div>
            <input type="submit" value={ oldData? "Update":"Create"}  className="bg-gray-300 mt-4  text-black rounded-md w-[120px] h-10 cursor-pointer flex items-center justify-center text-center"/>
        </form>
    )
}

export default ItemForm
