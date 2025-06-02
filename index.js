document.addEventListener('DOMContentLoaded', () => {
    loadTableData();
});

document.getElementById('registrationForm').addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const dob = document.getElementById('dob').value;
    const terms = document.getElementById('terms').checked;
    const dobError = document.getElementById('dobError');

    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }

    if (age < 18 || age > 55) {
        dobError.textContent = 'Age must be between 18 and 55 years.';
        return;
    } else {
        dobError.textContent = '';
    }

    const user = { name, email, password, dob, terms };
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    addToTable(user);
    document.getElementById('registrationForm').reset();
});

function loadTableData() {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    users.forEach(user => addToTable(user));
}

function addToTable(user) {
    const tableBody = document.getElementById('tableBody');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>${user.dob}</td>
        <td>${user.terms}</td>
    `;
    tableBody.appendChild(row);
}
