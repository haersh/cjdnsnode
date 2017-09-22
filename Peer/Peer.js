/* @flow */
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


 import { Peer } from './Interfaces';

 let _wsHandlerInstance_: WsHandler | null = null;

 // This is singleton. It is only one instance of this class could be provided.
 class WsHandler {
    constructor(){
        // If somehow somewere somebody try to create new instance existed will be provided
         _wsHandlerInstance_ !== null 
            ? _wsHandlerInstance_ 
            : _wsHandlerInstance_ = this
    }
 }

const a = new WsHandler()
const b = new WsHandler()
const c = new WsHandler()
