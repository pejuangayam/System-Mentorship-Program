<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>My Profile | Mentorship Platform</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/profile.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashboardMentee.css" />
</head>
<body>

  <header class="main-header">
    <div class="logo-area"><h1>MentorshipApp</h1></div>
    <nav class="user-nav">
      <a href="${pageContext.request.contextPath}/MenteeServlet?action=profile" class="nav-link active">My Profile</a>
      <a href="${pageContext.request.contextPath}/LogoutServlet" class="btn btn-logout">Logout</a> 
    </nav>
    <button class="menu-toggle">☰</button>
  </header>

  <main class="dashboard-main-content">
    <aside class="sidebar">
      <h3 class="role-title">Welcome, ${sessionScope.user.name}!</h3>
      <nav class="role-nav">
        <a href="${pageContext.request.contextPath}/MenteeServlet?action=dashboard">🏠 Dashboard</a>
                      <a href="${pageContext.request.contextPath}/MenteeServlet?action=notes">📝 Notes</a>
        <a href="${pageContext.request.contextPath}/MenteeServlet?action=meetings">📷 Join Meet</a>
        <a href="${pageContext.request.contextPath}/MenteeServlet?action=find_mentor">👥 Find Mentor</a>
        <a href="${pageContext.request.contextPath}/MenteeServlet?action=inbox">📩 My Inbox</a>
      </nav>
    </aside>
    
    <section class="content-area">
      <h2 id="page-title">My Profile</h2>
      
      <c:if test="${not empty param.msg}">
          <div style="padding: 15px; background: #d4edda; color: #155724; border-radius: 5px; margin-bottom: 20px;">
              ✅ ${param.msg}
          </div>
      </c:if>
      
      <div class="profile-container">
        <div class="profile-card">
            <div class="profile-image-container">
              <img src="https://ui-avatars.com/api/?name=${sessionScope.user.name}&background=0d6efd&color=fff&size=150" alt="Profile" class="profile-image">
            </div>
          
          <form id="editProfileForm" class="profile-form" action="${pageContext.request.contextPath}/MenteeServlet" method="POST">
            <input type="hidden" name="action" value="update_profile">

            <div class="form-section">
              <h3 class="form-section-title">Personal Information</h3>
              
              <div class="form-grid">
                <div class="form-group">
                  <label for="fullName" class="form-label">Full Name *</label>
                  <input type="text" id="fullName" name="fullName" class="form-input" value="${sessionScope.user.name}" required>
                </div>
              
                <div class="form-group">
                  <label for="email" class="form-label">Email Address *</label>
                  <input type="email" id="email" name="email" class="form-input" value="${sessionScope.user.email}" readonly style="background-color: #f0f0f0; cursor: not-allowed;">
                </div>
              
                <div class="form-group">
                  <label for="phone" class="form-label">Phone Number</label>
                  <input type="tel" id="phone" name="phone" class="form-input" value="${sessionScope.user.noPhone}">
                </div>
              </div>
            </div>

            <div class="form-section">
                <h3 class="form-section-title">Academic Details</h3>
                <div class="form-grid">
                    <div class="form-group">
                        <label for="studentId" class="form-label">Student ID (Read Only)</label>
                        <input type="text" id="studentId" class="form-input" value="${sessionScope.user.studentId}" disabled style="background-color: #f0f0f0;">
                    </div>

                    <div class="form-group">
                        <label for="program" class="form-label">Program / Department</label>
                        <select id="program" name="program" class="form-input" style="height: 45px; background: white; border: 1px solid #ddd; border-radius: 5px;">
                            <option value="" disabled>Select your program...</option>
                            
                            <c:forEach var="dept" items="${departmentList}">
                                <option value="${dept}" ${sessionScope.user.program == dept ? 'selected' : ''}>
                                    ${dept}
                                </option>
                            </c:forEach>
                            
                            <c:if test="${empty sessionScope.user.program}">
                                <option value="" selected disabled>Please select a program</option>
                            </c:if>
                        </select>
                    </div>
                </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Save Changes</button>
            </div>
          </form>
        </div>
      </div>

    </section>
  </main>

</body>
</html>