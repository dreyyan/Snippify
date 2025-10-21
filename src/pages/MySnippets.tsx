// [IMPORT] Styles
import AllSnippets from "../components/MySnippets/AllSnippets";
import Drafts from "../components/MySnippets/Drafts";
import Favorites from "../components/MySnippets/Favorites";
import "../styles/index.css";
import Styles from "../styles/Styles";

// [IMPORT] Components
import { useEffect, useState, useReducer } from "react";

interface Snippet {
    id: number;
    title: string;
    language: string;
    content: string;
}

// [INTERFACE] Represents current page step and form data
interface State {
    step: number;
    formData: { name?: string; email?: string; snippets?: Snippet[] }
}

// [TYPE] Defines possible actions that can modify the page state
type Action =
    | { type: "NEXT" }
    | { type: "PREV" }
    | { type: "RESET" }
    | { type: "UPDATE_DATA"; payload: Partial<State["formData"]> }
    | { type: "ADD_SNIPPET"; payload: Snippet }
    | { type: "REMOVE_SNIPPET"; payload: number }; // snippet index or id


const initialState: State = { step: 1, formData: {} };

// [REDUCER] Handles state transitions based on dispatched actions
const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "NEXT":
            return { ...state, step: state.step + 1 };
        case "PREV":
            return { ...state, step: state.step - 1 };
        case "RESET":
            return initialState;
        case "UPDATE_DATA":
            return { ...state, formData: { ...state.formData, ...action.payload } };
        case "ADD_SNIPPET":
            return {
                ...state,
                formData: {
                    ...state.formData,
                    snippets: [...(state.formData.snippets || []), action.payload],
                }
            };
        case "REMOVE_SNIPPET":
            return {
                ...state,
                formData: {
                ...state.formData,
                snippets: state.formData.snippets?.filter(
                    (_, idx) => idx !== action.payload
                ),
                },
            };
        default:
            return state;
    }
};

const MySnippets = () => {
    document.title = "Snippify: My Snippets";
    
    // States
    const [user, setUser] = useState(null);
    const [state, dispatch] = useReducer(reducer, initialState);

    // [EFFECT] Retrieve user data from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    return (
        <div className="flex grid-rows-2 px-12 py-6">
            {/* Windows Tab */}
            {state.step === 1 && (
                <AllSnippets
                data={state.formData}
                onChange={(data) => dispatch({ type: "UPDATE_DATA", payload: data })}
                />
            )}

            {state.step === 2 && (
                <Drafts
                data={state.formData}
                onNext={() => dispatch({ type: "NEXT" })}
                onBack={() => dispatch({ type: "PREV" })}
                onChange={(data) => dispatch({ type: "UPDATE_DATA", payload: data })}
                />
            )}

            {state.step === 3 && (
                <Favorites
                data={state.formData}
                onReset={() => dispatch({ type: "RESET" })}
                />
            )}
        </div>
  );
};

export default MySnippets;