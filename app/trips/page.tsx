import React from 'react';
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import getReservations from "@/app/actions/getReservations";
import TripsClient from "@/app/trips/TripsClient";

const TripsPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
      return (
          <EmptyState
            title="Unauthroized"
            subtitle="Please login"
          />
      )
  }

  const reservations = await getReservations({
      userId: currentUser.id
  });

  if (reservations.lenght === 0) {
      return (
          <EmptyState
            title="No trips found"
            subtitle="Looks like you havent reserved any trips"
          />
      )
  }

  return (
    <div>
        <TripsClient
            reservations={reservations}
            currentUser={currentUser}
        />
    </div>
  );
};

export default TripsPage;