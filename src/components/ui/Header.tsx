import { useSearchParams } from "react-router-dom"
import Logo from "./Logo"

function Header() {
    const [searchParams, setSearchParams] = useSearchParams();
    return (
        <div className="w-[75%] flex flex-col">
            <div className="flex p-4 px-10 gap-8">
                <Logo />
                <hr className="w-px h-8 bg-[#1C192E]" />

                <input
                    type="text"
                    className="w-2/3 p-2 border border-[#231F3B] rounded-lg bg-[#141223] font-normal text-sm placeholder-[#5D577D] focus:outline focus:outline-purple-800"
                    placeholder="🔍 Filter cards..."
                />

                <div className="w-1/3 flex font-bold text-xs text-[#6E6894] gap-2">
                    <button className="cursor-pointer p-2 px-4 border border-[#231F3B] rounded-lg">BUG</button>
                    <button className="cursor-pointer p-2 px-4 border border-[#231F3B] rounded-lg">FEAT</button>
                    <button className="cursor-pointer p-2 px-4 border border-[#231F3B] rounded-lg">DOCS</button>
                </div>
            </div>
            <hr className="w-full h-px bg-[#1C192E]" />
        </div>
    )
}

export default Header