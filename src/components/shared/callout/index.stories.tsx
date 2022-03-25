import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import Callout from './index';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: Callout,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof Callout>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Callout> = (args) => <Callout {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    arrowStartPos: [500,500],
    visible: true,
    children: <div>Callout</div>
}