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
            <Dialog.Content className="fixed bg-black p-5 rounded-lg shadow-lg max-w-2xl inset-0 m-auto text-xl text-white h-[400px] flex flex-col">
                <Dialog.Title className="mb-2 text-2xl">{personagem?.name}</Dialog.Title>
                <div className="flex-grow">
                    <Dialog.Description className="flex flex-row items-center">
                        <img src={personagem?.image} className="h-[220px]" />
                        <div className="ml-4">
                            <span>Espécie</span><p className="text-sm">{personagem?.species}</p>
                            <span>Status</span><p className="text-sm">{personagem?.status}</p>
                            <span>Gênero</span><p className="text-sm">{personagem?.gender}</p>
                            <span>Origem</span><p className="text-sm">{personagem?.origin.name}</p>
                            <span>Localização</span><p className="text-sm">{personagem?.location.name}</p>
                        </div>
                    </Dialog.Description>
                </div>
                <Dialog.Close asChild>
                    <button onClick={onClose} className="text-black mt-4 self-end px-4 py-2 bg-[#8EDC23] rounded">Fechar</button>
                </Dialog.Close>
            </Dialog.Content>
        </Dialog.Root>
    )
}