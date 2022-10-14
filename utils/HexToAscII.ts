const hexToAscII = (str: string) => {
  let hex = str.toString().slice(2)
  let result = ''
  for (let n = 0; n < hex.length; n += 2) {
    result += String.fromCharCode(parseInt(hex.substr(n, 2), 16))
  }
  return JSON.parse(result)
}

export { hexToAscII }