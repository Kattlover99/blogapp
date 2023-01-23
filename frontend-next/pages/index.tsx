import { useState,useEffect } from "react";
import Home from "../components/home";
import Login from "../components/login";
import ApiUsuarioService from "../services/ApiUsuarioService";

const usuarioService = new ApiUsuarioService();
export default function Index() {
const [estaAutenticado, setEstaAutenticado] = useState<boolean>(false);


useEffect(() => {
  setEstaAutenticado(usuarioService.estaAuthenticado());
}, []);

if(estaAutenticado){
  return <Home />
}
  return (
    <Login aposAutenticacao={()=>setEstaAutenticado(true)} />
  );
}
