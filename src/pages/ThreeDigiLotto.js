import React from 'react'
import Icon from '@mdi/react'
import { Link } from 'react-router-dom'
import {
  mdiPiggyBank,
  mdiGamepadVariant,
  mdiTicket,
  mdiFan,
  mdiSeal,
  mdiTwitter,
  mdiChatQuestion
} from '@mdi/js'
import Tabs from '../containers/Tab/Tabs'
import { shortenAddress } from '@usedapp/core'
import { mdiHistory } from '@mdi/js/mdi'
import BetComponent from '../containers/ThreeDLotto/BetComponent'
import SpinComponent from '../containers/ThreeDLotto/SpinComponent'
import ClaimComponent from '../containers/ThreeDLotto/ClaimComponent'
import History from '../containers/ThreeDLotto/History'

const contractAddress = '0x360C692BdFc929707E35F73a83F545125A9DD4eD';
const discord = 'https://discord.gg/pyw28FKXME'
const twitter = 'https://twitter.com/3dloto'
const contractPage = 'https://bscscan.com/address/0x360C692BdFc929707E35F73a83F545125A9DD4eD'

export default function ThreeDigiLotto() {
  const open = (url) => {
    window.open(url, '_blank')
  }
  return (
    <div>
      <div className='bottom'>
        <div className='divider-bottom' />
          <div className='bottom-bar mt-2'>
          <Link to="/">
          <button className='btn-toggle pa-2 mr-3'>
              <Icon className='bulb mr-1' path={mdiPiggyBank} size={1}>
              </Icon>
              <h4>Defi</h4>
          </button>
          </Link>
          <Link to="/oneDigiLotto">
          <button className='btn-toggle pa-2 mr-3'>
              <Icon className='bulb mr-1' path={mdiGamepadVariant} size={1}>
              </Icon>
                <h4>1Digi</h4>     
          </button>
          </Link>
          <button className='btn-toggle-active pa-2 mr-3'>
              <Icon className='bulb mr-1' path={mdiGamepadVariant} size={1}>
              </Icon>
              <h4>3Digi</h4>
          </button>
          <button className='btn-toggle pa-2' onClick={() => open(twitter)}>
              <Icon className='bulb mr-1' path={mdiTwitter} size={1}>
              </Icon>
          </button>
          <button className='btn-toggle pa-2' onClick={() => open(discord)}>
              <Icon className='bulb mr-1' path={mdiChatQuestion} size={1}>
              </Icon>
          </button>    
          </div>
        <div className='footer'>
          <p>Copyright © 3DLotto.org</p>
        </div>
      </div>

      <div className='container mt-9'>

        <div className='card'>

          <div className='d-flex justify-space-around align-center'>
            <h4 className='mb-1'>3DLotto</h4>
            <div className='mb-2'>
              <button className="btn-contract btn-rounded pl-2" onClick={() => open(contractPage)}>
              View Contract
                <div className="chip chip-text ml-1">
                ({ shortenAddress(contractAddress) })
                </div> 
              </button>
            </div>
          </div>

          <div className='divider' />

          <div>
            <Tabs>
              <div label='Bet' icon={mdiTicket}>
                <BetComponent />
              </div>
              <div label='Spin' icon={mdiFan}>
                <SpinComponent />            
              </div>
              <div label='Prize' icon={mdiSeal}>
                <ClaimComponent />
              </div>
              <div label='Tickets' icon={mdiHistory}>
                <History />
              </div>
            </Tabs>
          </div>          
        </div>
      </div>
    </div>
  )
}
