import { useEffect, useState } from "react";
import liff from "@line/liff";
import "./App.css";
import VerifyUserWithMobileNo from "./components/VerifyUserWithMobileNo";
import {QueryClient, QueryClientProvider} from "react-query";

const queryClient = new QueryClient()
function App() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [idToken, setIdToken] = useState("")
  const [lineContext, setLineContext] = useState(null)

  useEffect(() => {
    liff.init({
        liffId: import.meta.env.VITE_LIFF_ID
      })
      .then(() => {
          // liff.ready.then(() => {
              setIdToken(liff.getIDToken)
              const context = liff.getContext();
              setLineContext(context)
              console.log(context);
          // });

      })
      .catch((e) => {
        setMessage("LIFF init failed.");
        setError(`${e}`);
      });
  },[]);

  return (
      <QueryClientProvider client={queryClient}>
      <div className="App font-notosans">
          <div className={"flex-row justify-center text-center"}>
          </div>
          <VerifyUserWithMobileNo liff_id_token={idToken} line_context={lineContext}/>
      </div>
      </QueryClientProvider>
  );
}

export default App;
