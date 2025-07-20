export interface FormField{
    label: string;
    name: string;
    type: 'text' | 'number' | 'email' | 'password' | 'select' | 'textarea';
    value?: string | number; 
    options?: string[]; 
    required?: boolean; 
    placeholder?: string;
    validators?: any[]; 
}