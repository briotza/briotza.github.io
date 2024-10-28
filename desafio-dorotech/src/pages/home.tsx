import ListaPersonagens from "../components/personagens";
import logo from '../assets/logo.png'
import portal from '../assets/green-portal.png'
import morty from '../assets/morty.png'
import rick from '../assets/rick.png'

export default function Home() {
    return (
        <div className="min-h-screen flex flex-col bg-custom-image bg-cover items-center">
            <div className="flex flex-row w-screen items-center justify-center gap-4 h-[160px] border-[#8EDC23] custom-bg">
                <img src={rick} className="max-h-[125px] left-0 ml-4 mt-4" />
                <h1 className="font-sans text-[#24325F] text-4xl text-outline mb-5 font-bold">Lista de Personagens</h1>
                <img src={morty} className="max-h-[125px] right-0 mr-4 mt-4" />
            </div>
            <div className="p-3 my-2">
                <ListaPersonagens />
            </div>
            {/*<img src={portal} className="w-[800px]" />*/}
        </div>
    )
}