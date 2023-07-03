'use client'

import axios from 'axios';
import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import useRegisterModal from "@/app/hooks/useRegisterModal";
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import {signIn} from "next-auth/react";
import useLoginModal from "@/app/hooks/useLoginModal";

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        axios.post('/api/register', data)
            .then(() => {
                toast.success('Registered!');
                registerModal.onClose();
                loginModal.onOpen();
            })
            .catch((error) => toast.error('Something went wrong') )
            .finally(() => setIsLoading(false));
    }

    const toggle = useCallback(() => {

        registerModal.onClose();
        loginModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to Airbnb'
                subtitle='Create an account!'
            />
            <Input id='email' label='Email' register={register} errors={errors} disabled={isLoading} required />
            <Input id='name' label='Name' register={register} errors={errors} disabled={isLoading} required />
            <Input id='password' label='Password' type='password' register={register} errors={errors} disabled={isLoading} required />
        </div>
    );

    const footerContent = (
        <div className='flex flex-col gap-4 mt-3'>
            <hr/>
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => signIn('google')}
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => signIn('github')}
            />
            <div className='text-neutral-500
            text-center
            mt-4
            font-light'>
                <div className='justify-center flex flex-row items-center gap-2'>
                    <div >
                        Already have an account?
                    </div>
                    <div
                        className='text-neutral-800 cursor-pointer hover:underline'
                        onClick={toggle}
                    >
                        Log In
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            disabled={isLoading}
            title={'Register'}
            isOpen={registerModal.isOpen}
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={'Continue'}
            body={bodyContent}
            footer={footerContent}
         />
    )
}
export default RegisterModal;