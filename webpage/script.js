const loadUsersButton = document.getElementById("loadUsers");
const usersContainer = document.getElementById("usersContainer");
const message = document.getElementById("message");


loadUsersButton.addEventListener("click", function () {

    // mao ni ang loading
    message.textContent = "Loading...";
    message.classList.remove("error");

    // Clear previous users
    usersContainer.innerHTML = "";


    // Fetch users from API
    fetch("https://jsonplaceholder.typicode.com/users")

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to retrieve users.");
            }

            return response.json();

        })

        .then(users => {

            message.textContent = "";
        
            const table = document.createElement("table");
        
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Company</th>
                    </tr>
                </thead>
            `;
        
            const tbody = document.createElement("tbody");
        
            users.forEach(user => {
        
                const row = document.createElement("tr");
        
                row.innerHTML = `
                    <td>${user.name}</td>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.phone}</td>
                    <td>${user.company.name}</td>
                `;
        
                tbody.appendChild(row);
        
            });
        
            table.appendChild(tbody);
        
            usersContainer.appendChild(table);
        
        })

        .catch(error => {

            message.textContent =
                "Error: Unable to load users. Please try again.";

            message.classList.add("error");

            console.error(error);

        });

});