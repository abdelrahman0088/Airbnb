import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getReservations from "../actions/getReservations";
import getCurrentUser from "../actions/getCurrentUser";
import ReservationsClient from "./ReservationsClient";


const ReservationsPage = async function () {

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

            {authorId: currentUsr.id}
    )

            if (reserv.length === 0) {
                return <ClientOnly>
                    <EmptyState
                    title="No Reservations for this property"
                    subtitle="Wait to get your first reservation"
                    
                    />

                </ClientOnly>
                
            }


            return (<ClientOnly>
                <ReservationsClient
                reservations={reserv}
                currentUser = {currentUsr}
                
                />


                


            </ClientOnly>)
}


export default ReservationsPage