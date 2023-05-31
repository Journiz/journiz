export default async function fetchAsBase64(url: string) {
  const response = await fetch(url)
  const blob = await response.blob()
  return new Promise((resolve, reject) => {
    try {
      const reader = new FileReader()
      reader.onload = function () {
        resolve(this.result)
      }
      reader.readAsDataURL(blob)
    } catch (e) {
      reject(e)
    }
  })
}
