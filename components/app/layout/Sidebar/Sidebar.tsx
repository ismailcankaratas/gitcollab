import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import MenuItem from './MenuItem';
import Logout from './Logout';
import { useCollabRepos } from '@/hooks/CollabRepo/useCollabRepos';
import Link from 'next/link';

const menuItems = [
    {
        name: 'Home',
        icon: 'bi bi-house-door-fill',
        link: '/app'
    }
]
export default function Sidebar() {
    const [active, setActive] = useState<boolean>(false);
    const [dropdown, setDropdown] = useState<boolean>(false);
    const router = useRouter();
    const { data: session, status } = useSession({
        required: true,
        onUnauthenticated() {
            router.push('/')
        }
    })
    const [repos, setRepos] = useState<any>([]);
    const { data, isLoading } = useCollabRepos();
    useEffect(() => {
        async function fetchRepos() {
            setRepos(data);
        }
        if (data) {
            fetchRepos();
        }
    }, [data])

    function openSidebar() {
        setActive(!active)
    }
    function openDropdown() {
        setDropdown(!dropdown)
    }
    return (
        <>
            <span
                className="absolute text-white text-4xl top-5 left-4 cursor-pointer z-50"
                onClick={() => openSidebar()}
            >
                <i className="bi bi-filter-left px-2 bg-gray-900 rounded-md"></i>
            </span>
            <div
                className={`${active ? 'hidden' : ''} z-50 pr-4 fixed flex flex-col top-0 bottom-0 lg:left-0 p-2 w-[300px] overflow-y-auto text-center bg-gc-primary`}
            >
                <div className="text-gray-100 text-xl">
                    <div className="p-2.5 mt-1 flex items-center">
                        <i className="px-2 py-1 rounded-md bg-gc-secondary">GC</i>
                        <h1 className="font-bold text-gray-200 text-[15px] ml-3">
                            Git Collab
                        </h1>
                        <i
                            className="bi bi-x cursor-pointer ml-28 lg:hidden"
                            onClick={() => openSidebar()}
                        ></i>
                    </div>
                    <div className="my-2 bg-gray-600 h-[1px]"></div>
                </div>
                <div
                    className="p-2.5 flex items-center rounded-md px-4 duration-300 cursor-pointer bg-gray-700 text-white"
                >
                    <i className="bi bi-search text-sm"></i>
                    <input
                        type="text"
                        placeholder="Search"
                        className="text-[15px] ml-4 w-full bg-transparent focus:outline-none"
                    />
                </div>
                {
                    menuItems.map((item, index) => {
                        return (
                            <MenuItem item={item} key={index} />
                        )
                    })
                }

                <div className="my-4 bg-gray-600 h-[1px]"></div>
                <div
                    className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-gc-gray text-white"
                    onClick={() => openDropdown()}
                >
                    <i className="bi bi-chat-left-text-fill"></i>
                    <div className="flex justify-between w-full items-center">
                        <span className="text-[15px] ml-4 text-gray-200 font-bold">Repos</span>
                        <span className={`${dropdown ? 'rotate-180' : 'rotate-0'} text-sm`}
                        >
                            <i className="bi bi-chevron-down"></i>
                        </span>
                    </div>
                </div>
                <div
                    className={`${dropdown ? '' : 'hidden'} text-left text-sm mt-2 w-4/5 mx-auto text-gray-200 font-bold`}
                >
                    {!isLoading ? (
                        repos.length > 0 ? (
                            repos.map((repo: any, index: number) => {
                                return (
                                    <Link href={`/app/repos/${repo.owner.login}/${repo.name}`}
                                        className="flex items-center text-sm cursor-pointer p-2 hover:bg-gc-gray rounded-md mt-1" key={index}>
                                        <span>
                                            {repo.name}
                                        </span>
                                        <span>&nbsp;·&nbsp;</span>
                                        <span className='text-xs text-gc-gray-light'>
                                            {repo.owner.login.substring(0, 10)}...
                                        </span>
                                    </Link>
                                )
                            })
                        ) : "No repos found"
                    ) : "Loading..."}
                </div>
                <Logout />
            </div>
        </>
    )
}