import Cache from './cache'

const cache = new Cache()
const sortOrder = ['dir', 'file']

export const FileTreeResource = cache.createResource(path =>
  fetch(
    `https://api.github.com/repos/facebook/react/contents/${path}?ref=master`,
    {
      headers: {
        Authorization: `token YOUR-TOKEN-HERE`,
      },
    }
  )
    .then(res => res.json())
    .then(json =>
      []
        .concat(json)
        .sort((a, b) => sortOrder.indexOf(a.type) - sortOrder.indexOf(b.type))
    )
)
