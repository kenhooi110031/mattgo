// Combined sidebar functionality (navigation + collapsible)
document.addEventListener('DOMContentLoaded', function() {
    // --- Navigation functionality ---
    function setActiveNavItem() {
        const path = window.location.pathname;
        const navItems = document.querySelectorAll('.nav-item');

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === path) {
                item.classList.add('active');
            }
        });
    }

    // Initial navigation setup
    setActiveNavItem();

    // --- Collapsible functionality ---
    const sidebar = document.querySelector('.sidebar');
    const mainContent = document.querySelector('.main-content');
    const footerContainer = document.querySelector('.footer-container');
    const appContainer = document.querySelector('.app-container');

    // Create a sidebar hint element
    const sidebarHint = document.createElement('div');
    sidebarHint.className = 'sidebar-hint';
    sidebarHint.innerHTML = '<div class="hint-icon">≡</div>';
    appContainer.appendChild(sidebarHint);

    // Create a sidebar hover area
    const hoverArea = document.createElement('div');
    hoverArea.className = 'sidebar-hover-area';
    appContainer.appendChild(hoverArea);

    // Initial state - sidebar visible
    let sidebarVisible = true;

    // Function to collapse sidebar
    function collapseSidebar() {
        if (sidebarVisible) {
            sidebar.classList.add('collapsed');
            mainContent.classList.add('sidebar-collapsed');
            footerContainer.classList.add('sidebar-collapsed');
            sidebarHint.classList.add('visible');
            sidebarVisible = false;
        }
    }

    // Function to expand sidebar
    function expandSidebar() {
        if (!sidebarVisible) {
            sidebar.classList.remove('collapsed');
            mainContent.classList.remove('sidebar-collapsed');
            footerContainer.classList.remove('sidebar-collapsed');
            sidebarHint.classList.remove('visible');
            sidebarVisible = true;
        }
    }

    // Auto-hide sidebar after 3 seconds of inactivity
    let sidebarTimer;

    function resetSidebarTimer() {
        clearTimeout(sidebarTimer);
        sidebarTimer = setTimeout(collapseSidebar, 3000); // 3 seconds
    }

    // Initialize the timer
    resetSidebarTimer();

    // Mouse events
    sidebar.addEventListener('mouseenter', function() {
        expandSidebar();
        // Don't reset timer while actively using sidebar
        clearTimeout(sidebarTimer);
    });

    sidebar.addEventListener('mouseleave', function() {
        resetSidebarTimer();
    });

    // The hover area to show sidebar
    hoverArea.addEventListener('mouseenter', expandSidebar);

    // Sidebar hint click to show sidebar
    sidebarHint.addEventListener('click', expandSidebar);

    // Reset timer on any mouse movement in the document
    document.addEventListener('mousemove', function(e) {
        // Only reset if mouse is not over sidebar or hover area
        if (!sidebar.contains(e.target) && !hoverArea.contains(e.target)) {
            resetSidebarTimer();
        }
    });

    // Manual toggle button option (optional)
    const toggleButton = document.createElement('button');
    toggleButton.className = 'sidebar-toggle';
    toggleButton.innerHTML = '◀';
    toggleButton.setAttribute('aria-label', 'Toggle sidebar');
    sidebar.appendChild(toggleButton);

    toggleButton.addEventListener('click', function() {
        if (sidebarVisible) {
            collapseSidebar();
        } else {
            expandSidebar();
        }
    });

    // Handle navigation item clicks
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', function() {
            // Update active class immediately on click (for better UX)
            document.querySelectorAll('.nav-item').forEach(navItem => {
                navItem.classList.remove('active');
            });
            this.classList.add('active');
        });
    });
});