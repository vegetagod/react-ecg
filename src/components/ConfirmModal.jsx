import {useEffect, useState} from "react";

export default function ConfirmModal(props){

    return (
        <dialog id="my_modal_1" className="modal w-full">
            <div className="modal-box max-w-3xl h-auto">
                {props.children}
                <div className="modal-action flex justify-center">
                    <form method="dialog">
                        <button className="btn bg-green-500 text-white">รับข้อมูลเข้าเรียบร้อย</button>
                    </form>
                </div>
            </div>
        </dialog>
    )
}