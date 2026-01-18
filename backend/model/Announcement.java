package model;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;

public class Announcement {

    private int announcementID;
    private int mentorID;
    private String title;
    private String content;
    private String priority;
    private String audience;     // Stores "all" or "105"
    private String audienceName; // NEW: Stores "Jane Doe" or "All My Mentees"
    private Timestamp postedDate;

    public Announcement() {}

    // --- Standard Getters ---
    public int getAnnouncementID() { return announcementID; }
    public int getMentorID() { return mentorID; }
    public String getTitle() { return title; }
    public String getContent() { return content; }
    public String getPriority() { return priority; }
    public String getAudience() { return audience; }
    public Timestamp getPostedDate() { return postedDate; }
    
    // NEW GETTER
    public String getAudienceName() { return audienceName; }

    // --- Setters ---
    public void setAnnouncementID(int announcementID) { this.announcementID = announcementID; }
    public void setMentorID(int mentorID) { this.mentorID = mentorID; }
    public void setTitle(String title) { this.title = title; }
    public void setContent(String content) { this.content = content; }
    public void setPriority(String priority) { this.priority = priority; }
    public void setAudience(String audience) { this.audience = audience; }
    public void setPostedDate(Timestamp postedDate) { this.postedDate = postedDate; }
    
    // NEW SETTER
    public void setAudienceName(String audienceName) { this.audienceName = audienceName; }

    // --- HELPER METHODS ---
    
    public String getFormattedDate() {
        if (postedDate == null) return "";
        SimpleDateFormat sdf = new SimpleDateFormat("MMM dd, yyyy • h:mm a");
        return sdf.format(postedDate);
    }

    // returns the real name if we set it
    public String getAudienceDisplay() {
        // If we have a specific name set (like "Jane Doe"), return that
        if (audienceName != null && !audienceName.isEmpty()) {
            return audienceName;
        }
        // Fallback checks
        if ("all".equalsIgnoreCase(audience)) {
            return "All My Mentees";
        }
        return "Specific Mentee (ID: " + audience + ")";
    }
}