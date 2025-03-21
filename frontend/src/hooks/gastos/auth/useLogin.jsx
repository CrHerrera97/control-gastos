import { useState } from 'react';

import { fetchUser } from "../../../services/auth/loginService";


const useLogin = () =>{

    const [ respuesta, setRespuesta ] = useState(null)
    const [ error, setError ] = useState(null)


    const entrar = async (correo, password) =>{
        try {
            const data = await fetchUser(correo, password)
            setRespuesta(data)
        } catch (error) {
            setError(error)
        }

    }

    return { entrar, respuesta, error }
}

export default useLogin;