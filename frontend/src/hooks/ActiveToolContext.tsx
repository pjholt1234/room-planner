import {
    createContext,
    Dispatch,
    ReactNode,
    SetStateAction,
    useContext,
    useState
} from 'react';

interface ActiveToolContextType {
    activeTool: string;
    setActiveTool: Dispatch<SetStateAction<string>>;
}

interface ActiveToolProviderProps {
    children: ReactNode;
}

const ActiveToolContext = createContext<ActiveToolContextType | null>(null);

const ActiveToolProvider = ({ children }: ActiveToolProviderProps) => {
    const [activeTool, setActiveTool] = useState<string>('');

    return (
        <ActiveToolContext.Provider value={{ activeTool, setActiveTool }}>
            {children}
        </ActiveToolContext.Provider>
    );
};

const useActiveTool = () => {
    const context = useContext(ActiveToolContext);
    if (!context) {
        throw new Error(
            'useActiveTool must be used within an ActiveToolProvider'
        );
    }
    return context;
};

export { useActiveTool, ActiveToolProvider };
