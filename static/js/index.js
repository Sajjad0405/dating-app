let remove = document.getElementById('js-remove');

if (remove) {
  remove.addEventListener('click', onremove)
}

function onremove(ev) {
    let node = ev.target;
    let id = node.dataset.id;

    console.log(node.dataset);

    let res = new XMLHttpRequest()

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