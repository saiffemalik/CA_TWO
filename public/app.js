document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();

    const employeeForm = document.getElementById('employeeForm');

    // Handle Employee Submit 
    employeeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const data = {
            name: document.getElementById('empName').value,
            email: document.getElementById('empEmail').value,
            department: document.getElementById('empDept').value
        };

        try {
            const response = await fetch('/api/employees', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error || 'Failed to save employee data');
                return;
            }

            alert(result.message || 'Employee Profile Created!');
            employeeForm.reset();
            loadEmployees(); // Reload table dynamically
        } catch (error) {
            alert('Network error while saving employee');
        }
    });
});

// Fetch and Render Data matching your exact current Backend API response
async function loadEmployees() {
    try {
        const res = await fetch('/api/employees');
        const result = await res.json();
        
        const tbody = document.querySelector('#employeeTable tbody');
        tbody.innerHTML = '';

        // Safely extract the array from your backend wrapper { data: [...] }
        const employeesArray = result.data || result;

        employeesArray.forEach(emp => {
            tbody.innerHTML += `
                <tr>
                    <td><strong>${emp.id}</strong></td>
                    <td>${emp.name}</td>
                    <td>${emp.email}</td>
                    <td>${emp.department}</td>
                </tr>
            `;
        });
    } catch (err) {
        console.error('Error rendering employees table:', err);
    }
}