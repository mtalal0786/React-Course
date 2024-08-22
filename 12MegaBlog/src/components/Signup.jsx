import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import authService from '../appwrite/auth'
import { login } from '../store/authSlice'
import { useDispatch } from 'react-redux'
import {Button,Input,Logo} from './index.js'
import { useForm } from 'react-hook-form'

function Signup() {
    const navigate = useNavigate()
    const [error,setError] = useState('')
    const dispatch = useDispatch()
    const {register,handleSubmit} = useForm()

    const create = async (data) => {
        setError("")
        try {
            const userData = await authService.createAccount(data)
            if (userData){
               const userData = await authService.getCurrentUser()
               if(userData) dispatch(login(userData));
               navigate("/")

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
                Sign up to Create an Account
            </h2>
            <p className=' mt-2 text-center text-base text-black/60 '
            >
                Already have an Account?&nbsp;
                <Link 
                to='/login'
                className=' font-medium text-primary transition-all duration-200 hover:underline'
                >
                    Sign In
                </Link>
            </p>
            {
                error && <p className='mt-8 text-center text-red-600'>
                    {error}
                        </p>
            }
            <form onSubmit={handleSubmit(create)}>
                <div className='space-y-5'>
                    <Input 
                    label = "Full Name"
                    placeholder = "Enter your full name"
                    {...register("name",{
                        required:{
                            value: true,
                            message: "Please enter your full name"
                        }
                    })}
                    />
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
                    label = "Password"
                    placeholder = "Enter your password"
                    type="password"
                    {...register('password',{
                        required: true,
                    })} //always use ... with register and give uniqu value like email
                    />
                    <Button
                    type="submit"
                    className='w-full'
                    >
                        Create Account
                    </Button>

                </div>
            </form>
        </div>
    </div>
  )
}


export default Signup