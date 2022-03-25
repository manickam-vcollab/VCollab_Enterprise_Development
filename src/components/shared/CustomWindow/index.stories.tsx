import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import CustomWindow from './index';
import { Layers } from '../../../store/windowMgrSlice';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  component: CustomWindow,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
} as ComponentMeta<typeof CustomWindow>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof CustomWindow> = (args) => <CustomWindow {...args} />;

export const Primary = Template.bind({});
Primary.args = {
    uid: "custom-window-id",
    /** The layer in which the window is added */
    layer: Layers.FRONT,
    /** should the window be visible */
    visible: true,
    /** top left position of the window in pixels */
    xy:[10,10],
    /** Title for the window  */
    title: "Test",
    /** initial width of the window */
    width: 300,
    /** initial height of the window */
    height: 300,
    resize:true,
    anchor:[0,0],
    autoPositionOnResize:true,
    onClickOutside: () => {},
    onDrag: () => {},
    onDragStop:() => {},
    onResize:() => {},
    onResizeStop:() => {},
    parentRef: {},
    children: <div>Custom Window</div>
}