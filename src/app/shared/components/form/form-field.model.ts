export interface FormField{
    label: string;
    name: string;
    type: 'text' | 'number' | 'email' | 'password' | 'select' | 'textarea';
    value?: string | number; // Optional initial value
    options?: string[]; // For select type
    required?: boolean; // Optional required field
    placeholder?: string; // Optional placeholder text
    validators?: any[]; // Optional validators for form control
}