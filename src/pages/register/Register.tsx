import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import instance from '../admin/RegisterAndLogin'
import { useDispatch } from 'react-redux'
import { register } from '../../reduxToolkit/authslice'
import './Register.css'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [avatar, setAvatar] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            const response = await instance.post("/users/", { name, email, password, avatar })
            if (response.data.id) {
                alert("Successfully registered!")
                dispatch(register(response.data))
                navigate("/login")
            }
        } catch (error) {
            console.log(error)
            error.response.data.message.forEach(msg => {
                toast.warning(msg)
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='register_container'>
            <Link to={"/"}><img width={200} className="login_logo" src="https://cdn.worldvectorlogo.com/logos/ebay-3.svg" alt="" /></Link>
            <div className="register_frame">
                <img className='register_img' src="https://ir.ebaystatic.com/cr/v/c01/buyer_dweb_business.jpg" alt="" />
                <div className='register_wrapper'>
                    <p className='register_text'>Already have an account? <Link to="/login">Login</Link></p>
                    <h2 className='register_title'>Register</h2>
                    <form onSubmit={handleSubmit} className='register_form'>
                        <input className='input' type="text" value={name} placeholder='Your name' onChange={e => setName(e.target.value)} />
                        <input className='input' type="email" value={email} placeholder='Your email' onChange={e => setEmail(e.target.value)} />
                        <input className='input' type="password" value={password} placeholder='Your password' onChange={e => setPassword(e.target.value)} />
                        <input className='input' type="url" value={avatar} placeholder='Your avatar URL' onChange={e => setAvatar(e.target.value)} />
                        <button className='register_btn' disabled={loading}>{loading ? 'Registering...' : 'Register'}</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Register
