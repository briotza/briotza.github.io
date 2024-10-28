import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import { DescricaoPersonagem } from "../../types/descricao.types"
import { DetalhesModal } from '../../types/detalhes.types'
import * as Dialog from "@radix-ui/react-dialog";


export default function Descricao({ id, onClose }: DetalhesModal) {
    const [personagem, setPersonagem] = useState<DescricaoPersonagem | null>(null)

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
        <Dialog.Root open={!!id} onOpenChange={() => onClose()}>
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
            <Dialog.Content className="fixed bg-white p-4 rounded-lg shadow-lg max-w-md mx-auto inset-0 m-auto">
                <Dialog.Title>Teste</Dialog.Title>
                <Dialog.Description />
                <Dialog.Close asChild>
                    <button onClick={onClose} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Fechar</button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    )
}