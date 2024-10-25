import ListaPersonagens from "../components/personagens";
import logo from '../assets/logo.png'
import portal from '../assets/green-portal.png'

export default function Home() {
    return (
        <div className="h-full flex flex-col bg-custom-image bg-cover bg-center items-center">
            <div className="flex flex-row w-screen items-center justify-center gap-4 h-[140px]">
                <h1 className=" font-creepster text-[#12ABC9] text-4xl text-outline mb-5">Lista de Personagens</h1>
            </div>
            <img src={logo} className="max-w-[300px] absolute right-0 mr-4 mt-4" />
            <ListaPersonagens />
            <img src={portal} className="w-[800px]" />
        </div>
    )
}