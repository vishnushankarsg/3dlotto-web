import React, {useState} from 'react'
import { utils } from 'ethers'
import ThreeDigiLottoAbi from '../../utils/contract/threeDigiLotto'
import { Contract } from '@ethersproject/contracts'
import { useCall, useEthers} from '@usedapp/core'

const contractInterface = new utils.Interface(ThreeDigiLottoAbi); 
const contractAddress = '0x360C692BdFc929707E35F73a83F545125A9DD4eD';
const _contract = new Contract(contractAddress, contractInterface);

export default function History() {
    const {account} = useEthers();

    const MyTickets = ()=>{

        const [_value, setValue] = useState('')
        const [_numValue, setNumValue] = useState('')
        const [clicked, setClicked] = useState(false);
        const {value : _ticketNum} = useCall(clicked &&{
          contract: _contract,
          method: 'userTickets',
          args:[_value, account, _numValue - 1]
        }) ?? {}
    
        const reqTicket = _ticketNum
        let result;
        if(reqTicket === undefined){
            result = 'None'
        } else{
            result = String(reqTicket)
        }
        
        return(
            <div className='align-center mt-2'>
            <div className='justify-center align-center mb-2'>
                    <h4>My Tickets</h4>
                </div>
                <div className='chip-input-new mr-2 mb-2'>
                    <input
                        type="text"
                        pattern='\d*'
                        autoComplete="off"
                        className='chip-text-input'
                        placeholder='Draw No.'
                        value={_value}
                        onChange={e => setValue(e.target.value)}
                    />
                </div>
                <div className='chip-input-new mb-2'>
                    <input
                        type="text"
                        pattern='\d*'
                        autoComplete="off"
                        className='chip-text-input'
                        placeholder='List No.'
                        value={_numValue}
                        onChange={e => setNumValue(e.target.value)}
                    />
                </div>
                {!account && <h4>Connect Your Wallet first</h4>}
                {account && <button className='btn btn-rounded' onClick={() => setClicked(true)}>
                    Find my Ticket Number
                </button>}
                <div className='d-flex justify-center align-center mb-2'>
                    <h6 className='mt-2'>Your Ticket Number : </h6>
                    <div className='chip-hilite chip-text-hilite ml-2 mt-2'>
                        {result}
                    </div>
                </div>
            </div>

        )
    }

    const MyBets = ()=>{
        const [_betValue, setBetValue] = useState('')
        const [_numBetValue, setNumBetValue] = useState('')
        const [isClicked, setIsClicked] = useState(false);
        const {value : bets} = useCall(isClicked &&{
          contract: _contract,
          method: 'userBets',
          args:[_betValue, account, _numBetValue]
        }) ?? {}
    
        const reqObj = bets;
        let betAmount;
        let blockA;
        let blockB;
        let blockC;
        let number;

        if (reqObj === undefined){
            betAmount = 'None';
            number = 'None'
        } else{
            betAmount = String(reqObj[1] / 10 ** 18);
            blockA = String(reqObj[2])
            blockB = String(reqObj[3])
            blockC = String(reqObj[4])
            number = blockA+blockB+blockC;
        }

        return(
            <div className='justify-center'>
                <div className='align-center'>
                    <div className='justify-center align-center mb-2'>
                        <h4>My Bets</h4>
                    </div>
                    <div className='chip-input-new mr-2 mb-2'>
                        <input
                            type="text"
                            pattern='\d*'
                            autoComplete="off"
                            className='chip-text-input'
                            placeholder='Draw No.'
                            value={_betValue}
                            onChange={e => setBetValue(e.target.value)}
                        />
                    </div>
                    <div className='chip-input-new mb-2'>
                        <input
                            type="text"
                            pattern='\d*'
                            autoComplete="off"
                            className='chip-text-input'
                            placeholder='Ticket No.'
                            value={_numBetValue}
                            onChange={e => setNumBetValue(e.target.value)}
                        />
                    </div>
                    {!account && <h4>Connect Your Wallet first</h4>}
                    {account && <button className='btn btn-rounded' onClick={() => setIsClicked(true)}>
                        Find my Bet Details
                    </button>}
                    <div className='d-flex justify-space-around align-center mb-2'>
                    <div className='d-flex justify-center align-center'>
                        <h6 className='mt-2'>Bet Amount : </h6>
                        <div className='chip-hilite chip-text-hilite ml-2 mt-2'>
                            {betAmount}
                        </div>
                    </div>
                    <div className='d-flex justify-center align-center'>
                        <h6 className='mt-2'>Bet Number : </h6>
                        <div className='chip-hilite chip-text-hilite ml-2 mt-2'>
                            {number}
                        </div>
                    </div>                  
                </div>
                </div>
                
            </div>
        )
    }

  return (
    <div className='container-inner mb-1 mt-1'>
        <MyTickets />
        <div className='divider' />
        <MyBets />
    </div>
  )
}
