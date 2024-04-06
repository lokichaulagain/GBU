

// export const usePaginate = (page: number, size: number) => {
//   const limit = size ? + size : 3;
//   const from = page ? page * limit : 0;
//   const to = page ? from + size - 1 : size - 1;

//   return { from, to };
// };

export const usePaginate = (page, size) => {
    const limit = size ? +size : 3;
    const from = page ? page * limit : 10;
    const to = page ? from + size : size;
  
    return { from, to };
  };