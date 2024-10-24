import ListaPersonagens from "../components/personagens";
import logo from '../assets/logo.png'
import banner from '../assets/banner.webp'

export default function Home() {
    return (
        <div className="h-screen flex flex-col items-center">
            <div className="flex flex-col bg-black w-screen items-center h-[119px]">
                <img src={banner} className="max-w-[700px] absolute" />
            </div>
            <h1 className="mt-5 font-creepster text-[#12ABC9] text-4xl text-outline mb-5">Lista de Personagens</h1>
            <ListaPersonagens />
        </div>
    )
}