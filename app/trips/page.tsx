import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getReservations from "../actions/getReservations";
import getCurrentUser from "../actions/getCurrentUser";
import TripsClient from "./TripsClient";


const TripsPage = async function () {

    const currentUsr = await getCurrentUser()

    if (!currentUsr) {

        return (
            <ClientOnly>
                <EmptyState
                    title="Not a User"
                    subtitle="Pleaase Sign Up or Login"

                />
            </ClientOnly>


        )

    }

    const reserv = await getReservations(

            {userId: currentUsr.id}
    )

            if (reserv.length === 0) {
                return <ClientOnly>
                    <EmptyState
                    title="Not Trips Reserved"
                    subtitle="Reserve your trip NOW !!"
                    
                    />

                </ClientOnly>
                
            }


            return (<ClientOnly>
                <TripsClient
                reservations={reserv}
                currentUser = {currentUsr}
                
                />


                


            </ClientOnly>)
}


export default TripsPage