/** @format */

"use client";

import Container from "../components/Container";
import Heading from "../components/Heading";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import ListingCard from "../components/listings/ListingCard";
interface FavsCp {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}
const FavoritsClient: React.FC<FavsCp> = function ({ listings, currentUser }) {
  return (
    <Container>
      <Heading
        title='Favorits'
        subtitle='Here you can see all of your favorit places'
      />

      <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
        {listings.map((listing) => (
          <ListingCard
            currentUser={currentUser}
            key={listing.id}
            data={listing}
          />
        ))}
      </div>
    </Container>
  );
};
export default FavoritsClient;
