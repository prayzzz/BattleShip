import { ChallengePlayerModel, EventEntry, EventType, LobbyEnteredModel, PlayerModel } from "@src/client/models";
import { GameHub } from "@src/client/gameHub";
import { LobbyCallups, LobbyState } from "@src/client/states";
import Swal from 'sweetalert2'
import Constants from "@src/constants";

const gamehub = GameHub.getInstance();

export const lobbyActions = {
    init: (callups: LobbyCallups) => (state: LobbyState, actions: any) => {
        actions.setCallups(callups)
    },
    setCallups: (callups: any) => () => {
        return callups
        },
        addEvent: (value: EventEntry) => (state: LobbyState) => {
            setTimeout(() => {
                const objDiv = document.getElementById("event-log");
                if (objDiv) {
                    objDiv.scrollTop = objDiv.scrollHeight;
                }
            }, 1);

            state.events.push(value);
            return { events: state.events };
        },
    playerChanged:
        (value: PlayerModel) => (state: LobbyState) => {
            const index = state.playersInLobby.findIndex((p: PlayerModel) => p.playerId === value.playerId);
            state.playersInLobby[index] = value;

            return { playersInLobby: state.playersInLobby };
        },
        playerJoined:
            (value: PlayerModel) => (state: LobbyState, actions: any) => {
                actions.addEvent(new EventEntry(`Player ${value.name} joined the lobby`));

                state.playersInLobby.push(value);
                state.playersInLobby.sort((a, b) => a.name.localeCompare(b.name));
                return { playersInLobby: state.playersInLobby };
            },
        playerLeft:
            (value: PlayerModel) => (state: LobbyState, actions: any) => {
                actions.addEvent(new EventEntry(`Player ${value.name} left the lobby`));

                const index = state.playersInLobby.findIndex((p: PlayerModel) => p.playerId === value.playerId);
                if (index > -1) {
                    state.playersInLobby.splice(index, 1);
                }

                return { playersInLobby: state.playersInLobby };
            },
        lobbyEntered:
            (value: LobbyEnteredModel) => (state: LobbyState, actions: any) => {
                actions.addEvent(new EventEntry(`You joined Lobby ${value.lobbyId}`));
                return { lobbyId: value.lobbyId, playersInLobby: value.players };
            },
        challengePlayer:
            (player: PlayerModel) => (state: LobbyState, actions: any) => {
                actions.addEvent(new EventEntry(`Challenged ${player.name}`));

                gamehub.challengePlayer(player);
            },
        challengeRequest:
            (model: ChallengePlayerModel) => (state: LobbyState, actions: any) => {
                const opponent = state.playersInLobby.find(p => p.playerId == model.playerId);
                if (opponent) {
                    const event = new EventEntry(
                        `You got challenged by ${opponent.name}`,
                        EventType.Challenge,
                        { accept: () => gamehub.acceptChallenge(opponent.playerId) });
                    actions.addEvent(event);
                }

            },
        createLobby: () => () => {
            gamehub.enterLobby("00000000-0000-0000-0000-000000000000");
        },
        setPlayerName: (value: string) => (state: LobbyState) => {
            return { playerName: value };
        },
    editName: () => (state: LobbyState) => {
        Swal({
            title: 'What is your nickname?',
            input: 'text',
            inputPlaceholder: 'Enter your nickname',
            allowOutsideClick: false,
            allowEscapeKey: false,
            inputValidator: (value) => {
                return !value && 'You need to write something!'
            }
        }).then((result) => {
                localStorage.setItem(Constants.LS_PLAYER_NAME, result.value);
                state.setPlayerName(result.value);
            }
        );
    }
    }
;