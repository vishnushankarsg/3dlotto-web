import React, {useState} from 'react'
import { utils } from 'ethers'
import OneDigiLottoAbi from '../../utils/contract/oneDigiLotto'
import { Contract } from '@ethersproject/contracts'
import { useCall, useEthers, useContractFunction} from '@usedapp/core'

const contractInterface = new utils.Interface(OneDigiLottoAbi); 
const contractAddress = '0xBb11d62FC5c28F2C3d06C12405af6cCdeC4e8BC6';
const _contract = new Contract(contractAddress, contractInterface);


export default function SpinComponent() {
    const {account} = useEthers();

    const [_value, setValue] = useState();

    const { value: _drawNumber } = useCall({
        contract: _contract,
        method: 'Draw',
        args:[]
    }) ?? {}
    const drawNumber = String(_drawNumber)

    const { value: _winningNumber } = useCall({
        contract: _contract,
        method: 'winningNumber',
        args:[drawNumber - 1]
    }) ?? {}
    const wonNumber = String(_winningNumber)

    const {send} = useContractFunction(_contract, 'generateResult',{
        transactionName: 'Generate Result',
    })
    const genWonNum = () => {
        send(_value)
    }

    return (
        <div className='container-inner mt-1 mb-1'>
            <div className='align-center mt-2 mb-3'>
                <h4>Spin to Generate Result</h4>            
            </div>
            <div className='divider' />
            <div className='align-center mt-2 mb-2'>
                <h6>Last Winner</h6>            
            </div>
            <div className='d-flex justify-space-around align-center mb-3'>
                <div className='d-flex justify-space-around align-center'>
                    <h6>Draw No.</h6>
                    <div className='chip-hilite chip-text-hilite ml-1'>
                    {drawNumber - 1}
                    </div>
                </div>
                <div className='d-flex justify-space-around align-center mt-2'>
                    <h6>Won No.</h6>
                    <div className='chip-hilite chip-text-hilite ml-1'>
                    {wonNumber}
                    </div>
                </div>
            </div>
            <div className='divider' />
            {!account &&
                <div className='align-center mt-12 mb-12'>
                    <h4> Connect Your Wallet First</h4>
                </div>}
            {account &&
                <div>
                    <div className='chip-input-new mt-3 mb-4'>
                        <input
                            type="tel"
                            autoFocus='off'
                            autoComplete='off'
                            className='chip-text-input'
                            placeholder='Ticket No.'
                            value={_value}
                            onChange={(e) => setValue(e.target.value)}
                        />
                    </div>
                    <div className='d-flex justify-space-around align-center mb-4'>
                        <div className='align-center'>
                            {account && <button className='btn btn-rounded' onClick={()=>genWonNum()}>
                                Spin Now
                            </button>}
                        </div>
                    </div>
                    <div className='align-center mt-4'>
                        <h4>Note: Spin and Get</h4>
                        <h6>50% bet amount as reward of your ticket number</h6>
                    </div>
                </div>
            }
        </div>
    )
}
