/** @format */

import EmptyState from "../components/EmptyState";
import ClientOnly from "../components/ClientOnly";
import getFavorits from "../actions/getFavoriteListing";
import getCurrentUser from "../actions/getCurrentUser";
import FavoritsClient from "./FavoritsClient";

const FavouritsPage = async function () {
  const currentUsr = await getCurrentUser();
  const listing = await getFavorits();

  if (listing.length === 0) {
    return (
      <ClientOnly>
        <EmptyState
          title='Not Favourits yet'
          subtitle='Start adding yor favourit places'
        />
      </ClientOnly>
    );
  }
  return (
    <ClientOnly>
      <FavoritsClient listings={listing} currentUser={currentUsr} />
    </ClientOnly>
  );
};

export default FavouritsPage;
