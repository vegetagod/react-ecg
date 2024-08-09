import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import VerifyUserWithMobileNo from "./components/VerifyUserWithMobileNo";

function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [idToken, setIdToken] = useState("")

  useEffect(() => {
    liff
      .init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
        setMessage("LIFF init succeeded.");
          setIdToken(liff.getIDToken())
      })
      .catch((e) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  });

  return (
      <div className="App font-notosans">
          <div className={"flex-row justify-center text-center"}>
          </div>
          <VerifyUserWithMobileNo liff_id_token={idToken}/>
      </div>
  );
}

export default App;
