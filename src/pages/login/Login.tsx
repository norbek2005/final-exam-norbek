import { useState } from "react"
import instance from "../admin/RegisterAndLogin"
import { useDispatch } from "react-redux"
import { login } from "../../reduxToolkit/authslice"
import './Login.css'
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Login = () => {
    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false) 
    const navigate = useNavigate()

    const handleLogin = async (e: React.FormEvent) => { 
        e.preventDefault()
        setLoading(true) 

        try {
            const response = await instance.post("/auth/login", { email, password })
            if (response.data.access_token) {
                toast.success("Successfull!")
                dispatch(login(response.data))
                navigate("/admin")
            }
        } catch (error) {
            toast.warning("not registered yet!")
            toast.warning(error.response.data.message + "  " + "  " + "if you have not registered yet please register first!")
        } finally {
            setLoading(false) 
        }
    }

    return (
        <div className="login">
            <Link to={"/"}><img width={200} className="login_logo" src="https://cdn.worldvectorlogo.com/logos/ebay-3.svg" alt="" /></Link>
            <div className="login_frame">
                <img src="https://ir.ebaystatic.com/cr/v/c01/buyer_dweb_individual.jpg" alt="" />
                <div className="login_wrapper">
                    <h2 className="login_title">Login</h2>
                    <form onSubmit={handleLogin} className="login_form">
                        <input className="input1" type="email" value={email} placeholder='Your email' onChange={e => setEmail(e.target.value)} />
                        <input className="input1" type="password" value={password} placeholder='Your password' onChange={e => setPassword(e.target.value)} />
                        <button className="login_btn" disabled={loading}>{loading ? 'Waiting' : 'Login'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
