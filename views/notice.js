detailButton.addEventListener('click', _ => {
    fetch('/quotes', {
      method: 'delete',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({
        name: 'BabO'
      })
    })
    .then(res => {
      if(res.ok)  return res.json();
    })
    .then(data => {
      window.location.reload();
    });
  });