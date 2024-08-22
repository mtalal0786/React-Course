import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button,Input,Logo} from './index'
import { useDispatch } from 'react-redux'
import authService from '../appwrite/auth'
import {useForm} from 'react-hook-form'

function Login() {
    const dispath = useDispatch()
    const navigate = useNavigate()
    const {register,handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
           const session =  await authService.login(data)
           if (session) {
                const userData = await authService.getCurrentUser() //always use await to ge user data
                if (userData) dispath(authLogin(userData))            
                navigate('/')
           }
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div 
    className="flex  justify-center items-center w-full"
    >
        <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
        >
            <div className='mb-2 flex justify-center '>
                <span className=' inline-block w-full max-w-[100px]'>
                    <Logo width='100%'  />
                </span>
            </div>
            <h2 className=' text-center text-2xl font-bold leading-tight'
            >
                Sign In to your Account
            </h2>
            <p className=' mt-2 text-center text-base text-black/60 '
            >
                Don&apos;t have any Account?&nbsp;
                <Link 
                to='/signup'
                className=' font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign Up
                </Link>
            </p>
            {
                error && <p className='mt-8 text-center text-red-600'>
                    {error}
                        </p>
            }
            <form className='mt-8' onSubmit={handleSubmit(login)}>
                <div className='space-y-5'>
                    <Input
                    label = "Email"
                    placeholder = "Enter your email"
                    type="email"
                    {...register('email',{
                        required: true,
                        validate: {
                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.
                            test(value) ||
                            "Email address must be a valid Address",
                        }
                    })} //always use ... with register and give uniquvalue like email
                    />
                    <Input
                    label   = "Password: "
                    type="password"
                    placeholder = "Enter your password"
                    {
                        ...register('password',{
                            required: true,
                            validate: {
                                minLength: (value) => value.length >= 8,
                                maxLength: (value) => value.length <= 20,
                                test: (value) => (value.length >= 8 || 'Password must be at least 8 characters') && (value.length <= 20 || 'Password must be less than 20 characters'),
                            
                            }
                        })
                    }
                    />
                    <Button
                    type="submit"
                    className=' w-full'
                    >
                        Sign In
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login