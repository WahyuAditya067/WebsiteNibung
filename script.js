// Fungsi untuk menandai tugas sebagai selesai
function toggleTask(taskItem) {
    taskItem.classList.toggle('completed');
    saveTaskStatus();
}

// Fungsi untuk menyimpan status tugas
function saveTaskStatus() {
    const taskItems = document.querySelectorAll('.task-item');
    const taskStatus = [];
    
    taskItems.forEach((item, index) => {
        taskStatus.push({
            index: index,
            completed: item.classList.contains('completed')
        });
    });
    
    // Simpan ke variabel untuk sesi ini
    window.taskStatus = taskStatus;
}

// Fungsi untuk memuat status tugas
function loadTaskStatus() {
    if (window.taskStatus) {
        const taskItems = document.querySelectorAll('.task-item');
        window.taskStatus.forEach(status => {
            if (taskItems[status.index] && status.completed) {
                taskItems[status.index].classList.add('completed');
            }
        });
    }
}

// Fungsi untuk menambahkan event listener ke semua tugas
function initializeTasks() {
    const taskItems = document.querySelectorAll('.task-item');
    
    taskItems.forEach(item => {
        item.addEventListener('click', function() {
            toggleTask(this);
        });
    });
}

// Fungsi untuk menghitung jumlah tugas
function updateTaskCount() {
    const totalTasks = document.querySelectorAll('.task-item').length;
    const completedTasks = document.querySelectorAll('.task-item.completed').length;
    const remainingTasks = totalTasks - completedTasks;
    
    console.log(`Total Tugas: ${totalTasks}`);
    console.log(`Selesai: ${completedTasks}`);
    console.log(`Tersisa: ${remainingTasks}`);
}

// Fungsi untuk menambahkan efek konfetti sederhana saat semua tugas selesai
function checkAllTasksCompleted() {
    const totalTasks = document.querySelectorAll('.task-item').length;
    const completedTasks = document.querySelectorAll('.task-item.completed').length;
    
    if (totalTasks > 0 && completedTasks === totalTasks) {
        showCelebration();
    }
}

// Fungsi untuk menampilkan pesan selamat
function showCelebration() {
    const celebration = document.createElement('div');
    celebration.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0,0,0,0.3);
        text-align: center;
        z-index: 1000;
        animation: popIn 0.5s ease;
    `;
    celebration.innerHTML = `
        <h2 style="color: #667eea; font-size: 2em; margin-bottom: 10px;">🎉 Selamat! 🎉</h2>
        <p style="color: #666; font-size: 1.2em;">Semua tugas telah selesai!</p>
        <button onclick="this.parentElement.remove()" style="
            margin-top: 20px;
            padding: 10px 30px;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 10px;
            cursor: pointer;
            font-size: 1em;
            font-weight: bold;
        ">Tutup</button>
    `;
    
    document.body.appendChild(celebration);
    
    setTimeout(() => {
        celebration.remove();
    }, 5000);
}

// Inisialisasi saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    initializeTasks();
    loadTaskStatus();
    
    // Update task count setiap kali ada perubahan
    const observer = new MutationObserver(function() {
        updateTaskCount();
        checkAllTasksCompleted();
    });
    
    const taskContainer = document.getElementById('taskContainer');
    if (taskContainer) {
        observer.observe(taskContainer, {
            attributes: true,
            subtree: true,
            attributeFilter: ['class']
        });
    }
    
    // Animasi smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Tambahkan animasi pop-in untuk celebration
const style = document.createElement('style');
style.textContent = `
    @keyframes popIn {
        0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0;
        }
        100% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);