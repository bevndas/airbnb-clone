import React from 'react';
import Image from "next/image";

'use-client';
interface AvatarProps {
    src: string | null | undefined;
}

const Avatar: React.FC<AvatarProps> = ({
    src
}) => {
    return (
        <Image
            className='rounded-full'
            src={src || '/images/placeholder.jpg'}
            alt='Avatar'
            height={30}
            width={30}
        />
    )
}
export default Avatar;