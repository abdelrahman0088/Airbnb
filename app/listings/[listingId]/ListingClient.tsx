"use client";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useMemo, useState, useCallback, useEffect } from "react";
import { eachDayOfInterval, differenceInCalendarDays } from "date-fns";
import { useRouter } from "next/navigation";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import Container from "@/app/components/Container";
import ListingInfo from "@/app/components/listings/ListingInfo";
import useLoginModal from "@/app/hooks/useLoginModal";
import ListingReservation from "@/app/components/listings/ListingReservation";
import { categories } from "@/app/components/navbar/Categories";

const initialDateRange = {

    startDate: new Date(),

    endDate: new Date(),
    key: 'selection'
}

interface ListingClientProps {
    reservation?: SafeReservation[];
    listing: SafeListing & {
        user: SafeUser
    };
    currentUser?: SafeUser | null;

}


const ListingClient: React.FC<ListingClientProps> = ({
    listing,
    reservation = [],
    currentUser
}) => {
    const LoginModal = useLoginModal();
    const router = useRouter();

    const disableDate = useMemo(() => {
        let dates: Date[] = [];
        reservation.forEach((reservation) => {
            const range = eachDayOfInterval({
                start: new Date(reservation.startDate),
                end: new Date(reservation.endDate)
            });
            dates = [...dates, ...range];

        });
        return dates;

    }, [reservation]);


    const [isloading, setIsloading] = useState(false);
    const [totalprice, setTotalprice] = useState(listing.price);
    const [dateRange, setDateRange] = useState(initialDateRange);
    const onCreateReservation = useCallback(() => {
        if (!currentUser) {
            return LoginModal.onOpen()
        }

        setIsloading(true);
        axios.post('/api/reservations', {
            totalprice,
            startDate: dateRange.startDate,

            endDate: dateRange.endDate,
            listingId: listing?.id
        }).then(() => {
            toast.success('Listing reserved!');
            setDateRange(initialDateRange);
            router.push('/trips')

        }).catch(() => {
            toast.error('something went wrong');
        }).finally(() => {
            setIsloading(false);
        })


    }, [
        totalprice,
        dateRange,
        listing?.id,
        router,
        currentUser,
        LoginModal,
    ]);




    useEffect(() => {

        if (dateRange.startDate && dateRange.endDate) {
            const dayCount = differenceInCalendarDays(
                dateRange.startDate,
                dateRange.endDate,
            );
            if (dayCount && listing.price) {
                setTotalprice(dayCount * listing.price);
            } else {
                setTotalprice(listing.price);
            }
        }

    }, [dateRange, listing.price]);








    const category = useMemo(() => {
        return categories.find((item) => item.label === listing.category);
    }, [listing.category])
        ;

    return (
        <Container>

            <div className="max-w-screen-lg mx-auto">
                <div className="flex flex-col gap-6">
                    {/* <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={listing.currentUser}
            /> */}
                    <div className="
            grid
            grid-col-1
            md:grid-col-7
            md:gap-10
            mt-6">
                        <ListingInfo
                            user={listing.user}
                            category={category}
                            description={listing.description}
                            roomCount={listing.roomCount}
                            guestCount={listing.guestCount}
                            bathroomCount={listing.bathroomCount}
                            locationValue={listing.locationValue} />
                        <div className="
                order-first
                mb-10
                md:order-last
                md:col-span-3
                ">

                            <ListingReservation
                                price={listing.price}
                                totalPrice={totalprice}
                                onChange={(value: any) => setDateRange(value)}

                                dateRange={dateRange}
                                onSubmit={onCreateReservation}
                                disabled={isloading}
                                disabledDates={disableDate}
                            />

                        </div>

                    </div>
                </div>
            </div>
        </Container>

    );
}
export default ListingClient;