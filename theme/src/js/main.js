let elements = document.querySelectorAll('pre')

elements.forEach((element, key) => {
  element.innerHTML = key
})