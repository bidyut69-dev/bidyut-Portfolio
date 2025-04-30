// Initialize Charts
document.addEventListener('DOMContentLoaded', function() {
    // Sales Chart
    const salesCtx = document.getElementById('salesChart').getContext('2d');
    const salesChart = new Chart(salesCtx, {
        type: 'line',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Sales',
                data: [12000, 19000, 15000, 25000, 22000, 30000],
                borderColor: '#4f46e5',
                backgroundColor: 'rgba(79, 70, 229, 0.1)',
                tension: 0.4,
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Revenue Chart
    const revenueCtx = document.getElementById('revenueChart').getContext('2d');
    const revenueChart = new Chart(revenueCtx, {
        type: 'bar',
        data: {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
            datasets: [{
                label: 'Revenue',
                data: [8000, 12000, 10000, 18000, 15000, 20000],
                backgroundColor: '#818cf8',
                borderRadius: 4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    searchInput.addEventListener('input', function(e) {
        // Implement search functionality here
        console.log('Searching for:', e.target.value);
    });

    // Notification click handler
    const notificationIcon = document.querySelector('.notification');
    notificationIcon.addEventListener('click', function() {
        // Implement notification functionality here
        console.log('Notification clicked');
    });

    // Update stats with real-time data
    function updateStats() {
        // Simulate real-time data updates
        const stats = {
            totalSales: Math.floor(Math.random() * 100000),
            totalRevenue: Math.floor(Math.random() * 50000),
            totalOrders: Math.floor(Math.random() * 1000),
            totalCustomers: Math.floor(Math.random() * 500)
        };

        document.querySelector('.stat-card:nth-child(1) .stat-value').textContent = `$${stats.totalSales.toLocaleString()}`;
        document.querySelector('.stat-card:nth-child(2) .stat-value').textContent = `$${stats.totalRevenue.toLocaleString()}`;
        document.querySelector('.stat-card:nth-child(3) .stat-value').textContent = stats.totalOrders.toLocaleString();
        document.querySelector('.stat-card:nth-child(4) .stat-value').textContent = stats.totalCustomers.toLocaleString();
    }

    // Update stats every 5 seconds
    setInterval(updateStats, 5000);
});

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if (document.body.classList.contains('dark-mode')) {
        themeIcon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('theme', 'dark');
    } else {
        themeIcon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('theme', 'light');
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const sidebar = document.querySelector('.sidebar');

mobileMenuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('active');
    mobileMenuToggle.classList.toggle('active');
});

// Close sidebar when clicking outside
document.addEventListener('click', (e) => {
    if (!sidebar.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
        sidebar.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }
}); 