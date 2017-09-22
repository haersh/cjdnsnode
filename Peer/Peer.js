// @flow
/*
 * You may redistribute this program and/or modify it under the terms of
 * the GNU General Public License as published by the Free Software Foundation,
 * either version 3 of the License, or (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/


import { IPeer, IWsContext } from './Interfaces'
import Msgpack from 'msgpack5'
//temp before stable reliase
import * as R from 'ramda'

// This variable should be not used directly
let _wsHandlerInstance_: WsHandler | null = null


 // This is singleton. It is only one instance of this class could be provided.
 export default class WsHandler {
    constructor(){
      // return instance if existed
      // check for null is way faster then default if( some )
      if ( _wsHandlerInstance_ !== null ){ 
        return _wsHandlerInstance_ 
      } 
      // construct data
      this.ctx = this.provideWsCtx()()

      this._lastPeerId_ = null;
      
      _wsHandlerInstance_ = this;

      return _wsHandlerInstance_;
    }

    nextPeerId = () => {
        this._lastPeerId_ = this._lastPeerId_+ this.peerId() + 1
        return () =>  this._lastPeerId_
    }
    
    provideWsCtx = ( lastId = 0 ): IWsContext => 
      (): IWsContext => { 
        return {
          peers: [],
          pings: {},
          annByHash: {},
          msgpack: Msgpack(),
          version: 0.1,
          mut: {
            seq: new Date(),
            peerIdSeq: lastId,
            pingCycle: undefined,
            timeOfLastMessage: undefined,
            onAnnounce: () => {},
          }
        }
      }
    

    //  == Optics section == //
    // If not familiar with this part see:  
    // http://ramdajs.com/docs/#lens
    // http://ramdajs.com/docs/#prop
    // http://ramdajs.com/docs/#assoc
    // http://ramdajs.com/docs/#path
    // http://ramdajs.com/docs/#assocPath

    // TODO: remove hardcode
    annHashLens: R.lensProp = R.lensProp('annByHash')

    // TODO: remove hardcode
    peerIdLens: R.lensPath = R.lensPath( ['mut', 'peerIdSeq'] )

    peerId = (): Number => 
      R.view( this.peerIdLens, this.ctx )
    
    // TODO: remove hardcode
    mutFocuse = ( focus: Array<string> ): R.lensPath => 
      R.lensPath( ['mut'].concat(focus) )


    spawnPeer = ( isOutgoing: Boolean = false ): IPeer => {
      return {
        // take nextId
        id: this.nextPeerId()(),
        socket: 'socket',
        outgoing: isOutgoing,
        mut: {
          timeOfLastMessage: new Date()
        }
      }
    //socket.peer = peer;
    }
 }

const t = new WsHandler()