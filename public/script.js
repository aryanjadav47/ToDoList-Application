const API_URL = "http://localhost:5000/api/tasks";

const taskForm = document.getElementById("task-form");
const taskList = document.getElementById("task-list");

// Fetch and display tasks
async function fetchTasks() {
  taskList.innerHTML = "";
  try {
    const res = await fetch(API_URL);
    const tasks = await res.json();

    tasks.forEach((task) => {
      const li = document.createElement("li");
      li.className = "task-item";
      li.innerHTML = `
        <span class="${task.isCompleted ? "completed" : ""}">
          <strong>${task.title}</strong> - ${task.description}
        </span>
        <div class="task-actions">
          <button onclick="markComplete('${task._id}')">✔</button>
          <button onclick="deleteTask('${task._id}')">❌</button>
        </div>
      `;
      taskList.appendChild(li);
    });
  } catch (error) {
    console.error("Error fetching tasks:", error);
  }
}

// Add a new task
taskForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;

  try {
    await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    taskForm.reset();
    fetchTasks();
  } catch (error) {
    console.error("Error adding task:", error);
  }
});

// Mark task as complete
async function markComplete(id) {
  try {
    await fetch(`${API_URL}/${id}/complete`, { method: "PATCH" });
    fetchTasks();
  } catch (error) {
    console.error("Error marking task complete:", error);
  }
}

// Delete a task
async function deleteTask(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    fetchTasks();
  } catch (error) {
    console.error("Error deleting task:", error);
  }
}

// Initial fetch
fetchTasks();
