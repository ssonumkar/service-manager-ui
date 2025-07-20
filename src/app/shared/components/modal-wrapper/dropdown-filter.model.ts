export interface DropdownFilter { 
    label: string, 
    options: string[], 
    selected: string, 
    onChange: (value: string) => void 
}