import getCurrentUser from "@/app/actions/getCurrentUser";
import prismadb from "@/app/libs/prismadb";

export default async function getFavoriteListings() {
    try {
     const currentUser = await getCurrentUser();
     if (!currentUser) {
         return [];
     }
     const favorites = await prismadb.listing.findMany({
         where: {
             id: {
                 in: [...(currentUser.favoriteIds || [])]
             }
         }
     });
     const safeFavorites = favorites.map((favorite) => ({
         ...favorite,
         createdAt: favorite.createdAt.toISOString()
     }))
        return safeFavorites;
    }
    catch (error: any) {
        throw new Error(error);
    }
}