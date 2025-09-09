import { SignInButton, SignOutButton } from '@clerk/nextjs';
import { currentUser } from '@clerk/nextjs/server';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react'
import Logo from './logo';
import Modal from './modal';

const Navbar = async () => {
    const user = await currentUser()

    return (
        <div className='bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 fixed w-full z-50 border-none top-0'>
            <div className='container mx-auto z-10 relative'>
                <div className="navbar shadow-sm">
                    <div className="navbar-start">
                        <Link href={"/"} className="btn btn-ghost text-xl flex gap-2">
                            <Logo />
                            <h4 className='bg-gradient-to-r from-blue-400 via-blue-300 to-blue-400 bg-clip-text text-transparent'>Money Tracker</h4>
                        </Link>
                    </div>
                    <div className="navbar-center hidden lg:flex">
                        <ul className="menu menu-horizontal px-1 text-lg">
                            <li><Link href={"/"}>Home</Link></li>
                            <li>
                                <Link href={"/about"}>About</Link>
                            </li>
                            <li><Link href={"/contact"}>Contact</Link></li>
                        </ul>
                    </div>

                    <div className="navbar-end">

                        <Link href={"/sign-in"} className={`btn btn-active btn-info rounded-2xl text-white font-bold ${user ? "hidden" : ""}`} >Sign In 🦭</Link>

                        <div className={`${user ? "lg:flex" : ""} hidden`}>
                            <div className="dropdown dropdown-hover ">
                                <div tabIndex={0} role='button' className='avatar p-3 flex gap-4'>
                                    <div className="w-[3rem] rounded-full">
                                        <Image src={user?.imageUrl} width={400} height={400} alt='' />
                                    </div>
                                    <ul>
                                        <li className='font-bold'>{user?.fullName}</li>
                                        <li>{user?.emailAddresses[0].emailAddress}</li>
                                    </ul>
                                </div>

                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
                                    <li>

                                        <SignOutButton redirectUrl='/' >
                                            <span className='btn btn-active btn-info rounded-2xl text-white font-bold'>
                                                Sign Out
                                            </span>
                                        </SignOutButton>

                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 p-2 shadow">
                                {/* drop down mobile */}
                                <li className={`${user ? "" : "hidden"}`}><div className="avatar p-3 flex">
                                    <div className="w-[3rem] rounded-full">
                                        <Image src={user?.imageUrl} width={100} height={100} alt=''/>
                                    </div>
                                    <ul>
                                        <li className='font-bold'>{user?.fullName}</li>
                                        <li>{user?.emailAddresses[0].emailAddress}</li>
                                    </ul>
                                </div>
                                    {/* modal */}
                                    <Modal>
                                        <h3>hello dunia</h3>
                                        <form action="POST">
                                            <input type="text" />
                                            <input type="checkbox" name="s" id="s" />
                                            <button>submit</button>
                                        </form>
                                    </Modal>
                                </li>
                                <li><Link href={"/home"}>Home</Link></li>
                                <li>
                                    <Link href={"/about"}>About</Link>
                                </li>
                                <li><Link href={"/contact"}>Contact</Link></li>
                                <li className='mt-5'>
                                    {user ? (<SignOutButton redirectUrl='/'>
                                        <span className='btn btn-active btn-info rounded-2xl text-white font-bold'>Sign Out</span>
                                    </SignOutButton>) : <SignInButton>
                                        <span className='btn btn-active btn-info rounded-2xl text-white font-bold'>Sign In</span>
                                    </SignInButton>}
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar