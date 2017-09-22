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
//@flow

// typescript !!! THIS IS TYPESCRIPT TYPINGS !!!
// interfase for message repack
 import Msgpack from 'msgpack5'

 // DUNNO What is it later will solve this mistery

 interface IDummyMut {
    timeOfLastMessage?: Date
 }


 interface IMut extends IDummyMut {
    seq: Date,
    peerIdSeq: Number,
    pingCycle?: Number,
    // in original src this part was extended in code middle
    timeOfLastMessage?: Date,
    // probably some event.
    onAnnounce(): () => {} 
}

interface IPeer {
    id: Number,
    socket: Socket,
    outgoing: Boolean,
    mut : IMut
}

interface IPingRecord {
    seq: Number,
    time: Date
}

interface IWsContext {
    peers: Array<Peer>,
    pings: {string, IPingRecord},
    annByHash: {string, Buffer},
    msgpack: msgpack5.MessagePack,
    version: Number,
    mut: IMut
}