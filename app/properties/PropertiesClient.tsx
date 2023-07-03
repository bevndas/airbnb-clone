'use client';

import React, {useCallback, useState} from 'react';
import {SafeListing, SafeUser} from "@/app/types";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "@/app/components/listings/ListingCard";

type PropertiesClientProps = {
    listings: SafeListing;
    currentUser: SafeUser;
};

const PropertiesClient: React.FC<PropertiesClientProps> = ({
    listings,
    currentUser
}) => {

    const router= useRouter();
    const [deletingId, setDeletingId] = useState('');

    const onRemove = useCallback((id: string) => {
        setDeletingId(id);
        axios.delete(`/api/listing/${id}`)
            .then(() => {
                toast.success('Property Removed');
                router.refresh();
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error);
            })
            .finally(() => {
                setDeletingId('');
            });
    }, [router]);

  return (
    <Container>
        <Heading
            title="Your Properties"
            subtitle="Here are the properties you have enlisted in Airbnb"
        />
        <div className="
            mt-10
            grid
            gird-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
        ">
            {
                listings.map((listing) => (
                    <ListingCard
                        key={listing.id}
                        data={listing}
                        actionId={listing.id}
                        onAction={onRemove}
                        disabled={deletingId === listing.id}
                        actionLabel="Remove Property"
                        currentUser={currentUser}
                    />
                ))
            }
        </div>
    </Container>
  );
};

export default PropertiesClient;