# Homemade Suspense

This is a toy implementation of Suspense using Error Boundaries.
Do not use this in production!

This is using the github API to display a repositories' file tree. Data is fetched 'synchronously' inside the component, in a toy approximation of what the Suspense API is doing.

The idea is to use an ErrorBoundary show a loading state if we catch a promise that is being thrown further down the tree. The promise is thrown if data is not yet fetched (cache miss) and returned synchronously if data is already there (cache hit)

Check out HomemadeSuspense.js and cache.js to see the magic.

_Note: you'll have to supply your own API token in resources.js_

![Image of a github file tree rendered with our toy suspense implementation](https://i.imgur.com/lxvHZ68.png)
