import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai"
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";

const SignIn = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    });

    const {email, password} = formData;
    const navigate = useNavigate();
    function onChange(e){
        setFormData((prevState) => ({
            ...prevState,
            [e.target.id] : e.target.value
        }))
    }
    async function onSubmit(e){
        e.preventDefault();
        try {
            const auth = getAuth();
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            if(userCredential.user){
                navigate("/")
            }

        } catch(error) {
            toast.error(error.message);
        }
    }

    return ( 
        <section className="w-full min-h-[100vh] mt-[-75px] border-box pt-80px flex items-center justify-center">
            <div>
            <h1 className="text-3xl text-center mt-6 font-bold ">Sign In</h1>
            <div className="flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto">
                <div className="md:w-[67%] lg:w-[50%] mb-12 md:mb-6">
                    <img className="w-full rounded-2xl" src="/assets/stock-cinema.webp" alt="movie theater" />
                </div>
                <div className="w-full md:w-[67%] lg:w-[40%] lg:ml-20">
                    <form onSubmit={onSubmit}>
                        <input 
                        className="w-full mb-6 px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded ease-in-out"
                        type="email" 
                        id="email" 
                        value={email}
                        onChange={onChange}
                        placeholder="Email address"
                          />
                        <div className="relative mb-6">
                            <input 
                            className="w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded ease-in-out"
                            type={showPassword ? "text" : "password"}
                            id="password" 
                            value={password}
                            onChange={onChange}
                            placeholder="Password"
                            />
                            {showPassword ? 
                            <AiFillEyeInvisible className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)} />: 
                            <AiFillEye className="absolute right-3 top-3 text-xl cursor-pointer" onClick={() => setShowPassword((prevState) => !prevState)}/>
                            }
                        </div>
                        <div className="flex justify-between whitespace-nowrap text-sm sm:text-lg">
                            <p className="mb-6">Don't have an account?
                                <Link to="/signup" className="ml-1 text-red-600 hover:text-red-700 transition duration-200 ease-in-out">Register</Link>
                            </p>
                            <p>
                                <Link to="/forgotpassword" className="text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out">Forgot Password?</Link>
                            </p>
                        </div>
                            <button 
                            type="submit" 
                            className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white px-7 py-3 text-sm font-medium uppercase rounded shadow-sm transition duration-150 ease-in-out hover:shadow-md"
                        >Sign In</button>
                        <div className="flex items-center my-4 before:border-t before:flex-1 before:border-gray-300 after:border-t after:flex-1 after:border-gray-300">
                            <p className="uppercase text-center font-semibold mx-4">or</p>
                        </div>
                        <OAuth />
                        
                    </form>
                </div>
            </div>
            </div>
        </section>
     );
}
 
export default SignIn;