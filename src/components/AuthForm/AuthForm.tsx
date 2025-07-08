import { Link } from "react-router-dom"
import { type ChangeEvent, type Dispatch, type FormEvent, type SetStateAction } from "react"


interface InputField {
    label: string;
    placeholder?: string;
    type: string;
    name: string;
    group?: string;
}
interface Props <T>{
    title : string,
    description : string,
    inputs : Array<InputField>,
    btn : string,
    footer : {description : string , link : {url : string , content : string}},
    setData : Dispatch<SetStateAction<T>> 
}

const AuthForm =<T extends object>({title , description , inputs , btn , footer , setData }: Props<T>) => {
    let data : T;
    console.log("hello from child")
    const dataHandiling =(event : ChangeEvent<HTMLInputElement>) =>{
        const {name , value ,files, type}  = event.target
        data = {...data , [name] : type == "file" ? files?.[0] : value}
    }

    const sendData =(event : FormEvent) => {
        event.preventDefault();
        setData(data)
        console.log(data)
    }

    return (
        <form className="h-[546px]  p-8 rounded-3xl bg-white text-center flex flex-col" onSubmit={sendData}>
            <h1 className="font-extrabold text-center text-2xl">{title}</h1>
            <p className="mb-[20px] text-center text-gray-500 text-sm" >{description}</p>
            <div className="flex flex-col justify-between flex-1">
                <div className="flex flex-col">
                    {Object.entries(
                    inputs.reduce((acc, input) => {
                        const key = input.group ?? `${input.name}`
                        if (!acc[key]) acc[key] = []
                        acc[key].push(input)
                        return acc
                    }, {} as Record<string, typeof inputs>)
                    ).map(([groupName, groupInputs], ) => (
                        <div  key={groupName}
                            className={` ${groupInputs.length === 3 ? "grid grid-cols-3 gap-3"  : groupInputs.length === 2 ? "grid grid-cols-2 gap-3": ""}`}>
                            {groupInputs.map((input, index) => (
                                <div key={index} className="flex-1 ">
                                    <label className="block m-0.5 text-start whitespace-nowrap" htmlFor={"input"+index}>{input.type != "file" ? input.label : <img src ={input.label} className="w-25" alt ="" />}</label>
                                    <input type={input.type} 
                                        name={input.name} 
                                        className= {`block w-full h-[40px] mb-[8px] rounded-lg ps-[15px] bg-gray-200 border border-gray-300 focus:border-sky-950 outline-[0] ${input.type == "file" }`} 
                                        placeholder={input.placeholder} 
                                        id={"input"+index}
                                        onChange={dataHandiling}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <input type="submit" value={btn} className=" cursor-pointer w-[265px] px-4 py-2  h-[47px] bg-sky-500 rounded-xl text-2xl text-white" />
                <div className="flex gap-[8px] justify-center">
                    <p className="text-sm">{footer.description}</p>
                    <Link to={footer.link.url} className="text-sky-500 underline text-sm">{footer.link.content}</Link>
                </div>
            </div>
        </form>
    )
}

export default AuthForm
