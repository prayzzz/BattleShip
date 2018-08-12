import { GameHub } from "@src/client/gameHub";
import { GameCallups, GameState } from "@src/client/states";
import { PlayerModel } from "@src/client/models";
import { BoardService } from "@src/components/game/board/boardService";

const gamehub = GameHub.getInstance();
const boardService = new BoardService();

export interface StartGameArgs {
    opponent: PlayerModel;
    isFirstTurn: boolean;
}

export const gameActions = {
    init: (callups: GameCallups) => (state: GameState, actions: any) => {
        actions.setCallups(callups)
    },
    setCallups: (callups: any) => () => {
        return callups
    },
    noop: () => () => {
    },
    onStartGame: (args: StartGameArgs) => (state: GameState, actions: any) => {
        const playerBoard = boardService.generateBoard();
        return { opponent: args.opponent, playerBoard: playerBoard, isMyTurn: args.isFirstTurn }
    }
};