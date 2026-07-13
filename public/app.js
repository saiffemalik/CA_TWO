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
