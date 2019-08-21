function ThrowablePromise(promise) {
  this.promise = promise
}

class Cache {
  storage = new Map()

  createResource(fn) {
    const resource = {
      read: key => {
        if (this.storage.has(resource) && this.storage.get(resource).has(key)) {
          // cache hit
          return this.storage.get(resource).get(key)
        } else {
          // cache miss
          const promise = fn(key)
          promise.then(value => {
            const keyMap = this.storage.get(resource) || new Map()
            keyMap.set(key, value)
            this.storage.set(resource, keyMap)
          })

          throw new ThrowablePromise(promise)
        }
      },
    }

    return resource
  }
}

export default Cache
