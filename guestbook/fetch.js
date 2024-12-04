fetch('https://api.allorigins.win/raw?url=https%3A%2F%2Fusers2.smartgb.com%2Fg%2Fg.php%3Fa%3Ds%26i%3Dg26-39906-27')
    .then(response => response.text())
    .then(html => {
        let parser = new DOMParser();
        let doc = parser.parseFromString(html, 'text/html');
        let entries = doc.querySelectorAll('table[bgcolor="#F4F4F4"]');

        entries.forEach(entry => {
            let dateElement = entry.querySelector('tr > td > font');
            let date = dateElement.parentNode.nextSibling.textContent.trim();
            let name = entry.querySelector('tr:nth-child(2) td:nth-child(2)') ? entry.querySelector('tr:nth-child(2) td:nth-child(2)').textContent.trim() : 'No name';
            let email = entry.querySelector('tr:nth-child(3) td:nth-child(2) a') ? entry.querySelector('tr:nth-child(3) td:nth-child(2) a').textContent.trim() : 'No email';
            let web = entry.querySelector('tr:nth-child(4) td:nth-child(2) a') ? entry.querySelector('tr:nth-child(4) td:nth-child(2) a').textContent.trim() : 'No website';
            let number = entry.querySelector('tr:nth-child(5) td:nth-child(2)') ? entry.querySelector('tr:nth-child(5) td:nth-child(2)').textContent.trim() : 'No number';
            let message = entry.querySelector('.divmess') ? entry.querySelector('.divmess').innerHTML.trim() : 'No message';

            let guestbookEntry = document.createElement('div');
            guestbookEntry.classList.add('guestbook-entry');

            guestbookEntry.innerHTML = `
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                <p><strong>Website:</strong> <a href="${web}" target="_blank">${web}</a></p>
                <p><strong>Number:</strong> ${number}</p>
                <p><strong>Message:</strong> ${message}</p>
                <hr>
            `;

            document.getElementById('guestbook-container').appendChild(guestbookEntry);
        });
    })
    .catch(error => {
        document.getElementById('guestbook-container').innerHTML = `Error fetching the guestbook: ${error}`;
    });
