import ConfirmModal from "./ConfirmModal";
import {useState} from "react";
import {useMutation, useQueryClient} from "react-query";
import {useForm} from "react-hook-form";
import axios from "axios";

export default function VerifyUserWithMobileNo(props){
    const {liff_id_token, line_context, liff} = props

    const[contentModal, setContentModal] = useState(<div/>)
    const openLineOfficial =()=>{
        window.open("https://lin.ee/YR1Kapk","_blank")
    }

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const queryClient = useQueryClient()

    const enableModal =(responseData)=>{

        const {user_id, display_name, status_message, picture_url, mobile_no} = responseData.data

        // alert(user_id + " " + display_name + " " + status_message + " " +picture_url)

        setContentModal(
            <div className={"flex-1 justify-center"}>
                <div className="avatar">
                    <div className="w-24 rounded-full">
                        <img src={picture_url}/>
                    </div>
                </div>
                <div className={"flex justify-center text-center"}>
                    <b>{display_name}</b>
                </div>
                <div className={"flex-row justify-center text-center"}>
                    <b>{status_message}</b>
                </div>
                <div className={"flex-row justify-center text-center"}>
                    <b>{mobile_no}</b>
                </div>
                <div className={"flex-row justify-center text-center"}>
                    <b className={"text-red-500"}>{user_id}</b>
                </div>
            </div>
        )
        document.getElementById('my_modal_1').showModal()
    }

    const onSubmitRegister = async (formData) => {
        // alert(JSON.stringify(formData))
        // alert(line_context.userId)

        const request = {
            mobile_no: formData.mobile_no,
            line_user_id: line_context.userId.toString()
            // line_user_id: "U57802f0ee059e4b5fefe07e525192376"
        }

        // alert(JSON.stringify(request))

        try{
            const response = await fetch("https://17c4-124-120-204-90.ngrok-free.app/check_line_ref_id", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    "Access-Control-Allow-Origin": "*"
                },
                body:JSON.stringify(request)
            })
            const json = await response.json()
            // alert(JSON.stringify(json))
            enableModal(json)
        }catch (error){
            alert(error.toString())
        }

    };

    const mutation = useMutation(onSubmitRegister, {
        onSuccess: (data) => {
            // Invalidate and refetch
            queryClient.invalidateQueries('submit_mobile_no');
            console.log('New post added:', data);
        },
        onError: (error) => {
            console.error('Error creating post:', error);
        },
    });

    const submitMobileForm = (data) => {
        mutation.mutate(data);
    };


    return (
        <div className={"flex-row justify-center text-center min-h-screen"}>
            <ConfirmModal liff={liff}>
                {contentModal}
            </ConfirmModal>
            <div className={"pt-10 flex-row"}>
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                        <img src="https://www.ecg-research.com/img/about-ecg-1.8c33b9fb.png"/>
                    </div>
                </div>
                <div className={"flex-row pt-5"}>
                    <b>ECG Demo</b>
                </div>
            </div>
            <form onSubmit={handleSubmit(submitMobileForm)}>
                <div className={"pt-5"}>
                    <input
                        type='number'
                        name={"mobile_no"}
                        {...register("mobile_no")}
                        inputMode='numeric'
                        pattern="[08][0-9]{10}"
                        placeholder="กรุณาระบุเบอร์โทรศัพท์"
                        className="input input-bordered input-primary w-full max-w-xs"/>
                    {/*<b>{liff_id_token}</b>*/}
                </div>
                <div className={"pt-5 flex justify-center"}>
                    <button className=" text-lg text-white btn btn-primary w-full max-w-xs"
                            type={"submit"}>Register
                    </button>
                </div>
                <div className={"pt-2 flex justify-center"}>
                    <button className="text-lg text-white btn bg-green-500 w-full max-w-xs"
                            onClick={() => openLineOfficial()}>Contact us
                    </button>
                </div>
            </form>
            <footer className="footer footer-center text-base-content rounded p-20">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} - All right reserved by Chayakorn Pamon.</p>
                </aside>
            </footer>
        </div>
    )
}