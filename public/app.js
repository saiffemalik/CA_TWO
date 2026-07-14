document.addEventListener("DOMContentLoaded", () => {
  loadEmployees();
  loadVfmCards();
  populateEmployeeDropdown();

  const employeeForm = document.getElementById("employeeForm");
  const submitBtn = document.getElementById("submitBtn");
  const cancelEditBtn = document.getElementById("cancelEditBtn");
  const formTitle = document.getElementById("formTitle");
  const tbody = document.getElementById("tbody");

  // Handle Employee Submit
  employeeForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
      name: document.getElementById("empName").value,
      email: document.getElementById("empEmail").value,
      department: document.getElementById("empDept").value,
    };

    const empId = document.getElementById("empId")?.value; // Hidden id field state logic
    const isUpdate = empId ? true : false;
    const url = isUpdate ? `/api/employees/${empId}` : "/api/employees";
    const method = isUpdate ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        alert(result.error || "Failed to process employee data");
        return;
      }

      alert(
        result.message ||
          (isUpdate
            ? "Employee Profile Updated!"
            : "Employee Profile Created!"),
      );

      employeeForm.reset();
      if (document.getElementById("empId"))
        document.getElementById("empId").value = "";
      if (formTitle) formTitle.textContent = "Register Employee";
      if (submitBtn) {
        submitBtn.textContent = "Save Employee";
        submitBtn.style.backgroundColor = "#1e3a8a";
      }
      if (cancelEditBtn) cancelEditBtn.style.display = "none";

      loadEmployees();
      populateEmployeeDropdown();

    } catch (error) {
      alert("Network error while processing request");
    }
  });

  // Cancel Button Trigger
  document.getElementById("cancelEditBtn")?.addEventListener("click", () => {
    employeeForm.reset();
    if (document.getElementById("empId"))
      document.getElementById("empId").value = "";
    formTitle.textContent = "Register Employee";
    submitBtn.textContent = "Save Employee";
    submitBtn.style.backgroundColor = "#1e3a8a";
    cancelEditBtn.style.display = "none";
  });
});

