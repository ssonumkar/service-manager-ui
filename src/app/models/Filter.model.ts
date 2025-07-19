export interface Filter { 
    label: string, 
    options: string[], 
    selected: string, 
    onChange: (value: string) => void 
}