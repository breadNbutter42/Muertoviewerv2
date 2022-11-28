import Parser from 'rss-parser'

export default defineEventHandler(async () => {
  let parser = new Parser()

  const parsedData = await parser.parseURL('https://medium.com/feed/@losmuertos')
  
  return parsedData.items
})