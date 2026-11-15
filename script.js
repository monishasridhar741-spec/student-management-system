let students = JSON.parse(localStorage.getItem("students")) || [];
let editIndex = -1;

const form = document.getElementById("studentForm");
const studentList = document.getElementById("studentList");
const search = document.getElementById("search");

function displayStudents(data = students) {
    studentList.innerHTML = "";

    data.forEach((student) => {
        const row = document.createElement("tr");

        [student.name, student.roll, student.department, student.email]
            .forEach(value => {
                const cell = document.createElement("td");
                cell.textContent = value;
                row.appendChild(cell);
            });

        const actionCell = document.createElement("td");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editStudent(student.roll);

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.style.background = "red";
        deleteButton.onclick = () => deleteStudent(student.roll);

        actionCell.append(editButton, deleteButton);
        row.appendChild(actionCell);

        studentList.appendChild(row);
    });
    document.getElementById("totalStudents").textContent = students.length;

document.getElementById("totalDepartments").textContent =
    new Set(students.map(s => s.department.toLowerCase())).size;
}

function saveStudents() {
    localStorage.setItem("students", JSON.stringify(students));
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const student = {
        name: document.getElementById("name").value.trim(),
        roll: document.getElementById("roll").value.trim(),
        department: document.getElementById("department").value.trim(),
        email: document.getElementById("email").value.trim()
    };

    if (students.some((s, i) =>
        s.roll === student.roll && i !== editIndex)) {
        alert("Roll Number already exists!");
        return;
    }

    if (editIndex === -1) {
        students.push(student);
        alert("Student Added Successfully!");
    } else {
        students[editIndex] = student;
        alert("Student Updated Successfully!");
        editIndex = -1;
    }

    saveStudents();
    displayStudents();
    form.reset();
});

function editStudent(roll) {
    editIndex = students.findIndex(s => s.roll === roll);

    const student = students[editIndex];

    document.getElementById("name").value = student.name;
    document.getElementById("roll").value = student.roll;
    document.getElementById("department").value = student.department;
    document.getElementById("email").value = student.email;
}

function deleteStudent(roll) {
    if (confirm("Are you sure you want to delete?")) {
        students = students.filter(s => s.roll !== roll);
        saveStudents();
        displayStudents();
        alert("Student Deleted Successfully!");
    }
}

search.addEventListener("input", function() {
    const value = search.value.toLowerCase();

    const filtered = students.filter(s =>
        s.name.toLowerCase().includes(value) ||
        s.roll.toLowerCase().includes(value) ||
        s.department.toLowerCase().includes(value)
    );

    displayStudents(filtered);
});

displayStudents();