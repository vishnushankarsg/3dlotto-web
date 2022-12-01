import React from "react";
import { useEthers, BSC, shortenAddress } from "@usedapp/core";
import Web3Model from 'web3modal';
import { providerOptions } from "./Provider";
import Icon from '@mdi/react'
import { mdiLogout } from "@mdi/js/mdi";

export const Web3ModelButton = () => {
    const { account, activate, deactivate, chainId, switchNetwork } = useEthers()

    const activateProvider = async () => {

      const web3Modal = new Web3Model({
          providerOptions,
        })
        try {
          const provider = await web3Modal.connect()
          await activate(provider)
        } catch (error) {
          console.log(error)
        }
    }

    if (!account){
        return(
            <div className="mr-3">
            <button className="btn-wallet btn-rounded px-2" onClick={activateProvider}>
                Connect Wallet
            </button>
            </div>
        )
        } else if (account){
        if (chainId !== BSC.chainId){
            return(
            <div className="mr-3">
                <button className="btn-wallet btn-rounded px-2" onClick={() => switchNetwork(BSC.chainId)}>
                    SwitchNetwork 
                </button>
            </div>
            )
        } else {
            return(
            <div className="mr-2">
                <button className="btn-wallet btn-rounded pr-1" onClick={deactivate}>
                <div className="chip mr-1">
                ({ shortenAddress(account) })
                </div>
                 <Icon className='bulb' path={mdiLogout} size={1} /> 
                </button>
            </div>
            )
        }
    }
  

}