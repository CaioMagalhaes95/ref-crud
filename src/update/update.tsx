import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Update(){
    const [values, setValues] = useState({name: '', email: ''})
    const navigate = useNavigate();
    const {id} = useParams();

    function handleUpdate(e: any){
        e.preventDefault();
        axios.put(`http://localhost:3000/users/` + id, values)
        .then(res => {
            console.log(res)
            navigate("/")
        })
        .catch(err => console.log(err))

    }

    useEffect(() => {
        axios.get(`http://localhost:3000/users/` + id)
        .then(res => {
            setValues(res.data)
        })
        .catch(err => console.log(err))
    }, [])


    return(
        <form className="container mx-auto p-4 flex flex-col items-center justify-center bg-gray-200 rounded shadow-lg" onSubmit={handleUpdate}>
            <div>
            <label className="font-medium ">Name</label>
            <input className="border bg-white border-gray-400 p-2 m-2 w-64 rounded shadow-md"
            value={values.name}
            type='text'
            onChange={(e) => setValues({...values, name: e.target.value})}
            ></input>
            </div>

            <div>
            <label className="font-medium ">Email</label>
            <input className="bg-white border border-gray-400 p-2 m-2 w-64 rounded shadow-md"
            value={values.email}
            type='email'
            onChange={(e) => setValues({...values, email: e.target.value})}
            ></input>
            </div>
            <button className="shadow-md rounded bg-green-600 m-2 p-2 hover:bg-green-700 text-white">Salvar</button>
        </form>

    )

}