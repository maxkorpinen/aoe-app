import { useState, useEffect } from 'react'
import matchService from '../../services/matches'

const AboutPage = () => {
  const [version, setVersion] = useState('')
  useEffect(() => {
    matchService.getVersion().then((ver) => {
      setVersion(ver.version)
    })
  }, [])
  if(!version) {
    return null
  }
  return(
    <div>
      <h2>AoE App</h2>
      <p>Welcome, noble noobster-strategist, to the ultimate guide in your quest for total domination in the Age of Empires 2 realm. Whether you are planning to storm your enemies with a horde of elephants or rain down a flurry of arrows, this still to-be-named companion app is your go-to scroll of wisdom.</p>
      <h3>What is this sorcery?</h3>
      <p>Ever found yourself pondering in the dead of night, What in the kingdom should I do with the Byzantines against the Goths on Black Forest? Worry no more! Our app is like a wise sage, but without the beard, offering you the ultimate army composition to lead you to victory, or at least a glorious defeat.</p>
      <h3>How to unleash the magic?</h3>
      <ol>
        <li><b>Choose Your Civ</b>: Are you feeling spicy like a cinnamon roll fresh from the Turkish Sauna? Pick it! Pick your stupid Turks, you clown!</li>
        <li><b>Select Your Foe</b>: Identify the unlucky civilization that dares stand in your way.</li>
        <li><b>What do your elf-eyes see</b>: Facing Huskarl spam? Worry not, we will show you the way out! Click what you see, we tell you what to make.</li>
      </ol>
      <h3>Disclaimers</h3>
      <p>Our app is still in its infancy, so expect some bugs and missing features. We are working hard to make it better, so please bear with us. Also, we are not responsible for any losses, rage quits, or broken keyboards that may result from following our advice. Use at your own risk.</p>
      <p>Also, we know you expected monks and siege, but do not expect that unless you are higher ELO, and when you are, you do not need this app anymore so stop complaining and keep your mangonels in your pants.</p>
      {/* <a href="https://aoestats.io/api-info/">Civ winpct stats gathered from here</a>
      <p>{version}</p> */}
    </div>
  )
}

export default AboutPage