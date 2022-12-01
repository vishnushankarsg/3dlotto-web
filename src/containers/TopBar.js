import Icon from '@mdi/react'
import React from 'react'
import Logo from '../asset/lottofavcon.png'
import {ThemeContext, themes} from '../utils/theme/themeContext'
import {
    mdiPiggyBank,
    mdiGamepadVariant,
    mdiTextBoxMultiple,
    mdiLightbulb,
} from '@mdi/js'
import { Web3ModelButton } from './Web3ModelButton'
import { mdiChatQuestion, mdiTwitter } from '@mdi/js/mdi'
import { Link } from 'react-router-dom'

const discord = 'https://discord.gg/pyw28FKXME'
const twitter = 'https://twitter.com/3dloto'
const docs = 'https://docs.3dlotto.org/'

export default function TopBar() {
    const [darkMode, setDarkMode] = React.useState(true);
    const open = (url) => {
        window.open(url, '_blank')
    }

  return (
    <div className='top'>
        <div className='topBar' onClick={()=>{}}>
            <div className='topBar-action d-flex align-center'>
                <ThemeContext.Consumer>
                    {({ changeTheme }) => (
                        <button className='btn-icon c-pointer mx-1' onClick={() => {
                            setDarkMode(!darkMode);
                            changeTheme(darkMode ? themes.light : themes.dark)
                        }}>
                            <Icon className='bulb' path={mdiLightbulb} size={1} />
                        </button>
                    )}
                </ThemeContext.Consumer>
                <Link to="/">
                <div className='c-pointer d-flex' >
                    <img src={Logo} alt='' className='topBar-logo d-flex'/>
                    <h2>3DLotto</h2>
                </div>
                </Link>
            </div>
            
            
            <div className='topBar-action d-flex align-center'>
                <div className='topBar-links'>
                    <Link to="/">
                    <button className='btn-icon pa-2 mr-3'>
                        <Icon className='bulb mr-1' path={mdiPiggyBank} size={1}>
                        </Icon>
                        <h4>Defi</h4>
                    </button>
                    </Link>
                    <Link to="/oneDigiLotto">
                    <button className='btn-icon pa-2 mr-3'>
                        <Icon className='bulb mr-1' path={mdiGamepadVariant} size={1}>
                        </Icon>
                        <h4>1Digi</h4>
                    </button>
                    </Link>
                    <Link to="/threeDigiLotto">
                    <button className='btn-icon pa-2 mr-3'>
                        <Icon className='bulb mr-1' path={mdiGamepadVariant} size={1}>
                        </Icon>
                        <h4>3Digi</h4>
                    </button>
                    </Link>
                    <button className='btn-icon px-1 py-2 mr-2' onClick={() => open(discord)}>
                        <Icon className='bulb' path={mdiChatQuestion} size={1}/>
                    </button>
                    <button className='btn-icon px-1 py-2 mr-2' onClick={() => open(twitter)}>
                        <Icon className='bulb' path={mdiTwitter} size={1}/>
                    </button>   
                </div>
                
                <button className='btn-icon pa-2 mr-3' onClick={() => open(docs)}>
                        <Icon className='bulb mr-1' path={mdiTextBoxMultiple} size={1}>
                        </Icon>
                    </button> 
                <Web3ModelButton />
            </div>
        </div>
        <div className='divider'></div>
    </div>
  )
}
