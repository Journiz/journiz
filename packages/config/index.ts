export const apiUrl =
  // @ts-ignore
  import.meta.env.VITE_API_URL && import.meta.env.VITE_API_URL !== true
    ? // @ts-ignore
      import.meta.env.VITE_API_URL
    : 'https://dev.journiz.leoboyer.dev'
