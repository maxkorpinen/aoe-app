import { useSelector } from 'react-redux'
import CivsList from './CivsList'
import Guide from './analysis/Guide'
import UserInfo from './UserInfo'
import AboutPage from './AboutPage'

const PageChooser = () => {
  const page = useSelector(state => state.pageState.page)
  return(
    <>
      {page==='choose' &&
        <CivsList/>}
      {page ==='guide' &&
        <Guide/>}
      {page === 'user' &&
        <UserInfo/>}
      {page === 'about' &&
        <AboutPage/>}
    </>
  )
}

export default PageChooser