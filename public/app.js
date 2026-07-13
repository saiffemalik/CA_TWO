document.addEventListener('DOMContentLoaded', () => {
    loadEmployees();

    const employeeForm = document.getElementById('employeeForm');
    const submitBtn = document.getElementById('submitBtn');
    const cancelEditBtn = document.getElementById('cancelEditBtn');
    const formTitle = document.getElementById('formTitle');

    // Handle Employee Submit 
    employeeForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
       const data = {
            name: document.getElementById('empName').value,
            email: document.getElementById('empEmail').value,
            department: document.getElementById('empDept').value
        };

        const empId = document.getElementById('empId')?.value; // Hidden id field state logic
        const isUpdate = empId ? true : false;
        const url = isUpdate ? `/api/employees/${empId}` : '/api/employees';
        const method = isUpdate ? 'PUT' : 'POST';

        try {
            const response = await fetch(url, {
                method: method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (!response.ok) {
                alert(result.error || 'Failed to process employee data');
                return;
            }

            alert(result.message || (isUpdate ? 'Employee Profile Updated!' : 'Employee Profile Created!'));
            
            
            employeeForm.reset();
            if(document.getElementById('empId')) document.getElementById('empId').value = '';
            if(formTitle) formTitle.textContent = 'Register Employee';
            if(submitBtn) {
                submitBtn.textContent = 'Save Employee';
                submitBtn.style.backgroundColor = '#1e3a8a';
            }
            if(cancelEditBtn) cancelEditBtn.style.display = 'none';

            loadEmployees(); 
        } catch (error) {
            alert('Network error while processing request');
        }
    });

    // Cancel Button Trigger
    document.getElementById('cancelEditBtn')?.addEventListener('click', () => {
        employeeForm.reset();
        if(document.getElementById('empId')) document.getElementById('empId').value = '';
        formTitle.textContent = 'Register Employee';
        submitBtn.textContent = 'Save Employee';
        submitBtn.style.backgroundColor = '#1e3a8a';
        cancelEditBtn.style.display = 'none';
    });
});

// Fetch and Render Data 
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
                    <td>
                    <button class="edit-btn" data-id="${emp.id}" data-name="${emp.name}" data-email="${emp.email}" data-department="${emp.department}" style="background-color: #1e3a8a; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: 600;">Edit</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error('Error rendering employees table:', err);
    }
}