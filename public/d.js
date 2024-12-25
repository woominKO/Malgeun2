fetch('/공지사항')
  .then(response => response.json())
  .then(data => {
    const tableBody = document.getElementById('postTableBody');
    tableBody.innerHTML = data.map((quote, index) => `
      <tr>
        <td>${index + 1}</td>
        <td>${quote.title}</td>
        <td>${quote.detail.substring(0, 100)}...</td>
        <td>${new Date(quote.date).toLocaleDateString()}</td>
      </tr>
    `).join('');
  })
  .catch(err => console.error('Error:', err));
