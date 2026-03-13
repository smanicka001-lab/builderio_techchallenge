import { Button } from '@carbon/react';

export default {
  title: 'Carbon/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    kind: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary', 'ghost', 'danger', 'danger--tertiary', 'danger--ghost'],
      description: 'Button style variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg', 'xl', '2xl'],
      description: 'Button size',
    },
    disabled: {
      control: 'boolean',
      description: 'Disabled state',
    },
  },
};

export const Primary = {
  args: {
    children: 'Primary Button',
    kind: 'primary',
  },
};

export const Secondary = {
  args: {
    children: 'Secondary Button',
    kind: 'secondary',
  },
};

export const Tertiary = {
  args: {
    children: 'Tertiary Button',
    kind: 'tertiary',
  },
};

export const Danger = {
  args: {
    children: 'Danger Button',
    kind: 'danger',
  },
};

export const Ghost = {
  args: {
    children: 'Ghost Button',
    kind: 'ghost',
  },
};

export const Small = {
  args: {
    children: 'Small Button',
    size: 'sm',
  },
};

export const Large = {
  args: {
    children: 'Large Button',
    size: 'lg',
  },
};

export const Disabled = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};
