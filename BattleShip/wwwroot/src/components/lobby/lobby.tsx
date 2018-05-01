﻿import { h } from "hyperapp";
import { PlayerModel } from "@src/client/models";
import { LobbyState } from "@src/client/states";
import { PlayerList } from "@src/components/lobby/playerlist/playerlist";
import { EventLog } from "@src/components/lobby/eventlog/eventlog";
import "./lobby.scss"

export interface LobbyArgs {
    player: PlayerModel;
    lobby: LobbyState;
    actions: any;
    onPlayerNameChanged: any;
}

export const LobbyScreen = (args: LobbyArgs) => (
    <div id="lobby" oncreate={() => args.actions.init(args)}>

        <section className="hero is-light">
            <div className="hero-body">
                <div className="container">
                    <h1 className="title">
                        Hello {args.lobby.playerName}!
                    </h1>
                </div>
            </div>
        </section>

        <div class="container pt-3">

            <div className="tile is-ancestor">
                <div className="tile is-parent is-9 ">
                    <div className="tile is-child box">
                        <p className="title">Messages</p>
                        <EventLog events={args.lobby.events}/>
                    </div>
                </div>
                <div className="tile is-parent is-3">
                    <div className="tile is-child box">
                        <p className="title">Players</p>
                        <PlayerList player={args.player} players={args.lobby.playersInLobby} challengePlayer={args.actions.challengePlayer}/>
                    </div>
                </div>
            </div>

        </div>

        {/*<div style={{ marginBottom: "1rem" }}>*/}
        {/*<div>*/}
        {/*<span>Share your lobby: </span>{" "} <a href={buildLobbyUrl(args.lobby.lobbyId)}> {buildLobbyUrl(args.lobby.lobbyId)} </a>*/}
        {/*</div>*/}
        {/*<div>*/}
        {/*<button class="button" onClick={() => args.actions.createLobby()}>*/}
        {/*Create custom lobby*/}
        {/*</button>*/}
        {/*</div>*/}
        {/*</div>*/}
    </div>
);

function buildLobbyUrl(id: string): string {
    return window.location.host + "?lobby=" + id;
}

// export interface LobbyActions {
//     addEvent: (value: Event) => (state: LobbyState) => any;
//     playerJoined: (value: PlayerModel) => (state: LobbyState, actions: any) => any;
//     playerLeft: (value: PlayerModel) => (state: LobbyState, actions: any) => any;
//     connected: (model: ConnectedModel) => () => any;
//     playerNameInput: (value: string) => () => any;
//     enterLobby: (value: EnterLobbyAnswerModel) => (state: State, actions: any) => any;
// }