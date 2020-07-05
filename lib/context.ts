import React from "react";
import { Interpreter, State } from "xstate";

import { ChessContext, ChessEvent } from "./machines/chess";

// export const botMachine = chessMachine;

// export const chessContext = React.createContext(chessMachine);

export const chessContext = React.createContext<
  [
    State<ChessContext, ChessEvent>,
    Interpreter<ChessContext, any, ChessEvent>["send"],
    Interpreter<ChessContext, any, ChessEvent>
  ]
>([
  {} as State<ChessContext, ChessEvent>,
  ((() => {}) as any) as Interpreter<ChessContext, any, ChessEvent>["send"],
  {} as Interpreter<ChessContext, any, ChessEvent>
]);
