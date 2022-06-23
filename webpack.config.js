module.exports = {
    resolve:{
        fallback:{
            "url": require.resolve("url/"),
            "assert": require.resolve("assert/"),
            "stream": require.resolve("stream-browserify"),
            "crypto": require.resolve("crypto-browserify"),
            "https": require.resolve("https-browserify"),
            "http": require.resolve("stream-http")

        }
    }
}