import React, { useState } from 'react'
import Icon from '@mdi/react'
import {
  mdiPiggyBank,
  mdiGamepadVariant,
  mdiSeal,
  mdiBankTransferIn,
  mdiBankTransferOut,
  mdiTwitter,
  mdiChatQuestion
} from '@mdi/js'
import { shortenAddress } from '@usedapp/core';
import Tabs from '../containers/Tab/Tabs';
import { utils } from 'ethers'
import lottoDefiAbi from '../utils/contract/lottoDefi'
import { Contract } from '@ethersproject/contracts'
import { useEthers, useCall, useContractFunction } from '@usedapp/core'
import { parseUnits } from '@ethersproject/units'
import { Link } from 'react-router-dom'

const discord = 'https://discord.gg/pyw28FKXME'
const twitter = 'https://twitter.com/3dloto'
const contractPage = 'https://bscscan.com/address/0x91476E9cede2f1C15eA41fbee0161c6a7e08944D'

export default function LottoDefi() {
  const open = (url) => {
      window.open(url, '_blank')
  }
  const { account } = useEthers();
  const contractAddress = '0x91476E9cede2f1C15eA41fbee0161c6a7e08944D';
  const contractInterface = new utils.Interface(lottoDefiAbi);
  const _contract = new Contract(contractAddress, contractInterface);

  const StakeFunction = () => {
    const [_value, setValue] = useState('');
    const MIN = '1';
    const MAX = '10';

    const { value: totalStaked } = useCall({
      contract: _contract,
      method: 'totalStaked',
      args:[]
    }) ?? {}

    const TotalStaked = totalStaked / 10 ** 18;
    const FinalResult = String(TotalStaked)

    const {state, send} = useContractFunction(_contract, 'stake', {
      transactionName: 'Stake',
   })
    const { status } = state;
    const stakeBNB = () => {
        send({value: parseUnits(_value, 'ether')})
    }

    return (
      <div className='mt-3'>
        <h3 className='mb-2'>Stake</h3>
        <div className='d-flex justify-center align-center mb-2'>
          <h4>Total Staked :</h4>
          <div className='chip chip-text'>
            {FinalResult} / BNB
          </div>
        </div>
        <div className='d-flex justify-center mt-2 mb-4'>
          <div className='chip chip-label'>
            {_value} / BNB
          </div>
        </div>
        <div className='d-flex justify-space-around align-center mb-2'>
          <p>Min : 1 BNB</p>
          <input type="range" step='0.5' min={MIN} max={MAX} value={_value} onChange={(e) => setValue(e.target.value)} className="slider" id="myRange" />
          <p>Max : 10 BNB</p>
        </div>
        <div className='d-flex justify-center mt-6 mb-4'>
          {!account && <h4>Connect Your Wallet first</h4>}
          {account && <button className='btn btn-rounded' onClick={() => stakeBNB()}>
            Stake Now
          </button>}
        </div>
        <div className='d-flex justify-center mt-6 mb-4'>
          <h5>Transaction Status : {status}</h5>
        </div>
      </div>
    )
  }

  const UnStakeFunction = () => {

    const { value: userStaked } = useCall({
        contract: _contract,
        method: 'staked',
        args:[account ?? '']
    }) ?? {}

    const TotalStaked = userStaked / 10 ** 18;
    const FinalResult = String(TotalStaked)

    const { value: userStakedDay } = useCall({
        contract: _contract,
        method: 'stakedDay',
        args:[account ?? '']
    }) ?? {}

    const StakedDay = userStakedDay;
    const FinalDayResult = String(StakedDay)

    const {state, send} = useContractFunction(_contract, 'unStake', {
        transactionName: 'UnStake',
    })
    const { status } = state
    const unStakeBNB = () => {
        send()
    }

    return (
      <div className='mt-4'>
        <h3 className='mb-2'>UnStake</h3>
        <div className='d-flex justify-center align-center mb-2'>
          <h4>You Staked :</h4>
          <div className='chip chip-text'>
            {FinalResult} / BNB
          </div>
        </div>
        <div className='d-flex justify-center align-center mb-2'>
          <h4>You Staked On :</h4>
          <div className='chip chip-text'>
            Day / {FinalDayResult}
          </div>
        </div>
        <div className='d-flex justify-center align-center mb-2'>
        <p>Withdraw your fund after 7 Days of Staking period</p>
        </div>
        <div className='d-flex justify-center mt-11 mb-4'>
          {!account && <h4>Connect Your Wallet first</h4>}
          {account && <button className='btn btn-rounded' onClick={() => unStakeBNB()}>
            WithDraw
          </button>}
        </div>
        <div className='d-flex justify-center mt-6 mb-4'>
          <h5>Transaction Status : {status}</h5>
        </div>
      </div>
    )
  }

  const SendRewardFunction = () => {
    const {value: _avgRewardPer } = useCall({
      contract: _contract,
      method: 'avgRewardPer',
      args: []
    }) ?? {}
    const AvgRewardPer = _avgRewardPer / 10 ** 18
    let FinalAvg;

    if (_avgRewardPer === undefined){
      FinalAvg = '0';
    } else{
      FinalAvg = String(AvgRewardPer)
    }

    const { value: userStakedDay } = useCall({
        contract: _contract,
        method: 'stakedDay',
        args:[account ?? '']
    }) ?? {}

    const StakedDay = userStakedDay;
    const FinalDayResult = String(StakedDay)

    const {state, send} = useContractFunction(_contract, 'sendRewards', {
        transactionName: 'Send Rewards',
    })
    const { status } = state
    const sendRewards = () => {
        send()
    }

    return (
      <div className='mt-4'>
        <h3 className='mb-4'>Send Reward</h3>
        <div className='d-flex justify-center align-center mb-2'>
          <h4>Average Reward :</h4>
          <div className='chip-hilite chip-text-hilite mr-2'>
            {FinalAvg} / BNB
          </div>
          <h6>per Staker</h6>
        </div>
        <div className='d-flex justify-center align-center mb-2'>
          <h4>You Staked On :</h4>
          <div className='chip chip-text'>
            Day / {FinalDayResult}
          </div>
        </div>
        <div className='d-flex justify-center align-center mb-2'>
        <p>Generate Reward and get your reward <strong>2 times</strong> the value</p>
        </div>
        <div className='d-flex justify-center mt-10 mb-4'>
          {!account && <h4>Connect Your Wallet first</h4>}
          {account && <button className='btn btn-rounded' onClick={() => sendRewards()}>
            Generate Reward
          </button>}
        </div>
        <div className='d-flex justify-center mt-10 mb-4'>
          <h5>Transaction Status : {status}</h5>
        </div>
      </div>
    )
}

  return (
    <div>
      <div className='bottom'>
        <div className='divider-bottom' />
          <div className='bottom-bar mt-2'>
          <button className='btn-toggle-active pa-2 mr-3'>
              <Icon className='bulb mr-1' path={mdiPiggyBank} size={1}>
              </Icon>
              <h4>Defi</h4>
          </button>
          <Link to="/oneDigiLotto">
          <button className='btn-toggle pa-2 mr-3'>
              <Icon className='bulb mr-1' path={mdiGamepadVariant} size={1}>
              </Icon>
                <h4>1Digi</h4>     
          </button>
          </Link> 
          <Link to="/threeDigiLotto">
          <button className='btn-toggle pa-2 mr-3'>
              <Icon className='bulb mr-1' path={mdiGamepadVariant} size={1}>
              </Icon>
              <h4>3Digi</h4>
          </button>
          </Link>
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
          <h3 className='mb-1'>Defi</h3>
          <div className='mb-3'>
            <button className="btn-contract btn-rounded pl-2" onClick={()=>open(contractPage)}>
            Contract Address
            <div className="chip chip-text ml-1">
            ({ shortenAddress(contractAddress) })
            </div> 
            </button>
          </div>
          <div className='divider' />
          <div>
            <Tabs>
              <div label='Stake' icon={mdiBankTransferIn}>
                <StakeFunction />
              </div>
              <div label='UnStake' icon={mdiBankTransferOut}>
                <UnStakeFunction />                
              </div>
              <div label='Reward' icon={mdiSeal}>
                <SendRewardFunction />
              </div>
            </Tabs>
          </div>          
        </div>
      </div>
    </div>
  )
}
