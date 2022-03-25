import { useState } from 'react';
import { useEffect } from 'react';
import { useResizeDetector } from 'react-resize-detector';
function useContainer(targetRef:React.MutableRefObject<null>, deps:any[] ) {
  const { width, height } = useResizeDetector({ targetRef });
  const [outWidth, setOutWidth] = useState(0);
  const [outHeight, setOutHeight] = useState(0);
  useEffect(() => {
      setOutWidth(width?width:0);
      setOutHeight(height?height:0);
  },[width,height])
  return [outWidth,outHeight];
}

export default useContainer
