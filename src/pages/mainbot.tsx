import '../app/global.css';
import Image from 'next/image'
import { HiArrowUp } from "react-icons/hi";
import { HiOutlinePencilAlt } from "react-icons/hi";
import { HiOutlineDocumentText } from "react-icons/hi";


export default function Bot() {
    return (
        <div>
            <div id="leftPanel">
                <button id="left_panel_buton">
                    <Image
                        src="/klim1.jpg"
                        width={30}
                        height={15}
                        alt="Klim"
                        id="NewKlim1"
                    />
                    <p id="p1">New Klim</p>
                    <HiOutlinePencilAlt id="p2" />
                </button>
                <button id="left_panel_buton">
                    <Image
                        src="/klim1.jpg"
                        width={30}
                        height={15}
                        alt="Klim"
                        id="NewKlim1"
                    />
                    <p id="p1">Klimoclopedia</p>
                    <HiOutlineDocumentText id="p2"/>
                </button>
            </div>
            <div>
                <select>
                    <option value="0">KlimGPT 2.0</option>
                    <option value="1">KlimGPT 1.0</option>
                </select>
            </div>

            <div id="messagesContainer">
                {/* <!--<div class="msg">Some message</div>--> */}
            </div>

            <div id="searchbox-wrap">
                <input id="messageBox" type="text" placeholder="Message KlimGPT..."></input>
                <button id="sendMessageButton"><HiArrowUp id="hiArrowUp"/></button>
            </div>
        </div>
    );
}
