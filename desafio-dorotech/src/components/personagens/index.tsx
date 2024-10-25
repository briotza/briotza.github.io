import { useState, useEffect } from "react"
import axios from "axios"
import { Personagem } from "../../types/personagens.types"
import { Link } from "react-router-dom"
import filtro from '../../assets/filtro.png'

//Categorias
const opcoesGenero = ['Male', 'Female', 'Genderless', 'unknown']
const opcoesStatus = ['Alive', 'Dead', 'unknown']
const opcoesEspecie = ['Human', 'Alien', 'Robot', 'unknown', 'Other']

export default function ListaPersonagens() {
    //Armazenar lista de personagens, quantidade de itens, total de personagens e páginas
    const [personagens, setPersonagens] = useState<Personagem[]>([])
    const [itens, setItens] = useState<number>(20)
    const [totalPersonagens, setTotalPersonagens] = useState<number>(0)
    const [pagina, setPagina] = useState<number>(1)
    const [visivel, setVisivel] = useState<boolean>(false)

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
            setTotalPersonagens(todos.length)

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
    const filtrarPersonagens = () => {
        return personagens.filter(personagem => {
            const generoMatch = filtroGenero ? personagem.gender === filtroGenero : true
            const statusMatch = filtroStatus ? personagem.status === filtroStatus : true
            const especieMatch = filtroEspecie ? personagem.species === filtroEspecie : true
            const nomeMatch = filtroNome ? personagem.name.toLowerCase().includes(filtroNome.toLowerCase()) : true
            return nomeMatch && generoMatch && statusMatch && especieMatch
        });
    }

    const personagensFiltrados = filtrarPersonagens();


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

    const alternaVisibilidade = () => {
        setVisivel((prev) => !prev)
    }

    return (
        <div className="h-[900px] font-inter text-white w-[977px]">
            {/* Filtro de nome */}
            <div className="flex items-center bg-[#913E86] p-3 rounded-xl">
                <input type="text" value={filtroNome} onChange={(e) => setFiltroNome(e.target.value)} className="w-[700px] p-3 rounded-xl" placeholder="Digite o nome do personagem" />
                <div className="flex flex-row ml-auto gap-3">
                    <button className="bg-[#913E86]" onClick={alternaVisibilidade}>{visivel ? 'Filtros' : 'Filtros'}</button>
                    <div className="">
                        {/* Lista de quantidade de itens */}
                        <select onChange={handleItensPagina} value={itens} className="bg-[#913E86]">
                            <option value={5}>5</option>
                            <option value={10}>10</option>
                            <option value={20}>20</option>
                        </select>
                    </div>
                </div>
            </div>


            {visivel && (
                <div className="py-3 flex gap-3 bg-[#913E86]">
                    {/* Filtro de gênero */}
                    <div className="bg-[#160440]">
                        <label>Filtro de Gênero:</label>
                        <select onChange={(e) => setFiltroGenero(e.target.value)} value={filtroGenero} className="bg-[#913E86]">
                            <option value="">Todos</option>
                            {opcoesGenero.map(genero => (
                                <option key={genero} value={genero}>{genero}</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-[#160440]">
                        {/* Filtro de status */}
                        <label>Filtro de Status:</label>
                        <select onChange={(e) => setFiltroStatus(e.target.value)} value={filtroStatus} className="bg-[#913E86]">
                            <option value="">Todos</option>
                            {opcoesStatus.map(status => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                    </div>

                    <div className="bg-[#160440]">
                        {/* Filtro de espécie */}
                        <label>Filtro de Espécie:</label>
                        <select onChange={(e) => setFiltroEspecie(e.target.value)} value={filtroEspecie} className="bg-[#160440]">
                            <option value="">Todos</option>
                            {opcoesEspecie.map(especie => (
                                <option key={especie} value={especie}>{especie}</option>
                            ))}
                        </select>
                    </div>
                </div>
            )}

            {/* Listagem de personagens */}
            <ul className="grid grid-cols-3 gap-3 pt-3 bg-[#EEE419] rounded-xl p-3">
                {exibidos.map(personagem => (
                    <li key={personagem.id} className="p-2 bg-[#160440] rounded-xl text-white">
                        <Link to={`/personagem/${personagem.id}`} className="flex flex-row gap-2">
                            <img src={personagem.image} className="w-20" />
                            <div className="flex flex-col">
                                <p>{personagem.name}</p>
                                <p>{personagem.status}</p>

                            </div>

                        </Link>
                    </li>
                ))}
            </ul>

            {/* Navegação entre páginas */}
            <button onClick={anterior}>
                Anterior
            </button>
            <button onClick={proximo}>
                Próximo
            </button>
        </div>
    )
}