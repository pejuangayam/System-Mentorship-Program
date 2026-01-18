package dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import model.Mentorship;
import model.User;
import model.Meeting;
import model.Announcement;
import model.Note; // <--- Ensure Note is imported
import utils.DBConnection;

public class MenteeDAO {

    // ================= 1. GLOBAL & DASHBOARD STATS ================= //
    
    public int getInboxCount(int menteeId) {
        int count = 0;
        String sql = "SELECT COUNT(*) FROM ANNOUNCEMENTS WHERE LOWER(TRIM(AUDIENCE)) = 'all' OR TRIM(AUDIENCE) = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, String.valueOf(menteeId).trim());
            try (ResultSet rs = ps.executeQuery()) {
                if (rs.next()) count = rs.getInt(1);
            }
        } catch (Exception e) { e.printStackTrace(); }
        return count;
    }

    public int getPendingRequestsCount(int menteeId) {
        int count = 0;
        String sql = "SELECT COUNT(*) FROM MENTORSHIP WHERE MENTEEID = ? AND STATUS = 'Pending'";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, menteeId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) count = rs.getInt(1);
        } catch (Exception e) { e.printStackTrace(); }
        return count;
    }

    public int getUpcomingMeetingsCount(int menteeId) {
        int count = 0;
        String sql = "SELECT COUNT(*) FROM MEETINGS WHERE MENTEEID = ? AND STATUS = 'Scheduled'";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, menteeId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) count = rs.getInt(1);
        } catch (Exception e) { e.printStackTrace(); }
        return count;
    }

    // ================= 2. MENTOR MANAGEMENT ================= //
    
    public List<Mentorship> getMyMentors(int menteeId) {
        List<Mentorship> list = new ArrayList<>();
        String sql = "SELECT m.MENTORID, m.NAME, m.DEPARTMENT, ms.STATUS " +
                     "FROM MENTOR m " +
                     "JOIN MENTORSHIP ms ON m.MENTORID = ms.MENTORID " +
                     "WHERE ms.MENTEEID = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, menteeId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Mentorship ms = new Mentorship();
                ms.setMentorID(rs.getInt("MENTORID"));
                ms.setMentorName(rs.getString("NAME"));
                ms.setMenteeProgram(rs.getString("DEPARTMENT")); 
                ms.setStatus(rs.getString("STATUS"));
                list.add(ms);
            }
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    public List<User> getRecommendedMentors(String program, int menteeId) {
        List<User> list = new ArrayList<>();
        String sql = "SELECT MENTORID, NAME, DEPARTMENT, BIO, YEARSEXPERIENCE FROM MENTOR " +
                     "WHERE DEPARTMENT = ? " +
                     "AND MENTORID NOT IN (SELECT MENTORID FROM MENTORSHIP WHERE MENTEEID = ?) " +
                     "FETCH FIRST 4 ROWS ONLY"; 
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, program); 
            ps.setInt(2, menteeId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                User m = new User();
                m.setId(rs.getInt("MENTORID"));
                m.setName(rs.getString("NAME"));
                m.setDepartment(rs.getString("DEPARTMENT"));
                m.setBio(rs.getString("BIO"));
                m.setYearsExperience(rs.getInt("YEARSEXPERIENCE"));
                list.add(m);
            }
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    // ================= 3. FIND MENTOR & REQUESTS ================= //
    
    public List<Mentorship> getMyRequests(int menteeId) {
        List<Mentorship> list = new ArrayList<>();
        String sql = "SELECT ms.MENTORSHIPID, m.NAME, ms.STATUS FROM MENTORSHIP ms " +
                     "JOIN MENTOR m ON ms.MENTORID = m.MENTORID " +
                     "WHERE ms.MENTEEID = ?";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, menteeId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Mentorship ms = new Mentorship();
                ms.setMentorshipID(rs.getInt("MENTORSHIPID"));
                ms.setMentorName(rs.getString("NAME"));
                ms.setStatus(rs.getString("STATUS"));
                list.add(ms);
            }
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    public List<User> getAllMentors() {
        List<User> list = new ArrayList<>();
        String sql = "SELECT * FROM MENTOR";
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {
            while (rs.next()) {
                User u = new User();
                u.setId(rs.getInt("MENTORID"));
                u.setName(rs.getString("NAME"));
                u.setEmail(rs.getString("EMAIL"));
                u.setDepartment(rs.getString("DEPARTMENT"));
                u.setQualification(rs.getString("QUALIFICATION"));
                u.setBio(rs.getString("BIO"));
                u.setYearsExperience(rs.getInt("YEARSEXPERIENCE"));
                list.add(u);
            }
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    public boolean requestExists(int menteeId, int mentorId) {
        String sql = "SELECT 1 FROM MENTORSHIP WHERE MENTEEID=? AND MENTORID=?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, menteeId);
            ps.setInt(2, mentorId);
            ResultSet rs = ps.executeQuery();
            return rs.next();
        } catch (Exception e) { e.printStackTrace(); return false; }
    }

    public void sendRequest(int menteeId, int mentorId) {
        String sql = "INSERT INTO MENTORSHIP (MENTEEID, MENTORID, STATUS, MESSAGE) VALUES (?, ?, 'Pending', ?)";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, menteeId);
            ps.setInt(2, mentorId);
            ps.setString(3, "I would like to connect.");
            ps.executeUpdate();
        } catch (Exception e) { e.printStackTrace(); }
    }

    // ================= 4. MEETINGS ================= //
    
    public List<Meeting> getMyMeetings(int menteeId) {
        List<Meeting> list = new ArrayList<>();
        String sql = "SELECT mt.*, m.NAME AS MENTOR_NAME " +
                     "FROM MEETINGS mt " +
                     "JOIN MENTOR m ON mt.MENTORID = m.MENTORID " +
                     "WHERE mt.MENTEEID = ? " +
                     "ORDER BY mt.MEETING_DATE ASC";
        
        long millis = System.currentTimeMillis();
        Date today = new Date(millis);

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, menteeId);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Meeting m = new Meeting();
                m.setMeetingId(rs.getInt("MEETINGID"));
                m.setTitle(rs.getString("TITLE"));
                m.setMeetingDate(rs.getDate("MEETING_DATE"));
                m.setMeetingTime(rs.getString("MEETING_TIME"));
                m.setLink(rs.getString("LINK"));
                m.setMenteeName(rs.getString("MENTOR_NAME"));

                String dbStatus = rs.getString("STATUS");
                if (m.getMeetingDate().compareTo(today) < 0 && "Scheduled".equalsIgnoreCase(dbStatus)) {
                    m.setStatus("Completed");
                } else {
                    m.setStatus(dbStatus);
                }
                list.add(m);
            }
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    // ================= 5. INBOX ================= //
    
    public List<Announcement> getInbox(int menteeId) {
        List<Announcement> list = new ArrayList<>();
        String sql = "SELECT a.*, m.NAME AS MENTOR_NAME FROM ANNOUNCEMENTS a " +
                     "JOIN MENTOR m ON a.MENTORID = m.MENTORID " +
                     "WHERE LOWER(TRIM(a.AUDIENCE)) = 'all' OR TRIM(a.AUDIENCE) = ? " +
                     "ORDER BY a.POSTED_DATE DESC";
        
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, String.valueOf(menteeId).trim());
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Announcement a = new Announcement();
                a.setAnnouncementID(rs.getInt("ANNOUNCEMENTID"));
                a.setTitle(rs.getString("TITLE"));
                a.setContent(rs.getString("CONTENT"));
                a.setPriority(rs.getString("PRIORITY"));
                a.setPostedDate(rs.getTimestamp("POSTED_DATE"));
                a.setAudienceName(rs.getString("MENTOR_NAME")); 
                list.add(a);
            }
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    // ================= 6. PROFILE ================= //
    
    public void updateProfile(User u) {
        String sql = "UPDATE MENTEE SET NAME=?, EMAIL=?, NOPHONE=?, PROGRAM=? WHERE MENTEEID=?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setString(1, u.getName());
            ps.setString(2, u.getEmail());
            ps.setString(3, u.getNoPhone());
            ps.setString(4, u.getProgram());
            ps.setInt(5, u.getId());
            ps.executeUpdate();
        } catch (Exception e) { e.printStackTrace(); }
    }

    public List<String> getAllDepartments() {
        List<String> list = new ArrayList<>();
        try (Connection conn = DBConnection.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery("SELECT * FROM DEPARTMENT ORDER BY DEPT_NAME")) {
            while (rs.next()) {
                list.add(rs.getString("DEPT_NAME"));
            }
        } catch (Exception e) { e.printStackTrace(); }
        return list;
    }

    // ================= 7. NOTES & DOWNLOADS ================= //
    
    // UPDATED: Now filters by AUDIENCE to ensure privacy
    public List<Note> getMyNotes(int menteeId) {
        List<Note> list = new ArrayList<>();
        
        // SQL Logic:
        // 1. Join Notes with Mentorship (Must be connected to the uploader)
        // 2. Check Mentorship Status is 'Active'
        // 3. Check Audience: Is it 'all' OR is it specifically for this Mentee ID?
        String sql = "SELECT n.* FROM NOTES n " +
                     "JOIN MENTORSHIP ms ON n.MENTOR_ID = ms.MENTORID " +
                     "WHERE ms.MENTEEID = ? AND ms.STATUS = 'Active' " +
                     "AND (LOWER(TRIM(n.AUDIENCE)) = 'all' OR TRIM(n.AUDIENCE) = ?) " +
                     "ORDER BY n.UPLOAD_DATE DESC";

        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            
            ps.setInt(1, menteeId);
            ps.setString(2, String.valueOf(menteeId)); // Check specific ID match
            
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Note n = new Note();
                n.setId(rs.getInt("NOTE_ID"));
                n.setName(rs.getString("TITLE"));
                n.setType(rs.getString("TYPE"));
                n.setCreatedBy(rs.getString("CREATED_BY"));
                n.setDateUploaded(rs.getTimestamp("UPLOAD_DATE"));
                n.setFilePath(rs.getString("FILE_PATH"));
                n.setFilesCount(0); 
                list.add(n);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return list;
    }

    // NEW: Get a single note details (used for finding the filename before download)
    public Note getNoteById(int noteId) {
        Note n = null;
        String sql = "SELECT * FROM NOTES WHERE NOTE_ID = ?";
        try (Connection conn = DBConnection.getConnection();
             PreparedStatement ps = conn.prepareStatement(sql)) {
            ps.setInt(1, noteId);
            ResultSet rs = ps.executeQuery();
            if (rs.next()) {
                n = new Note();
                n.setId(rs.getInt("NOTE_ID"));
                n.setName(rs.getString("TITLE"));
                n.setFilePath(rs.getString("FILE_PATH"));
                // We only really need file path for download, but you can map others if needed
            }
        } catch (Exception e) { e.printStackTrace(); }
        return n;
    }
}