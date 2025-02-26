import { createContext, useContext, useState, ReactNode } from 'react';

export type FilterType = "all" | "twitter" | "youtube" | "instagram";

interface FilterContextType {
    activeFilter: FilterType;
    setActiveFilter: (filter: FilterType) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(undefined);

export function FilterProvider({ children }: { children: ReactNode }) {
    const [activeFilter, setActiveFilter] = useState<FilterType>("all");

    const value = {
        activeFilter,
        setActiveFilter: (filter: FilterType) => {
            console.log("Setting filter to:", filter);
            setActiveFilter(filter);
        }
    };

    return (
        <FilterContext.Provider value={value}>
            {children}
        </FilterContext.Provider>
    );
}

export function useFilter() {
    const context = useContext(FilterContext);
    if (!context) {
        throw new Error('useFilter must be used within a FilterProvider');
    }
    return context;
}