// Fetch and Render Data
async function loadEmployees() {
  try {
    const res = await fetch("/api/employees");
    const result = await res.json();

    const tbody = document.querySelector("#employeeTable tbody");
    tbody.innerHTML = "";

    // Safely extract the array from your backend wrapper { data: [...] }
    const employeesArray = result.data || result;

    employeesArray.forEach((emp) => {
      const tr = document.createElement("tr");

      tr.innerHTML = `
                    <td><strong>${emp.id}</strong></td>
                    <td>${emp.name}</td>
                    <td>${emp.email}</td>
                    <td>${emp.department}</td>
                    <td>
                    <button class="edit-btn" data-id="${emp.id}" data-name="${emp.name}" data-email="${emp.email}" data-department="${emp.department}" style="background-color: #1e3a8a; color: white; border: none; padding: 6px 12px; border-radius: 4px; cursor: pointer; font-weight: 600;">Edit</button>
                    <button class="delete-btn" data-id="${emp.id}" style="background-color: #c62828; color: white; border: none; padding: 6px 12px; margin-left: 5px; cursor: pointer;">Delete</button>
                    </td>
            `;

      tr.querySelector(".edit-btn").addEventListener("click", (e) => {
        const btn = e.target;

        // Primary form text boxes population mechanism
        document.getElementById("empId").value = btn.getAttribute("data-id");
        document.getElementById("empName").value =
          btn.getAttribute("data-name");
        document.getElementById("empEmail").value =
          btn.getAttribute("data-email");
        document.getElementById("empDept").value =
          btn.getAttribute("data-department");

        // Form layout switch to update view context
        if (formTitle) formTitle.textContent = "Update Employee Profile";
        if (submitBtn) {
          submitBtn.textContent = "Confirm Update";
          submitBtn.style.backgroundColor = "#2e7d32"; // Green color for update mode
        }
        if (cancelEditBtn) cancelEditBtn.style.display = "block";

        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      tr.querySelector(".delete-btn").addEventListener("click", async (e) => {
        if (confirm("Are you sure you want to delete this employee?")) {
          const id = e.target.getAttribute("data-id");
          try {
            const response = await fetch(`/api/employees/${id}`, {
              method: "DELETE",
            });
            if (response.ok) {
              loadEmployees(); // Refresh the table after deletion
              populateEmployeeDropdown();
            } else {
              alert("Failed to delete employee.");
            }
          } catch (err) {
            console.error("Delete error:", err);
          }
        }
      });

      tbody.appendChild(tr);
    });
  } catch (err) {
    console.error("Error rendering employees table:", err);
  }
}

async function loadVfmCards() {
    const res = await fetch('/api/cards');
    const data = await res.json();
    const tbody = document.querySelector('#VfmTable tbody');
    if (!tbody) return;
    tbody.innerHTML = '';
    (data.data || data).forEach(card => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${card.id}</td>
            <td>${card.name}</td>
            <td>${card.card_number}</td>
            <td>€${card.grocery_allowance}</td>
            <td>${card.reward_points}</td>
            <td>
                <button class="edit-card-btn" data-id="${card.id}" data-employee_id="${card.employee_id}" data-card_number="${card.card_number}" data-allowance="${card.grocery_allowance}" data-points="${card.reward_points}" style="background-color:#1e3a8a;color:white;border:none;padding:6px 12px;border-radius:4px;cursor:pointer;font-weight:600;">Edit</button>
                <button class="delete-card-btn" data-id="${card.id}" style="background-color:#c62828;color:white;border:none;padding:6px 12px;margin-left:5px;cursor:pointer;">Delete</button>
            </td>
        `;

        tr.querySelector('.edit-card-btn').addEventListener('click', (e) => {
            const btn = e.target;
            document.getElementById('cardId').value = btn.getAttribute('data-id');
            document.getElementById('employeeDropdown').value = btn.getAttribute('data-employee_id');
            document.getElementById('cardNumber').value = btn.getAttribute('data-card_number');
            document.getElementById('groceryAllowance').value = btn.getAttribute('data-allowance');
            document.getElementById('rewardPoints').value = btn.getAttribute('data-points');

            // Employee & card number lock ho jayenge — sirf allowance/points editable
            document.getElementById('employeeDropdown').disabled = true;
            document.getElementById('cardNumber').disabled = true;

            document.getElementById('vfmFormTitle').textContent = 'Update VFM Card';
            const vfmSubmitBtn = document.getElementById('vfmSubmitBtn');
            vfmSubmitBtn.textContent = 'Confirm Update';
            vfmSubmitBtn.style.backgroundColor = '#2e7d32';
            document.getElementById('vfmCancelEditBtn').style.display = 'block';

            
        });

        tr.querySelector('.delete-card-btn').addEventListener('click', async () => {
            if (confirm('Delete this VFM card?')) {
                const res = await fetch(`/api/cards/${card.id}`, { method: 'DELETE' });
                if (res.ok) loadVfmCards();
                else alert('Failed to delete card.');
            }
        });

        tbody.appendChild(tr);
    });
}

// --- POPULATE DROPDOWN ---
async function populateEmployeeDropdown() {
    const res = await fetch('/api/employees');
    const data = await res.json();
    const dropdown = document.getElementById('employeeDropdown');
    if(!dropdown) return;
    dropdown.innerHTML = '<option value="">-- Choose an Employee --</option>';
    (data.data || data).forEach(emp => {
        dropdown.innerHTML += `<option value="${emp.id}">${emp.name}</option>`;
    });
}

document.getElementById('vfmForm')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cardId = document.getElementById('cardId').value;
    const isUpdate = cardId ? true : false;

    const data = isUpdate
        ? {
            grocery_allowance: document.getElementById('groceryAllowance').value,
            reward_points: document.getElementById('rewardPoints').value
          }
        : {
            employee_id: document.getElementById('employeeDropdown').value,
            card_number: document.getElementById('cardNumber').value,
            grocery_allowance: document.getElementById('groceryAllowance').value,
            reward_points: document.getElementById('rewardPoints').value
          };

    const url = isUpdate ? `/api/cards/${cardId}` : '/api/cards';
    const method = isUpdate ? 'PUT' : 'POST';

    const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    });

    const result = await res.json();

    if (res.ok) {
        alert(result.message || (isUpdate ? 'Card Updated!' : 'Card Issued!'));
        resetVfmForm();
        loadVfmCards();
    } else {
        alert(result.error || 'Failed to process card');
    }
});

// Cancel Edit
document.getElementById('vfmCancelEditBtn')?.addEventListener('click', resetVfmForm);

function resetVfmForm() {
    document.getElementById('vfmForm').reset();
    document.getElementById('cardId').value = '';
    document.getElementById('employeeDropdown').disabled = false;
    document.getElementById('cardNumber').disabled = false;
    document.getElementById('vfmFormTitle').textContent = 'Issue VFM Card';
    const vfmSubmitBtn = document.getElementById('vfmSubmitBtn');
    vfmSubmitBtn.textContent = 'Issue Card';
    vfmSubmitBtn.style.backgroundColor = '#1e3a8a';
    document.getElementById('vfmCancelEditBtn').style.display = 'none';
}