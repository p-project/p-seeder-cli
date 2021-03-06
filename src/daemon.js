import rp from 'request-promise'

export const daemon = 'http://localhost:2342'

export function add (torrent) {
  return rp.post({
    url: `${daemon}/add`,
    json: {
      'infoHash': torrent
    }
  })
}

export function seed (path, desc, name, categories) {
  return rp.post({
    url: `${daemon}/seed`,
    json: {
      path: path,
      desc: desc,
      name,
      categories
    }
  })
}

export function remove (torrent) {
  return rp.delete(`${daemon}/delete/${torrent}`)
}

export async function list () {
  const res = await rp.get(`${daemon}/list`)
  return JSON.parse(res)
}

export async function info (torrent) {
  const res = await rp.get(`${daemon}/info/${torrent}`)
  return JSON.parse(res)
}
