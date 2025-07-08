import { useContext, useEffect, useState } from "react"
import { SearchContext } from "./Root"
import axios from "axios"
import Card from "../components/Card/Card"
import { Link } from "react-router-dom"
import { IoIosAddCircleOutline } from "react-icons/io"


interface Product {
        id: number
        image_url : string 
        price: string
        name : string
        created_at : string 
        updated_at : string
    }

const ListItems = () => {
    const search = useContext(SearchContext)
    const [data ,setData] = useState<Array<Product>>([
            { 
                id :0 ,
                image_url : "",
                price: "" ,
                name : "" ,
                created_at : "" ,
                updated_at : ""
            }
        ])


        const [filteredData, setFilteredData] = useState<Array<Product>>([])
        const [currentPage, setCurrentPage] = useState(1)
        const productsPerPage = 8
        useEffect(() => {
        const result = search
            ? data.filter((product) =>
            product.name.toLowerCase().includes(search.toLowerCase())
            )
            : data
        setFilteredData(result)
        setCurrentPage(1) 
    }, [search, data])


        useEffect(() => {
            const validData = data.filter(product => product.id !== 0)
            const result = search
                ? validData.filter((product) =>
                    product.name.toLowerCase().includes(search.toLowerCase())
                )
                : validData
            setFilteredData(result)
            setCurrentPage(1)
        }, [search, data])

        const [ItemDeleted , setItemDeleted] = useState<number>(0)
        useEffect (()=> {
            axios.get("https://vica.website/api/items" , {
                headers : {
                    Authorization : "Bearer " + localStorage.getItem ("token"),
                    Accept: "application/json"
                }
            })
            .then(res => {
                console.log(res);
                setData(res.data);
            })
            .catch(err => console.log(err))
        }, [ItemDeleted])

        const indexOfLastProduct = currentPage * productsPerPage
        const indexOfFirstProduct = indexOfLastProduct - productsPerPage
        const currentProducts = filteredData.slice(indexOfFirstProduct, indexOfLastProduct)

        const totalPages = Math.ceil(filteredData.length / productsPerPage)



    return (
        <div>
            <div className="flex justify-between items-center">
                <h1  className="text-2xl dark:text-white font-semibold"> All Products</h1>
                <Link to ="/dashboard/items/create" className="bg-blue-500 text-white rounded-md w-[180px] h-10 cursor-pointer flex items-center justify-center gap-2">
                    <IoIosAddCircleOutline />
                    Create Product
                </Link>
            </div>
            <div className="flex flex-wrap gap-5 mt-8 justify-between items-center ">
                {currentProducts .map((product )  => {return (
                    <Card key={product.id} 
                            id={product.id}
                            name={product.name}
                            image_url={product.image_url}
                            price={product.price}
                            setItemDeleted ={setItemDeleted}
                        />
                )})}
            </div>
            {totalPages > 1 && (
                <div className="flex justify-center items-center gap-2 mt-10 flex-wrap">
                    {Array.from({ length: totalPages }, (_, index) => {
                        const pageNumber = index + 1
                        const isActive = pageNumber === currentPage
                        return (
                        <button
                            key={pageNumber}
                            onClick={() => setCurrentPage(pageNumber)}
                            className={`cursor-pointer px-4 py-2 rounded transition-all duration-200 ${
                            isActive
                                ? "bg-blue-500 text-white font-semibold"
                                : "bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-white"
                            }`}
                        >
                            {pageNumber}
                        </button>
                        )
                    })}
                </div>
            )}
        </div>
    )
}

export default ListItems
