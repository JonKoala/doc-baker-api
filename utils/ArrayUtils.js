module.exports = {
  containsAll (haystack, needles) {
    haystack = haystack.map(e => e.toString())
    return needles.every(needle => haystack.includes(needle.toString()))
  }
}
