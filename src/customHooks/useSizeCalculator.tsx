
function useSizeCalculator(size : number ) {
    if (size >= 1024) {
        const kbSize = size / 1024
        if (kbSize >= 1024) {
          const mbSize = kbSize / 1024
          if(mbSize >= 1024){
            const gbSize = mbSize / 1024;
            return `${ (Math.round(gbSize * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2)} GB`
          }
          return `${ (Math.round(mbSize * Math.pow(10, 2)) / Math.pow(10, 2)).toFixed(2)} MB`
        }
        return `${Math.round(kbSize)} kB`
      }
      return `${size} B`
}

export default useSizeCalculator
