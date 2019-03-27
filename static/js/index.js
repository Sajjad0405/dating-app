var remove = document.getElementById('js-remove');

if (remove) {
  remove.addEventListener('click', onremove)
}

function onremove(ev) {

  var node = ev.target;
  var id = node.dataset.id;

  console.log(node.dataset);

  var res = new XMLHttpRequest()

  res.open('DELETE', '/game/' + id)
  res.onload = onload
  res.send()

  function onload() {
    if (res.status !== 200) {
      throw new Error('Could not delete!')
    }
    window.location = '/profile'
  }
}