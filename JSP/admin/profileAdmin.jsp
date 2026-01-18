<%-- 
    Document   : profileAdmin
    Updated for: Path Fix & Database Connection
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Edit Profile | Mentorship Platform</title>
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashboardAdmin.css">
        <link rel="stylesheet" href="${pageContext.request.contextPath}/css/profile.css">
    </head>
    <body>

        <header class="main-header">
            <div class="logo-area"><h1>MentorshipApp</h1></div>
            <nav class="user-nav">
            <a href="${pageContext.request.contextPath}/LogoutServlet" class="btn btn-logout">Logout</a> 
            </nav>
        </header>

        <main class="dashboard-main-content">

            <aside class="sidebar">
                <div class="sidebar-header">
                    <h3 class="role-title">Welcome, ${sessionScope.user.name}!</h3>
                    <p class="role-subtitle">Administrator Panel</p>
                </div>

                <nav class="role-nav">
                    <a href="${pageContext.request.contextPath}/AdminServlet?action=dashboard" >
                        <span class="nav-icon">🏠</span> Dashboard
                    </a>

                    <a href="${pageContext.request.contextPath}/AdminServlet?action=list_professions">
                        <span class="nav-icon">🧰</span> Professions
                    </a>

                    <a href="${pageContext.request.contextPath}/admin/profileAdmin.jsp" class="active-link">
                        <span class="nav-icon">👤</span> Profile
                    </a>
                </nav>
            </aside>

            <section class="content-area">
                <h2 id="page-title">My Profile</h2>
                
                <% if(request.getParameter("msg") != null) { %>
                    <div style="padding: 10px; background-color: #d4edda; color: #155724; border-radius: 4px; margin-bottom: 20px;">
                        <%= request.getParameter("msg") %>
                    </div>
                <% } %>

                <div class="profile-container">
                    <div class="profile-card">
                            <div class="profile-image-container">
                                <img src="https://ui-avatars.com/api/?name=${sessionScope.user.name}&background=0d6efd&color=fff&size=150" alt="Admin Profile" class="profile-image">
                            </div>


                        <form id="editProfileForm" class="profile-form" action="${pageContext.request.contextPath}/AdminServlet" method="POST">
                            <input type="hidden" name="action" value="update_profile">
                            
                            <div class="form-section">
                                <h3 class="form-section-title">Personal Information</h3>

                                <div class="form-grid">
                                    <div class="form-group">
                                        <label for="fullName" class="form-label">Full Name *</label>
                                        <input type="text" id="firstName" name="fullName" class="form-input" value="${sessionScope.user.name}" required>
                                    </div>

                                    <div class="form-group">
                                        <label for="email" class="form-label">Email Address *</label>
                                        <input type="email" id="email" name="email" class="form-input" value="${sessionScope.user.email}" required>
                                    </div>

                                    <div class="form-group">
                                        <label for="noPhone" class="form-label">Phone Number</label>
                                        <input type="tel" id="phone" name="noPhone" class="form-input" value="${sessionScope.user.noPhone}">
                                    </div>
                                </div>

                                <div class="form-section">
                                    <h3 class="form-section-title">Change Password</h3>

                                    <div class="form-group">
                                        <label for="currentPassword" class="form-label">Current Password</label>
                                        <input type="password" id="currentPassword" name="currentPassword" class="form-input" placeholder="Enter current password">
                                    </div>

                                    <div class="form-grid">
                                        <div class="form-group">
                                            <label for="newPassword" class="form-label">New Password</label>
                                            <input type="password" id="newPassword" name="newPassword" class="form-input" placeholder="Enter new password (min. 8 characters)">
                                        </div>

                                        <div class="form-group">
                                            <label for="confirmPassword" class="form-label">Confirm Password</label>
                                            <input type="password" id="confirmPassword" name="confirmPassword" class="form-input" placeholder="Confirm new password">
                                        </div>
                                    </div>
                                </div>

                                <div class="form-actions">
                                    <button type="button" class="btn btn-outline" onclick="window.history.back()">Cancel</button>
                                    <button type="submit" class="btn btn-primary">Save Changes</button>
                                </div>
                        </form>
                    </div>
                </div>

            </section>
            </main>

    </body>
</html>