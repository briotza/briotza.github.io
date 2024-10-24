import ListaPersonagens from "../components/personagens";
import logo from '../assets/logo.png'
import portal from '../assets/portal.png'

export default function Home() {
    return (
        <div className="h-full flex flex-col bg-custom-image bg-cover bg-center items-center">
            <div className="flex flex-row w-screen items-center p-3">
                <img src={logo} className="max-w-[300px]" />
            </div>
            <h1 className=" font-creepster text-[#12ABC9] text-3xl text-outline mb-5">Lista de Personagens</h1>
            <ListaPersonagens />
            <img src={portal} className="w-[1000px]" />
        </div>
    )
}