import { useEffect, useState } from "react"
import { Personagem } from "../../types/personagens.types"
import { useParams } from "react-router-dom"
import axios from "axios"
import { DescricaoPersonagem } from "../../types/descricao.types"

export default function Descricao(){
    const [personagem, setPersonagem] = useState<DescricaoPersonagem | null>(null)
    const id = useParams<{id:string}>()

    useEffect(() => {
        const fetchPersonagem = async() => {
            const resposta = await axios.get(`ttps://rickandmortyapi.com/api/character/${id}`)
            setPersonagem(resposta.data)
        }

        fetchPersonagem()
    },[id])

    return(
        <div>
        <p>Descrição do personagem</p>
        <img src={personagem.image} />
        {personagem.name}

        </div>

    )
}