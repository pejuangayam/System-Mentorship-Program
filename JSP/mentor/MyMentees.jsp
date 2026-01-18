<%-- 
    Document   : MyMentees
    Description: Lists all active mentees with detailed info
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Mentees | Mentorship Platform</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/MyMentees.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashboardMentor.css">
</head>
<body>

  <header class="main-header">
    <div class="logo-area"><h1>MentorshipApp</h1></div>
    <nav class="user-nav">
      <a href="${pageContext.request.contextPath}/MentorServlet?action=profile" class="nav-link">My Profile</a>
                <a href="${pageContext.request.contextPath}/LogoutServlet" class="btn btn-logout">Logout</a> 
    </nav>
    <button class="menu-toggle">☰</button>
  </header>

  <main class="dashboard-main-content">

    <aside class="sidebar">
      <div class="sidebar-header">
        <h3 class="role-title">Welcome, ${sessionScope.user.name}</h3>
      </div>
      
      <nav class="role-nav">
        <a href="${pageContext.request.contextPath}/MentorServlet?action=dashboard" class="nav-item">
            🏠 Dashboard
        </a>
        <a href="${pageContext.request.contextPath}/MentorServlet?action=my_mentees" class="active-link">
            👥 My Mentees
        </a>
        <a href="${pageContext.request.contextPath}/MentorServlet?action=requests" class="nav-item">
            📩 Pending Requests
        </a>
        <a href="${pageContext.request.contextPath}/MentorServlet?action=schedule" class="nav-item">
            📅 Schedule Meeting
        </a>
        <a href="${pageContext.request.contextPath}/MentorServlet?action=announcements" class="nav-item">📢 Announcements</a>
        <a href="${pageContext.request.contextPath}/MentorServlet?action=notes" class="nav-item">📝 Notes & Files</a>

      </nav>
    </aside>

    <section class="content-area">
      <h2 id="page-title">👥 My Mentees</h2>

      <div class="summary-cards">
        <div class="card">
          <h3>Total Mentees</h3>
          <p class="count">${myMenteesList.size()}</p>
        </div>
        <div class="card">
          <h3>Active Pairs</h3>
          <p class="count">${myMenteesList.size()}</p>
        </div>
      </div>

      <div class="widget-section">
        <h3 class="section-header">👥 All Active Mentees</h3>
        
        <c:forEach var="m" items="${myMenteesList}">
            <div class="mentee-card">
              <div class="mentee-header">
                <div class="mentee-avatar">
                    <img src="https://ui-avatars.com/api/?name=${m.name}&background=random&color=fff&size=50" style="border-radius: 50%;">
                </div>
                
                <div class="mentee-basic-info">
                  <h4>${m.name}</h4>
                  <p class="mentee-details">${m.program}</p>
                  <p class="mentee-status"><span class="status-badge active">Active</span></p>
                </div>
              </div>
              
              <div class="mentee-body">
                <div class="info-row">
                  <span class="info-label">📧 Email:</span>
                  <span>${m.email}</span>
                </div>

                <div class="info-row">
                  <span class="info-label">📞 Phone:</span>
                  <span>${not empty m.noPhone ? m.noPhone : "Not Available"}</span>
                </div>

                <div class="info-row">
                   <span class="info-label">🎓 Year:</span>
                   <span>${not empty m.currentYear ? "Year ".concat(m.currentYear) : "-"}</span>
                </div>

                <div class="info-row">
                   <span class="info-label">🆔 Student ID:</span>
                   <span style="font-family: monospace; background: #f0f0f0; padding: 2px 5px; border-radius: 3px;">
                       ${not empty m.studentId ? m.studentId : "N/A"}
                   </span>
                </div>
                
                <div class="info-row" style="margin-top: 15px;">
                   <a href="mailto:${m.email}" class="btn btn-small" style="background:#0d6efd; color:white; padding:8px; text-decoration:none; border-radius:4px; font-size: 0.9em; width:100%; text-align:center;">
                       Send Email
                   </a>
                </div>
              </div>
            </div>
        </c:forEach>

        <c:if test="${empty myMenteesList}">
            <div style="padding: 40px; text-align: center; color: #666; background: white; border-radius: 8px;">
                <p>You do not have any active mentees yet.</p>
                <p>Go to <a href="${pageContext.request.contextPath}/MentorServlet?action=requests">Pending Requests</a> to accept new students.</p>
            </div>
        </c:if>

      </div>
    </section>
  </main>
</body>
</html>