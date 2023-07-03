'use client';

import React, {useCallback, useState} from 'react';
import {SafeReservation, SafeUser} from "@/app/types";
import Container from "@/app/components/Container";
import Heading from "@/app/components/Heading";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "@/app/components/listings/ListingCard";

type ReservationClientProps = {
  reservations: SafeReservation[];
  currentUser: SafeUser;
};

const ReservationClient: React.FC<ReservationClientProps> = ({
    reservations,
    currentUser
}) => {

  const router = useRouter();
  const [deletingId, setDeletingId] = useState('');

  const onCancel = useCallback(() => {
      setDeletingId(id);
      axios.delete(`/api/reservations/${id}`)
          .then(() => {
              toast.success("Reservation cancelled");
              router.refresh();
          })
          .catch(() => {
              toast.error("Something went wrong.");
          })
          .finally(() => {
              setDeletingId('');
          })
  }, [router]);

  return (
    <Container>
        <Heading
            title="Reservations"
            subtitle="Booking on your properties"
        />
        <div className="
            ag-row-group-indent-10grid
            gird-cols-1
            sm:gird-cols-2
            md:gird-cols-3
            lg:gird-cols-4
            xl:gird-cols-5
            2xl:gird-cols-6
            gap-8
        ">
            {
                reservations.map((reservation) => (
                    <ListingCard
                        key={reservation.id}
                        data={reservation.listing}
                        reservation={reservation}
                        actionId={reservation.id}
                        onAction={onCancel}
                        disabled={deletingId === reservation.id}
                        actionLabel="Cancel guest reservation"
                        currentUser={currentUser}
                    />
                ))
            }
        </div>
    </Container>
  );
};

export default ReservationClient;