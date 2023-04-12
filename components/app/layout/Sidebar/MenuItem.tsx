import { useRouter } from "next/router"

export default function MenuItem({ item }: any) {
    const router = useRouter();
    return (
        <div
            className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gc-gray text-white"
            onClick={() => router.push(item.link)}
        >
            <i className={item.icon}></i>
            <span className="text-[15px] ml-4 text-gray-200 font-bold">{item.name}</span>
        </div >
    )
}