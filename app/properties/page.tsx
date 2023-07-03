import React from 'react';
import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import getListings from "@/app/actions/getListing";
import PropertiesClient from "@/app/properties/PropertiesClient";

const PropertiesPage = async () => {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
      return (
          <EmptyState
            title="Unauthroized"
            subtitle="Please login"
          />
      )
  }

  const listings = await getListings({
      userId: currentUser.id
  });

  if (listings.length === 0) {
      return (
          <EmptyState
            title="No properties found"
            subtitle="Looks like you have no properties"
          />
      )
  }

  return (
    <div>
        <PropertiesClient
            listings={listings}
            currentUser={currentUser}
        />
    </div>
  );
};

export default PropertiesPage;