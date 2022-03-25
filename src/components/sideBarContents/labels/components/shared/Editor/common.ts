import {ILabel,LabelType} from '../../../../../../store/sideBar/labelSlice/shared/types';

export const Label2DTemplate:any = [
    {
        type: 'paragraph',
        children: [
          { text: 'Test text'},
        ],
      },
    ]
export const Label3DTemplate:any = [
    {

    type: 'paragraph',
    children: [
        { text: `Text {{ nodeId(options) }}`},
      ],
    }
]

export const getInitialContent = (selectedLabels:ILabel[]) => {
  if(selectedLabels.length > 1) {
    switch(selectedLabels[0].labelType) {
      case LabelType.LABEL2D:
      return([
        {
        type: 'paragraph',
        children: [
            { text: 'Cannot edit Multiple 2d labels selected'},
          ],
      }
    ])
    
      default:
        return JSON.parse(selectedLabels[0].label)
    }
  }
  else{
    return JSON.parse(selectedLabels[0].label)
  }
}