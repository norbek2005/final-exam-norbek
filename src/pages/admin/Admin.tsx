import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import instance from "./RegisterAndLogin"
import { getUserProfile } from "../../reduxToolkit/authslice"
import './Admin.css'

const Admin = () => {
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch()
    const token = useSelector((state: any) => state.auth.token)
    const profile = useSelector((state: any) => state.auth.user)

    console.log(profile);


    useEffect(() => {
        instance.get("/auth/profile", {
            headers: {
                "Authorization": "bearer " + token
            }
        })
            .then(response => {
                dispatch(getUserProfile(response.data));
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            })
            .catch(error => {
                console.log(error);
                setLoading(false);
            });

    }, [])

    return (
        <div>
            {loading ? (
                <div className="loader" style={{ textAlign: 'center', marginTop: '50px' }}></div>
            ) : (
                profile && (
                    <div className="profile">
                        <div className="profile-frame">
                            <div className="img-div" style={{ backgroundImage: `url(${profile.avatar})` }}>
                            </div>
                            <p className="profile-p"><span>name: </span>{profile.name}</p>
                            <p className="profile-p"><span>role: </span>{profile.role}</p>
                            <p className="profile-p"><span>email: </span> {profile.email}</p>
                        </div>
                    </div>
                )
            )}
        </div>
    )
}

export default Admin
