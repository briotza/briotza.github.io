import { useState, useEffect } from "react"
import axios from "axios"
import { Personagem } from "../../types/personagens.types"
import { Link } from "react-router-dom"

export default function ListaPersonagens() {
    //Armazenar lista de personagens, quantidade de itens, total de personagens e páginas
    const [personagens, setPersonagens] = useState<Personagem[]>([])
    const [itens, setItens] = useState<number>(20)
    const [totalPersonagens, setTotalPersonagens] = useState<number>(0)
    const [pagina, setPagina] = useState<number>(1)

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

    //Lógica para exibição de personagens
    const inicio = (pagina-1) * itens
    const fim = inicio + itens
    const exibidos = personagens.slice(inicio,fim)

    //Botões de navegação de página
    const proximo = () => {
        if(pagina < Math.ceil(totalPersonagens/itens)){
            setPagina(pagina+1)
        }
    }
    const anterior = () => {
        if(pagina > 1){
            setPagina(pagina-1)
        }
    }

    return (
        <div>
            <h1 className="">Lista de Personagens</h1>
            {/* Lista de quantidade de itens */}
            <select onChange={handleItensPagina} value={itens}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
            </select>
            <ul>
                {/* Listagem de personagens */}
                {exibidos.map(personagem => (
                    <li key={personagem.id}>
                        <Link to='/personagem'>
                            {personagem.id} - 
                            {personagem.name} - 
                            {personagem.status}
                            <img src={personagem.image} className="w-20" />
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