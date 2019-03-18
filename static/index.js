var remove = document.getElementById('js-remove');

if (remove) {
  remove.addEventListener('click', onremove)
}

function onremove(ev) {

  console.log("Bla bla");
  
  var node = ev.target;
  var id = node.dataset.id;

  var res = new XMLHttpRequest()

  res.open('DELETE', '/' + id)
  res.onload = onload
  res.send()

  function onload() {
    if (res.status !== 200) {
      throw new Error('Could not delete!')
    }
    window.location = '/'
  }

}
