import { checkCollection, getLocations } from '@/lib/data'
import styles from './page.module.css'
import LocationList from '@/components/locationList/LocationList';

const Home = async () => {
  const locations = await getLocations();

  console.log('locations: ', locations)

  return (
    <main>
      HomePage!
      <LocationList locations={locations} />
    </main>
  )
}

export default Home;