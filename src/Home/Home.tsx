import axios from 'axios';
import {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
    const [data, setData] = useState<any[]>([]);
    const [search, setSearch] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:3000/users')
        .then(
            res => setData(res.data))
        .catch(err => console.log(err));
    }, [])

    function handleDelete(id: number){
        const confirm = window.confirm("Tem certeza que deseja excluir este usuário?");
        if(!confirm) return;
        axios.delete(`http://localhost:3000/users/` + id)
        .then(res => {
            setData(data.filter(user => user.id !== id)),
            navigate('/');
     } )
        .catch(err => console.log(err))
    }   

    const filteredData = data.filter((user) => 
        user.name.toLowerCase().includes(search.toLowerCase())
        || user.email.toLowerCase().includes(search.toLowerCase())
    )

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
        <button className="rounded bg-green-600 m-2 p-2 hover:bg-green-700 text-white" onClick={(e) => navigate("/input")}>Adicionar Usuário</button>
        <input className="rounded shadow w-100 m-2 p-2" placeholder='Search...' onChange={(e) => setSearch(e.target.value)}></input>
        <table className="w-150 table table-striped table-bordered mt-4 w-75 mx-auto bg-gray-200">
            <thead className="bg-gray-400 text-gray-800 shadow-lg text-center">
                <tr>
                    
                    <th>Name</th>
                    <th>Email</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody className="text-center text-gray-700 font-medium">
                {filteredData.map(user => (
                    <tr key={user.id}>
                        
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <button className="rounded bg-blue-600 m-2 p-2 hover:bg-blue-700 text-white" onClick={(e) => navigate(`/update/${user.id}`)}>Editar</button>
                        <button className="rounded bg-red-600 m-2 p-2 hover:bg-red-700" onClick={(e) => handleDelete(user.id)}>Excluir</button>
                    </tr>
                ))}
            </tbody>
        </table>
        
      
    </div>
  )
}