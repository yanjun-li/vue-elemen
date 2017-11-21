function $$(query, context = document) {
  let elements = context.querySelectorAll(query)
  return Array.prototype.slice.call(elements)
}

export {
  $$
}
