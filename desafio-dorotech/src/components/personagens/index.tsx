import { useState, useEffect } from "react"
import axios from "axios"
import { Personagem } from "../../types/personagens.types"
import { Link } from "react-router-dom"


export default function ListaPersonagens() {
    //Armazenar lista de personagens
    const [personagens, setPersonagens] = useState<Personagem[]>([])
    const [itens, setItens] = useState<number>(20)

    const fetchPersonagens = async () => {
        try {
            //Requisição GET para a API
            const resposta = await axios.get('https://rickandmortyapi.com/api/character')
            //Armazena resposta da API
            setPersonagens(resposta.data.results)

        } catch (error) {
            console.log('Não foi possível carregar a lista:'), error
        }
    }

    //Chamada da função fetch
    useEffect(() => {
        fetchPersonagens()
    }, [])
    
    const handleItensPagina = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItens(Number(event.target.value))
    }

    return (
        <div>
            <h1 className="">Lista de Personagens</h1>
            <select onChange={handleItensPagina} value={itens}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
            <ul>
                {/* Listagem de personagens */}
                {personagens.slice(0,itens).map(personagem => (
                    <li key={personagem.id}>
                        <Link to='/personagem'>
                            {personagem.id}
                            {personagem.name}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}