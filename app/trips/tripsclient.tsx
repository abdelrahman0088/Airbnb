'use client'

import { useRouter } from "next/navigation";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeReservation, SafeUser } from "../types"
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";
interface TripsCp {
    reservations: SafeReservation[];
    currentUser?: SafeUser | null;


}
const TripsClient: React.FC<TripsCp> = function ({

    reservations,
    currentUser


}) {
    const router = useRouter();
    const [deletId, setDeleteid] = useState("")
    const onCancel = useCallback((id: string) => {
        setDeleteid(id)
        axios.delete(`/api/resrvations/${id}`).then(() => {
            toast.success('Cancelled')
            router.refresh();
        }

        )
            .catch((erorr) => { toast.error(erorr?.response?.data?.erorr) })
            .finally(() => { setDeleteid('') })


    }, [router])

    return <Container>
        <Heading
            title="Trips"
            subtitle="Here you can see all of your Trips"

        />

        <div className="
mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8

">

{reservations.map((reserv)=>
<ListingCard
key={reserv.id}
data={reserv.listing}
actionId={reserv.id}
onAction={onCancel}
disabled={deletId === reserv.id}
actionLabel="Cancel Trip"
currentUser={currentUser}

/>


)
}
        </div>

    </Container>


}
export default TripsClient