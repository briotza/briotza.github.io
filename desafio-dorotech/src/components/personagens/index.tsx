import { useState, useEffect } from "react"
import axios from "axios"
import { Personagem } from "../../types/personagens.types"
import heart from '../../assets/heart.png'
import skull from '../../assets/skull.png'
import question from '../../assets/question.png'
import Descricao from "../descricao"

//Categorias
const opcoesGenero = ['Male', 'Female', 'Genderless', 'unknown']
const opcoesStatus = ['Alive', 'Dead', 'unknown']
const opcoesEspecie = ['Human', 'Alien', 'Robot', 'unknown', 'Other']

export default function ListaPersonagens() {
    //Armazenar lista de personagens, quantidade de itens, páginas, visibilidade dos filtros, personagem do modal e personagens filtrados
    const [personagens, setPersonagens] = useState<Personagem[]>([])
    const [itens, setItens] = useState<number>(20)
    const [pagina, setPagina] = useState<number>(1)
    const [visivel, setVisivel] = useState<boolean>(false)
    const [idModal, setIdModal] = useState<string | null>(null)
    const [personagensFiltrados, setPersonagensFiltrados] = useState<Personagem[]>([])

    //Armazenar filtros
    const [filtroGenero, setFiltroGenero] = useState<string>('')
    const [filtroStatus, setFiltroStatus] = useState<string>('')
    const [filtroEspecie, setFiltroEspecie] = useState<string>('')
    const [filtroNome, setFiltroNome] = useState<string>('')

    const fetchPersonagens = async () => {
        try {
            const todos = []
            let pagina = 1
            let continuar = true
            while (continuar) {
                //Requisição GET para a API
                const resposta = await axios.get(`https://rickandmortyapi.com/api/character?page=${pagina}`)
                //Armazena resposta da API
                todos.push(...resposta.data.results);
                //Condição para carregar todos os personagens
                if (resposta.data.info.next) {
                    pagina++
                } else {
                    continuar = false
                }
            }
            setPersonagens(todos)
            setPersonagensFiltrados(todos)

        } catch (error) {
            console.log('Não foi possível carregar a lista:'), error
        }
    }

    //Chamada da função fetch
    useEffect(() => {
        fetchPersonagens()
    }, [])

    //Mudança de itens por página
    const handleItensPagina = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setItens(Number(event.target.value))
        setPagina(1)
    }

    //Lógica de filtragem
    const aplicarFiltro = () => {
        const filtrados = personagens.filter(personagem => {
            const generoMatch = filtroGenero ? personagem.gender === filtroGenero : true
            const statusMatch = filtroStatus ? personagem.status === filtroStatus : true
            const especieMatch = filtroEspecie ? personagem.species === filtroEspecie : true
            const nomeMatch = filtroNome ? personagem.name.toLowerCase().includes(filtroNome.toLowerCase()) : true
            return nomeMatch && generoMatch && statusMatch && especieMatch
        });
        setPersonagensFiltrados(filtrados)
        setPagina(1)
    }


    //Lógica para exibição de personagens
    const inicio = (pagina - 1) * itens
    const fim = inicio + itens
    const exibidos = personagensFiltrados.slice(inicio, fim)

    //Botões de navegação de página
    const proximo = () => {
        if (pagina < Math.ceil(personagensFiltrados.length / itens)) {
            setPagina(pagina + 1)
        }
    }
    const anterior = () => {
        if (pagina > 1) {
            setPagina(pagina - 1)
        }
    }

    //Mostrar e ocultar filtros
    const alternaVisibilidade = () => {
        setVisivel((prev) => !prev)
    }

    return (
        <div className="h-[100%] font-sans text-white w-[290px] sm:w-[550px] md:w-[600px] lg:w-[977px] pt-6">
            <div className="flex flex-col sm:flex-row lg:items-center bg-[#913E86] p-3 rounded-t-xl bg-opacity-60">
                {/* Filtro de nome e botão de busca*/}
                <div className="flex flex-col sm:flex-row">
                    <input type="text" value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} className="w-[100%] sm:w-[280px] md:w-[300px] lg:w-[700px] p-3 rounded-xl text-black" placeholder="Digite o nome do personagem" />
                    <button onClick={aplicarFiltro} className="sm:ml-4 ml-0 my-2 sm:my-0 border p-2 rounded-xl">Buscar</button>
                </div>
                {/* Botão de filtros e quantidade de itens*/}
                <div className="flex flex-col sm:flex-row ml-0 gap-0 sm:ml-auto sm:gap-3 items-center justify-items-center">
                    <button className="bg-none border p-2 rounded-xl" onClick={alternaVisibilidade}>{visivel ? 'Filtros' : 'Filtros'}</button>
                    <div className="">
                        <select onChange={handleItensPagina} value={itens} className="bg-[#913E86] mt-3 sm:mt-0">
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>
            </div>


            {visivel && (
                <div className="py-3 flex lg:flex-row sm: flex-col gap-6 bg-[#913E86] bg-opacity-60 justify-center">
                    {/* Filtro de gênero */}
                    <div className="bg-[#913E86] bg-opacity-60">
                        <label className="p-3">Filtro de Gênero:</label>
                        <select onChange={(e) => setFiltroGenero(e.target.value)} value={filtroGenero} className="bg-[#913E86] p-2">
                            <option value="">Todos</option>
                            {opcoesGenero.map(genero => (
                                <option key={genero} value={genero}>{genero}</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-[#913E86] bg-opacity-60">
                        {/* Filtro de status */}
                        <label className="p-3">Filtro de Status:</label>
                        <select onChange={(e) => setFiltroStatus(e.target.value)} value={filtroStatus} className="bg-[#913E86] p-2">
                            <option value="">Todos</option>
                            {opcoesStatus.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-[#913E86] bg-opacity-60">
                        {/* Filtro de espécie */}
                        <label className="p-3">Filtro de Espécie:</label>
                        <select onChange={(e) => setFiltroEspecie(e.target.value)} value={filtroEspecie} className="bg-[#913E86] p-2">
                            <option value="">Todos</option>
                            {opcoesEspecie.map(especie => (
                                <option key={especie} value={especie}>{especie}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {/* Listagem de personagens */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 pt-3 bg-[#62A3AB] rounded-b-xl p-3 bg-opacity-60">
                {exibidos.map(personagem => (
                    <li key={personagem.id} onClick={() => setIdModal(personagem.id.toString())} className="flex flex-row cursor-pointer gap-2 p-2 bg-[#24325f] rounded-xl text-white">
                            <img src={personagem.image} className="w-20" />
                            <div className="flex flex-col">
                                <p className="font-bold">{personagem.name}</p>
                                <div className="flex items-center">
                                    {personagem.status === 'Alive' ? (
                                        <img src={heart} alt="Alive" className="h-4 mr-1" />
                                    ) : personagem.status === 'Dead' ? (
                                        <img src={skull} alt="Dead" className="h-4 mr-1" />
                                    ) : (
                                        <img src={question} alt="Unknown" className="h-4 mr-1" />
                                    )}
                                    <p>{personagem.status}</p>
                                </div>
                            </div>
                    </li>
                ))}
            </ul>
            
            {/* Chamar modal */}
            {idModal && (
                <Descricao id={idModal} onClose={() => setIdModal(null)} />
            )}

            {/* Navegação entre páginas */}
            <div className="flex mt-2">
                <div className="flex flex-row ml-auto space-x-4 text-[#8EDC23] font-bold">
                    <button onClick={anterior}>
                        Anterior
                    </button>
                    <p>{pagina}</p>
                    <button onClick={proximo}>
                        Próximo
                    </button>
                </div>
            </div>
        </div>
    )
}