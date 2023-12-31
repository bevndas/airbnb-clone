import React from 'react';
import getListingById from "@/app/actions/getListingById";
import EmptyState from "@/app/components/EmptyState";
import getCurrentUser from "@/app/actions/getCurrentUser";
import ListingClient from "@/app/listings/[listingId]/ListingClient";
import getReservations from "@/app/actions/getReservations";

type IParams = {
listingId?: string;
};

const ListingPage = async ({params} : {params: IParams}) => {
   const listing = await getListingById(params);
   const reservations = await getReservations(params);
   const currentUser = await getCurrentUser();

   if (!listing) {
       return (
           <EmptyState  />
       )
   }

  return (
    <ListingClient
        listing={listing}
        currentUser={currentUser}
        reservation={reservations}
    />
  );
};

export default ListingPage;