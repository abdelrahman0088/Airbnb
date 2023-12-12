import prisma from '@/app/libs/prismadb'
import getCurrentUser from './getCurrentUser'

export default async function getFavoriteListing() {
    try {

        const currentUser = await getCurrentUser();
        if (!currentUser) {

            return [];
            
        }

        const favorits = await prisma.listing.findMany({

                where: {
                        id: {
                            in: [...currentUser.favoriteIds || []]

                        }


                }


        })

        const safeFavorits = favorits.map((fav)=>({

                ...fav,
                createdAt: fav.createdAt.toISOString()


        }) )

        return safeFavorits;
        
    } catch (error:any) {
        throw new Error(error);
        
    }
    
}