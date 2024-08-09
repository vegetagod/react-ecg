
export default function VerifyUserWithMobileNo(props){

    const {liff_id_token} = props

    return (
        <div className={"flex-row justify-center text-center min-h-screen"}>
            <div className={"pt-10 flex-row"}>
                <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-24 rounded-full ring ring-offset-2">
                        <img src="https://www.ecg-research.com/img/about-ecg-1.8c33b9fb.png"/>
                    </div>
                </div>
            </div>
            <div className={"pt-10"}>
                <input
                    type='number'
                    inputMode='numeric'
                    pattern="[08][0-9]{10}"
                    placeholder="กรุณาระบุเบอร์โทรศัพท์"
                    className="input input-bordered input-primary w-full max-w-xs"/>
                <b>{liff_id_token}</b>
                </div>
            <div className={"pt-5"}>
                <button className="text-lg text-white btn btn-primary w-full max-w-xs">ยืนยันข้อมูล</button>
            </div>
        </div>
    )
}