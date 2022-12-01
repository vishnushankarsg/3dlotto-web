import React, {useState, useEffect} from 'react'
import Countdown from 'react-countdown'
import { useCall, useEthers, useContractFunction, } from '@usedapp/core'
import { parseEther } from '@ethersproject/units/lib'
import { utils } from 'ethers'
import OneDigiLottoAbi from '../../utils/contract/oneDigiLotto'
import { Contract } from '@ethersproject/contracts'

const contractInterface = new utils.Interface(OneDigiLottoAbi); 
const contractAddress = '0xBb11d62FC5c28F2C3d06C12405af6cCdeC4e8BC6';
const _contract = new Contract(contractAddress, contractInterface);

export default function BetComponent() {

    const {account} = useEthers();

    const [_value, setValue] = useState('');
    const [_valueBnb, setValueBnb] = useState('');

    const renderer = ({ hours, minutes, seconds }) => {
      return <h6>{hours} : {minutes} : {seconds}</h6>
    };
    
    const { value: _drawNumber } = useCall({
        contract: _contract,
        method: 'Draw',
        args:[]
    }) ?? {}
    const drawNumber = String(_drawNumber)
    const pastDrawNumber = String(_drawNumber - 1)

    const { value: _prizeTimes } = useCall({
        contract: _contract,
        method: 'winningTimes',
        args:[]
    }) ?? {}
    const prizeTimes = String(_prizeTimes)

    const { value: _winningNumber } = useCall({
        contract: _contract,
        method: 'winningNumber',
        args:[drawNumber - 1]
    }) ?? {}
    const wonNumber = String(_winningNumber)

    const { value: _ticketNumber } = useCall({
        contract: _contract,
        method: 'TicketNumber',
        args:[]
    }) ?? {}
    const ticketNumber = String(_ticketNumber)

    const { value: _drawEnds } = useCall({
        contract: _contract,
        method: 'drawEnds',
        args:[]
    }) ?? {}
    const drawEnds = _drawEnds;

    const [timerActive, setTimerActive] = useState(true);

    const DrawCounter = () => {
      if (Date.now() < (drawEnds * 1000)){
        setTimerActive(true);
      } else {
        setTimerActive(false);
      }
    }

    useEffect(() => {
      DrawCounter();
    }, []);

    const { value: _minBet } = useCall({
        contract: _contract,
        method: 'minimumBet',
        args:[]
    }) ?? {}
    const minBetResult = _minBet / 10 ** 18;
    const minBet = String(minBetResult)

    const { value: _maxBet } = useCall({
        contract: _contract,
        method: 'maximumBet',
        args:[]
    }) ?? {}
    const maxBetResult = _maxBet / 10 ** 18;
    const maxBet = String(maxBetResult)

    const {state, send} = useContractFunction(_contract, 'buyTicket', {
        transactionName: '1DLotto-Bet',
    })
    const { status } = state
    const lottoBet = () => {
        send(_value, parseEther(_valueBnb), {value: parseEther(_valueBnb)})
    }

    return (
      <div className='container-inner mt-1 mb-1'>
        <div className='d-flex justify-space-around align-center mb-1'>
          <div className='d-flex align-center'>
            <h6>Draw No.</h6>
            <div className='chip-hilite chip-text-hilite ml-1'>
              {drawNumber}
            </div>
          </div>
          <div className='d-flex align-center'>
            <h6>Ticket No.</h6>
            <div className='chip-hilite chip-text-hilite ml-1'>
              {ticketNumber}
            </div>
          </div>
        </div>
        <div className='d-flex justify-space-around align-center mb-2'>
            <div className='timer-card d-flex align-center justify-center'>
              <div className={`timer-inner clock-dashed ${
                    timerActive ? 'clock-dashed--animating timer-inner' : ''
                  }`}> 
              </div>
              {Date.now() < (drawEnds * 1000) && 
                <div className='p-absolute'>
                    <Countdown 
                      date={drawEnds * 1000}
                      renderer={renderer}
                    >
                    </Countdown>
                </div>
              }
              {Date.now() >= (drawEnds * 1000) && 
                <div className='p-absolute'>
                  <h5>Draw Closed</h5>
                  <p>Spin or Place Bet</p>
                </div>
              }
            </div>
            <div className='align-center mt-1'>
                <div className='d-flex align-center mt-1 mb-1'>
                    <h6>Last Winner :</h6>
                </div>
                <div className='d-flex align-center mt-1 mb-1'>
                    <h6>Draw No</h6>
                    <div className='chip-hilite chip-text-hilite ml-1'>
                    {pastDrawNumber}
                    </div>
                </div>
                <div className='d-flex align-center'>
                    <h6>Won Number</h6>
                    <div className='chip-hilite chip-text-hilite ml-1'>
                    {wonNumber}
                    </div>
                </div>
                <div className='d-flex align-center'>
                    <h6>Prize</h6>
                    <div className='chip-hilite chip-text-hilite ml-2 mr-2'>
                    {prizeTimes}
                    </div>
                    <h6>times</h6>
                </div>
            </div>
        </div>
        <div className='divider' />
        <div className='d-flex justify-space-around align-center my-2'>
            <div className='align-center'>
                <div className='chip-input mb-1'>
                    <input
                        type="text"
                        pattern='\d*'
                        autoComplete="off"
                        className='chip-text-input'
                        value={_value}
                        onChange={e => setValue(e.target.value)}
                        tabIndex="1" maxLength="1"
                    />
                </div>
                <h6>Choose 0 to 9</h6>
            </div>
            <div className='align-center'>
                <div className='d-flex justify-space-around align-center'>
                    <div className='chip-hilite chip-text-hilite mb-2'>
                        {_valueBnb}<h6> / BNB</h6>
                    </div>
                </div>                
                <input type="range" step='0.005' min={minBet} max={maxBet} value={_valueBnb} onChange={(e) => setValueBnb(e.target.value)} className="slider mt-1 mb-2" id="myRange" />
                <p>MIN : {minBet} | MAX : {maxBet}</p>
            </div>
        </div>
        <div className='d-flex justify-space-around align-center'>
            <div className='align-center'>
                {!account && <h6>Connect Your Wallet first</h6>}
                {account && <button className='btn btn-rounded' onClick={() => lottoBet()}>
                    Place Bet
                </button>}
            </div>
            <h6>Status : {status}</h6>            
        </div>
      </div>
    )
}
