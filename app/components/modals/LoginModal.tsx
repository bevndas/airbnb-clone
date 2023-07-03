'use client'

import axios from 'axios';
import { AiFillGithub } from "react-icons/ai";
import {FcGoogle} from "react-icons/fc";
import {useCallback, useState} from "react";
import {FieldValues, SubmitHandler, useForm} from 'react-hook-form';
import Modal from "@/app/components/modals/Modal";
import Heading from "@/app/components/Heading";
import Input from "@/app/components/inputs/Input";
import toast from "react-hot-toast";
import Button from "@/app/components/Button";
import useLoginModal from "@/app/hooks/useLoginModal";
import { signIn } from "next-auth/react";
import {Router} from "next/router";
import {useRouter} from "next/navigation";
import useRegisterModal from "@/app/hooks/useRegisterModal";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const registerModal = useRegisterModal();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    });

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);
        signIn('credentials', {
            ...data,
            redirect: false
        }).then((callback) => {
                setIsLoading(false);
                if (callback?.ok) {
                    toast.success('Logged In');
                    router.refresh();
                    loginModal.onClose();
                }
                if (callback?.error) {
                    toast.error('Call back error');
                }
            })
    }

    const toggle = useCallback(() => {
        loginModal.onClose();
        registerModal.onOpen();
    }, [loginModal, registerModal]);

    const bodyContent = (
        <div className='flex flex-col gap-4'>
            <Heading
                title='Welcome to back!'
                subtitle='Login to your account!'
            />
            <Input id='email' label='Email' register={register} errors={errors} disabled={isLoading} required />
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
                        First time using Airbnb?
                    </div>
                    <div
                        className='text-neutral-800 cursor-pointer hover:underline'
                        onClick={toggle}
                    >
                        Create an account
                    </div>
                </div>
            </div>
        </div>
    );



    return (
        <Modal
            disabled={isLoading}
            title={'Login'}
            isOpen={loginModal.isOpen}
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel={'Continue'}
            body={bodyContent}
            footer={footerContent}
        />
    )
}
export default LoginModal;