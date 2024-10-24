import { useEffect, useState } from "react"
import { Personagem } from "../../types/personagens.types"
import { useParams } from "react-router-dom"
import axios from "axios"

export default function Descricao(){
    const [personagem, setPersonagem] = useState<Personagem[]>([])
    const id = useParams<{id:string}>()

    useEffect(() => {
        const fetchPersonagem = async() => {
            const resposta = await axios.get(`ttps://rickandmortyapi.com/api/character/${id}`)
            setPersonagem(resposta.data.results)
        }

        fetchPersonagem()
    },[id])

    return(
        <p>Descrição do personagem</p>


    )
}