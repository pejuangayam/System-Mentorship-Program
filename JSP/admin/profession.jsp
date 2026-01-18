<%-- 
    Document   : profession
    Updated for: Add Department & Add Profession (With View Departments)
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Manage Professions & Departments | Admin</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/dashboardAdmin.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/css/addProfession.css">
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
          <a href="${pageContext.request.contextPath}/AdminServlet?action=dashboard">
              <span class="nav-icon">🏠</span> Dashboard
          </a>
          <a href="${pageContext.request.contextPath}/AdminServlet?action=list_professions" class="active-link">
              <span class="nav-icon">🧰</span> Professions
          </a>
          <a href="${pageContext.request.contextPath}/admin/profileAdmin.jsp">
              <span class="nav-icon">👤</span> Profile
          </a>
      </nav>
    </aside>
    
    <section class="content-area">
      <h2 id="page-title">Manage Content</h2>
      
      <c:if test="${not empty param.msg}">
          <div style="padding: 10px; background: #d4edda; color: #155724; border-radius: 5px; margin-bottom: 20px;">
              ✅ ${param.msg}
          </div>
      </c:if>
      
      <div class="form-container">

        <div class="form-card">
          <h3 class="form-section-title">Create New Profession / Skill</h3>
          
          <form id="addProfessionForm" action="${pageContext.request.contextPath}/AdminServlet" method="POST">
            <input type="hidden" name="action" value="add_profession">
            
            <div class="form-group">
              <label for="professionName" class="form-label">Profession Name *</label>
              <input type="text" id="professionName" name="professionName" class="form-input" required>
            </div>
            
            <div class="form-group">
              <label for="professionDescription" class="form-label">Description *</label>
              <textarea id="professionDescription" name="professionDescription" class="form-textarea" rows="4" required></textarea>
            </div>
            
            <div class="form-group">
              <label for="professionCategory" class="form-label">Category (Genre) *</label>
              
              <select id="professionCategory" name="professionCategory" class="form-select" onchange="toggleCategoryInput()" required>
                <c:forEach var="cat" items="${categoryList}">
                     <option value="${cat}">${cat}</option>
                </c:forEach>
                <option value="Other" style="font-weight: bold; color: blue;">+ Add New Category...</option>
              </select>

              <div id="newCategoryInput" style="display: none; margin-top: 10px;">
                  <label class="form-label" style="font-size: 0.9em; color: #666;">Enter New Category Name:</label>
                  <input type="text" id="customCategory" name="customCategory" class="form-input" placeholder="e.g. Health Science">
              </div>
            </div>
            
            <div class="form-actions">
              <button type="submit" class="btn btn-primary">Add Profession</button>
            </div>
          </form>
        </div>
            
        <div class="form-card">
          <h3 class="form-section-title">Add New Department (Faculty)</h3>
          <p style="color: #666; font-size: 0.9em; margin-bottom: 15px;">
              These appear in the "Department" dropdown on the Registration page.
          </p>
          
          <form action="${pageContext.request.contextPath}/AdminServlet" method="POST" style="display: flex; gap: 15px; align-items: flex-end;">
            <input type="hidden" name="action" value="add_department">
            
            <div class="form-group" style="flex-grow: 1; margin-bottom: 0;">
              <label for="deptName" class="form-label">Department Name</label>
              <input type="text" id="deptName" name="deptName" class="form-input" placeholder="e.g. Faculty of Computing" required>
            </div>
            
            <div class="form-group" style="margin-bottom: 0;">
                <button type="submit" class="btn btn-primary">Add Department</button>
            </div>
          </form>
        </div>

        <div class="form-card">
            <h3 class="form-section-title">Existing Departments</h3>
            <div class="professions-grid">
                <c:forEach var="dept" items="${deptList}">
                    <div class="profession-card" style="text-align: center; display: flex; align-items: center; justify-content: center;">
                        <h4 class="profession-name" style="margin: 0;">${dept}</h4> 
                    </div>
                </c:forEach>
                <c:if test="${empty deptList}">
                    <p style="color: #666;">No departments found.</p>
                </c:if>
            </div>
        </div>
        
        <div class="form-card">
          <h3 class="form-section-title">Existing Professions</h3>
          <div class="professions-grid">
            <c:forEach var="p" items="${profList}">
                <div class="profession-card">
                  <div class="profession-header">
                    <h4 class="profession-name">${p[0]}</h4> 
                  </div>
                  <div class="profession-category">
                    <span class="category-tag technology">${p[1]}</span> 
                  </div>
                  <p class="profession-description">${p[2]}</p> 
                </div>
            </c:forEach>
            <c:if test="${empty profList}">
                <p>No professions added yet.</p>
            </c:if>
          </div>
        </div>

      </div>
    </section>
  </main>

  <script>
    function toggleCategoryInput() {
        var select = document.getElementById("professionCategory");
        var inputDiv = document.getElementById("newCategoryInput");
        var inputField = document.getElementById("customCategory");

        if (select.value === "Other") {
            inputDiv.style.display = "block";
            inputField.required = true; 
        } else {
            inputDiv.style.display = "none";
            inputField.required = false;
            inputField.value = ""; 
        }
    }
  </script>

</body>
</html>