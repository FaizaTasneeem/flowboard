import { createBrowserRouter } from "react-router-dom";
import Board from "./components/board/Board";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Board />
    }
]);

export default router;