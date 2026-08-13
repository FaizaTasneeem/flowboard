import { useEffect } from "react";
import Logo from "./Logo"

type HeaderParams = {
    title: string,
    label: string,
    setSearchParams: (param: { title: string; label: string }) => void,
    setTitle: (param: string) => void,
    setLabel: (param: string) => void,
}

function Header({ title, label, setSearchParams, setTitle, setLabel }: HeaderParams) {
    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchParams({ title, label });
        }, 500);

        return () => clearTimeout(timer);
    }, [title, label]);


    return (
        <div className="w-[75%] flex flex-col">
            <div className="flex p-4 px-10 gap-8">
                <Logo setSearchParams={setSearchParams} />
                <hr className="w-px h-8 bg-[#1C192E]" />

                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-2/3 p-2 border border-[#231F3B] rounded-lg bg-[#141223] font-normal text-sm placeholder-[#5D577D] focus:outline focus:outline-purple-800 text-[#6E6894]"
                    placeholder="🔍 Filter cards..."
                />

                <div className="w-1/3 flex font-bold text-xs text-[#6E6894] gap-2">
                    <label onPointerDown={(e) => e.stopPropagation()} className={`cursor-pointer p-2 px-4 border ${label === "bug" ? 'border-red-300' : 'border-[#231F3B]'} rounded-lg `} >
                        <input
                            type="radio"
                            name="label"
                            value={"bug"}
                            onChange={(e) => setLabel(e.target.value)}
                            hidden
                        />
                        BUG
                    </label>
                    <label onPointerDown={(e) => e.stopPropagation()} className={`cursor-pointer p-2 px-4 border ${label === "feat" ? 'border-green-300' : 'border-[#231F3B]'} rounded-lg `} >
                        <input
                            type="radio"
                            name="label"
                            value={"feat"}
                            onChange={(e) => setLabel(e.target.value)}
                            hidden
                        />
                        FEAT
                    </label>
                    <label onPointerDown={(e) => e.stopPropagation()} className={`cursor-pointer p-2 px-4 border ${label === "docs" ? 'border-blue-300' : 'border-[#231F3B]'} rounded-lg `} >
                        <input
                            type="radio"
                            name="label"
                            value={"docs"}
                            onChange={(e) => setLabel(e.target.value)}
                            hidden
                        />
                        DOCS
                    </label>

                    <button
                        name="clr-btn"
                        className={`cursor-pointer p-2 px-4 border border-[#231F3B] ${label !== "" || title !== "" ? '' : 'hidden'} rounded-lg `}
                        onClick={() => setSearchParams({ title: "", label: "" })}
                    >
                        Clear
                    </button>

                </div>

            </div>
            <hr className="w-full h-px bg-[#1C192E]" />
        </div>
    )
}

export default Header