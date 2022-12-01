import React, {useState} from 'react'
import { utils } from 'ethers'
import OneDigiLottoAbi from '../../utils/contract/oneDigiLotto'
import { Contract } from '@ethersproject/contracts'
import { useCall, useEthers, useContractFunction} from '@usedapp/core'

const contractInterface = new utils.Interface(OneDigiLottoAbi); 
const contractAddress = '0xBb11d62FC5c28F2C3d06C12405af6cCdeC4e8BC6';
const _contract = new Contract(contractAddress, contractInterface);


export default function ClaimComponent() {

    const {account} = useEthers();

    const [_drawValue, setDrawValue] = useState();
    const [_tikValue, setTikValue] = useState();


    const { value: _drawNumber } = useCall({
        contract: _contract,
        method: 'Draw',
        args:[]
    }) ?? {}
    const drawNumber = String(_drawNumber)

    const { value: _claimLimit } = useCall({
        contract: _contract,
        method: 'claimLimit',
        args:[]
    }) ?? {}
    const claimLimit = +_drawNumber + +_claimLimit

    const [_winValue, setWinValue] = useState('')
    const [clicked, setClicked] = useState(false);
    const {value : _wonNumber} = useCall(clicked &&{
      contract: _contract,
      method: 'winningNumber',
      args:[_winValue]
    }) ?? {}

    const reqWonNumber = String(_wonNumber)


    const {send} = useContractFunction(_contract, 'claimWinningPrize',{
        transactionName: 'Claim Prize',
    })
    const claimPrize = () => {
        send(_drawValue, _tikValue)
    }

  return (
    <div className='container-inner mt-1 mb-1'>
        <div className='d-flex justify-space-around align-center mt-2 mb-3'>
          <h4>Claim Prizes</h4>
          <div className='d-flex align-center mt-2 mb-2'>
            <h6>Current Draw</h6>
            <div className='chip-hilite chip-text-hilite ml-1'>
                {drawNumber}
            </div>
          </div>          
        </div>
        <div className='divider' />
        {!account &&
            <div className='align-center mt-12'>
                <h4> Connect Your Wallet First</h4>
            </div>}
        {account &&
            <div>
              <div className='d-flex justify-center align-center mt-2 mb-1'>
                <h6>Won Number -</h6>
                <div className='chip-hilite chip-text ml-1'>
                  {reqWonNumber}
                </div>
              </div>              
              <div className='chip-input-new mt-1 mb-3'>
                <input
                    type="tel"
                    autoFocus='off'
                    autoComplete='off'
                    className='chip-text-input'
                    placeholder='Draw No.'
                    value={_winValue}
                    onChange={(e) => setWinValue(e.target.value)}
                />
              </div>
              <div className='align-center mb-2'>
                <div className='align-center'>
                    {account && <button className='btn btn-rounded' onClick={()=>setClicked(true)}>
                        View Won Number
                    </button>}
                </div>
              </div>
              <div className='divider' />
              <div className='d-flex justify-space-around align-center mt-2 mb-3'>
                <div className='chip-input-new mr-1 mt-2'>
                  <input
                      type="tel"
                      autoFocus='off'
                      autoComplete='off'
                      className='chip-text-input'
                      placeholder='Draw No.'
                      value={_drawValue}
                      onChange={(e) => setDrawValue(e.target.value)}
                  />
                </div>
                <div className='chip-input-new ml-1 mt-2'>
                  <input
                      type="tel"
                      autoFocus='off'
                      autoComplete='off'
                      className='chip-text-input'
                      placeholder='Ticket No.'
                      value={_tikValue}
                      onChange={(e) => setTikValue(e.target.value)}
                  />
                </div>
              </div>              
              <div className='d-flex justify-space-around align-center mb-2'>
                <div className='align-center'>
                    {account && <button className='btn btn-rounded' onClick={()=>claimPrize()}>
                        Claim Your Prize
                    </button>}
                </div>
              </div>
              <div className='align-center mt-2'>
                <h5>Note: Claim your prize before Draw {claimLimit} Starts</h5>
             </div>
            </div>
        }
    </div>
  )
}
