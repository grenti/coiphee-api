const PageLinkFactory = require('../../app/controllers/pageLinkFactory')
const test = require('tape')

test('Ensure Factory returns collection paged response', t => {
  const result = PageLinkFactory.build('coiffeur', [], 1, 25, 1)

  t.deepEqual(result.data, [], 'The data result should be empty')
  t.notEqual(result.links, null)

  // const expectedLinks = {
  //   first: 'http://localhost:4625/v0/coiffeurs?page=1&rows=25',
  //   previous: 'http://localhost:4625/v0/coiffeurs?page=1&offset=25',
  //   next: 'http://localhost:4625/v0/coiffeurs?page=1&rows=25',
  //   last: 'http://localhost:4625/v0/coiffeurs?page=1&offset=25'
  // }
  // t.deepEqual(result.links, expectedLinks)
  t.end()
})
