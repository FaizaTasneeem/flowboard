function BoardSkeleton() {
    const skeletons = Array.from({ length: 4 });
    return (
        <>
            {skeletons && skeletons.map((col) => (
                <div className="w-1/4 p-2 bg-[#100E1D] border border-[#231F3B] rounded-lg">
                    <div className="flex flex-col animate-pulse">
                        <span className="p-2 flex justify-between items-center font-bold text-sm text-white">
                            <div className="flex gap-2 items-center">
                                <span className="p-2 w-2 h-2 rounded-full text-xs font-normal flex justify-center items-center bg-[#18182C] animate-pulse"></span>
                                <div className="px-10 py-4 shadow-2xl border border-[#2A2A45] rounded-lg animate-pulse"></div>
                            </div>

                        </span>
                        <hr className="mt-2 w-full h-px border-none bg-[#1C192E]" />

                        <div className="p-2 flex flex-col gap-2 text-[#E2E8F0]">
                            {skeletons?.map((card, idx) =>
                                <div className="w-full p-4 border border-[#2A2A45] rounded-lg animate-pulse"></div>
                            )}
                            <button className="mt-4 p-4 border border-dashed border-[#221E38] rounded-lg animate-pulse"></button>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}

export default BoardSkeleton