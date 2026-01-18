package controller;

import dao.AdminDAO;
import model.User;
import java.io.IOException;
import java.util.List;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class AdminServlet extends HttpServlet {

    // --- GET REQUESTS ---
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String action = request.getParameter("action");
        if (action == null) action = "dashboard";

        try {
            switch (action) {
                case "dashboard":
                    loadDashboardData(request, response); 
                    break;
                case "deleteUser":
                    deleteUser(request, response); 
                    break;
                case "viewUser":
                    viewUserDetails(request, response); 
                    break;
                case "list_professions": 
                    loadProfessions(request, response); 
                    break;
                default:
                    loadDashboardData(request, response); 
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error: " + e.getMessage());
        }
    }

    // --- POST REQUESTS ---
    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        
        String action = request.getParameter("action");
        try {
            if ("add_profession".equals(action)) { 
                addProfession(request, response);
            } else if ("add_department".equals(action)) { 
                addDepartment(request, response);
            } else if ("update_profile".equals(action)) { 
                updateProfile(request, response);
            }
        } catch (Exception e) {
            e.printStackTrace();
            response.sendError(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "Error: " + e.getMessage());
        }
    }

    // --- 1. LOAD DASHBOARD ---
    private void loadDashboardData(HttpServletRequest request, HttpServletResponse response) throws Exception {
        AdminDAO adminDAO = new AdminDAO();
        
        int mentorCount = adminDAO.getCount("MENTOR");
        int menteeCount = adminDAO.getCount("MENTEE");
        List<User> userList = adminDAO.getAllUsersCombined();

        request.setAttribute("mentorCount", mentorCount);
        request.setAttribute("menteeCount", menteeCount);
        request.setAttribute("totalCount", mentorCount + menteeCount);
        request.setAttribute("allUsers", userList); 

        request.getRequestDispatcher("/admin/dashboardAdmin.jsp").forward(request, response);
    }

    // --- 2. ADD PROFESSION ---
    private void addProfession(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String name = request.getParameter("professionName");
        String desc = request.getParameter("professionDescription");
        String selectedCat = request.getParameter("professionCategory");
        String customCat = request.getParameter("customCategory");
        
        String finalCategory = selectedCat;
        if ("Other".equals(selectedCat) && customCat != null && !customCat.trim().isEmpty()) {
            finalCategory = customCat.trim();
        }

        AdminDAO adminDAO = new AdminDAO();
        adminDAO.addProfession(name, desc, finalCategory);
        
        response.sendRedirect("AdminServlet?action=list_professions"); 
    }

    // --- 2.1 ADD DEPARTMENT ---
    private void addDepartment(HttpServletRequest request, HttpServletResponse response) throws Exception {
        String deptName = request.getParameter("deptName");
        
        AdminDAO adminDAO = new AdminDAO();
        boolean success = adminDAO.addDepartment(deptName);
        
        String msg = success ? "Department Added" : "Department Already Exists";
        response.sendRedirect("AdminServlet?action=list_professions&msg=" + msg);
    }

    // --- 3. LOAD PROFESSIONS & DEPARTMENTS LIST (UPDATED) ---
    private void loadProfessions(HttpServletRequest request, HttpServletResponse response) throws Exception {
        AdminDAO adminDAO = new AdminDAO();
        
        // Fetch Professions
        List<String[]> profList = adminDAO.getAllProfessions();
        List<String> categoryList = adminDAO.getProfessionCategories();
        
        // Fetch Departments (NEW)
        List<String> deptList = adminDAO.getAllDepartments();
        
        request.setAttribute("profList", profList);
        request.setAttribute("categoryList", categoryList);
        request.setAttribute("deptList", deptList); // Pass to JSP
        
        request.getRequestDispatcher("/admin/profession.jsp").forward(request, response);
    }

    // --- 4. VIEW SPECIFIC USER ---
    private void viewUserDetails(HttpServletRequest request, HttpServletResponse response) throws Exception {
        int id = Integer.parseInt(request.getParameter("id"));
        String role = request.getParameter("role");
        
        AdminDAO adminDAO = new AdminDAO();
        User user = adminDAO.getUserById(id, role);

        String page = "Mentor".equalsIgnoreCase(role) ? "/admin/viewUser.jsp" : "/admin/viewUserMentee.jsp";

        if(user != null){
            request.setAttribute("viewUser", user);
        }
        
        request.getRequestDispatcher(page).forward(request, response);
    }
    
    // --- 5. DELETE USER ---
    private void deleteUser(HttpServletRequest request, HttpServletResponse response) throws Exception {
        int id = Integer.parseInt(request.getParameter("id"));
        String role = request.getParameter("role");
        
        AdminDAO adminDAO = new AdminDAO();
        adminDAO.deleteUser(id, role);
        
        response.sendRedirect("AdminServlet?action=dashboard");
    }

    // --- 6. UPDATE ADMIN PROFILE ---
    private void updateProfile(HttpServletRequest request, HttpServletResponse response) throws Exception {
        HttpSession session = request.getSession();
        User admin = (User) session.getAttribute("user");
        
        String name = request.getParameter("fullName");
        String email = request.getParameter("email");
        
        AdminDAO adminDAO = new AdminDAO();
        adminDAO.updateAdminProfile(admin.getId(), name, email);
        
        admin.setName(name);
        admin.setEmail(email);
        
        response.sendRedirect("admin/profileAdmin.jsp?msg=Updated");
    }
}