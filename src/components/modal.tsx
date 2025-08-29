'use client'
import React from 'react'

type Props = {
    children: React.ReactNode,
}

const Modal = (props: Props) => {
    return (
        <>
        {/* <button onClick={() => document.getElementById("profile_modal").showModal()}>open modal</button> */}
        <dialog id="profile_modal" className="modal">
            <div className="modal-box">
                <form method="dialog">
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                </form>
                {props.children}
            </div>
        </dialog>
        </>
    )
}

export default Modal