import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { DescricaoPersonagem } from "../../types/descricao.types"

export default function Descricao() {
    const [personagem, setPersonagem] = useState<DescricaoPersonagem | null>(null)
    const { id } = useParams<{ id: string }>()

    useEffect(() => {
        const fetchPersonagem = async () => {
            try {
                const resposta = await axios.get(`https://rickandmortyapi.com/api/character/${id}`)
                setPersonagem(resposta.data)
            } catch (error) {
                console.error('Erro ao buscar o personagem:', error);
            }

        }

        fetchPersonagem()
    }, [id])

    return (
        <div>
            <p>Descrição do personagem</p>
            {personagem ? (
                <>
                    <img src={personagem.image} alt={personagem.name} />
                    <h2>{personagem.name}</h2>
                    <p>Status: {personagem.status}</p>
                    <p>Espécie: {personagem.species}</p>
                    <p>Gênero: {personagem.gender}</p>
                    <p>Origem: {personagem.origin.name}</p>
                    <p>Localização: {personagem.location.name}</p>
                </>
            ) : (
                <p>Carregando personagem...</p>
            )}
        </div>

    )
}