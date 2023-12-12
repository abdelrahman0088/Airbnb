import prisma from '@/app/libs/prismadb'


interface IParams {

    listingId?:string,
    authorId?:string,
    userId?:string,

}

export default async function getReservations(params :IParams) {

    try {

        const { listingId,userId,authorId} = params
        const query: any = {}
    
        if (listingId) {
            query.listingId = listingId
            
        }
        if (userId) {
            query.userId = userId
    
            
        }
    
        if (authorId) {
            query.listing = {userId:authorId}
    
            
        }
       
        const reservs = await prisma.reservation.findMany({
                where: query,
                include: {
    
                        listing: true
    
                },
                orderBy: {
    
                    createdAt: 'desc'
                }
    
    
        })
    
    
        const safeReserv = reservs.map ((reserv)=> ({
                ...reserv,
                createAt: reserv.createdAt.toISOString(),
                startDate: reserv.startDate.toISOString(),
                endDate: reserv.endDate.toISOString(),
                listing: {
    
                    ...reserv.listing,
    
                    createdAt: reserv.listing.createdAt.toISOString()
                }
    
    
    
    
        }))
        return safeReserv
        
    } catch (error: any) {
        throw new Error(error)
        
    }
 
}