import { TextInput } from '@carbon/react';

export default {
  title: 'Carbon/TextInput',
  component: TextInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
    invalid: {
      control: 'boolean',
      description: 'Invalid state',
    },
    warn: {
      control: 'boolean',
      description: 'Warning state',
    },
  },
};

export const Default = {
  args: {
    id: 'text-input-default',
    labelText: 'Text Input',
    placeholder: 'Enter text...',
  },
};

export const WithHelperText = {
  args: {
    id: 'text-input-helper',
    labelText: 'Email Address',
    placeholder: 'email@example.com',
    helperText: 'Enter a valid email address',
  },
};

export const Invalid = {
  args: {
    id: 'text-input-invalid',
    labelText: 'Username',
    placeholder: 'Enter username',
    invalid: true,
    invalidText: 'Username is required',
  },
};

export const Warning = {
  args: {
    id: 'text-input-warn',
    labelText: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    warn: true,
    warnText: 'Password should be at least 8 characters',
  },
};

export const Disabled = {
  args: {
    id: 'text-input-disabled',
    labelText: 'Disabled Input',
    placeholder: 'This is disabled',
    disabled: true,
  },
};

export const Small = {
  args: {
    id: 'text-input-small',
    labelText: 'Small Input',
    placeholder: 'Small size',
    size: 'sm',
  },
};

export const Large = {
  args: {
    id: 'text-input-large',
    labelText: 'Large Input',
    placeholder: 'Large size',
    size: 'lg',
  },
};
