import getCurrentUser from "@/app/actions/getCurrentUser";
import EmptyState from "@/app/components/EmptyState";
import getFavoriteListings from "@/app/actions/getFavoriteListings";
import FavoriteClient from "@/app/favorites/FavoriteClient";


const FavoritePage = async () => {
    const currentUser = await getCurrentUser();
    const listings = await getFavoriteListings();

    if (listings.length === 0) {
        return (
            <EmptyState
                title="No favorites found"
                subtitle="Looks like you have no favorites"
            />
        )
    }
    return (
       <FavoriteClient
        listings={listings}
        currentUser={currentUser}
       />
    )
}
export default FavoritePage;