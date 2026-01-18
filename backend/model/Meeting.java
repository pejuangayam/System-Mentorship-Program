
package model;

import java.sql.Date;

public class Meeting {
    private int meetingID;
    private int mentorID;
    private int menteeID;
    private String title;
    private Date meetingDate;
    private String meetingTime;
    private String link;
    private String status;
    
    // NEW: Field to hold the Mentee's name for display
    private String menteeName;
    
    // Blank constructor
    public Meeting(){}
    
    // --- GETTERS ---
    public int getMeetingID(){
        return meetingID;
    }
    
    // Note: Some code uses getId(), providing both to be safe
    public int getId() {
        return meetingID;
    }
    
    public int getMentorID(){
        return mentorID;
    }
    
    public int getMenteeID(){
        return menteeID;
    }
    
    public String getTitle(){
        return title;
    }
    
    public Date getMeetingDate(){
        return meetingDate;
    }
    
    public String getMeetingTime(){ // Fixed typo "getMeetingTIme"
        return meetingTime;
    }

    public String getLink(){
        return link;
    }

    public String getStatus(){
        return status;
    }
    
    public String getMenteeName(){
        return menteeName;
    }
    
    // --- SETTERS ---
    public void setMeetingId(int id){ // Fixed capitalization
        this.meetingID = id;
    }
    
    public void setId(int id) {
        this.meetingID = id;
    }
    
    public void setMentorID(int mentorID){
        this.mentorID = mentorID;
    }
    
    public void setMenteeID(int menteeID){
        this.menteeID = menteeID;
    }
    
    public void setMenteeName(String menteeName){
        this.menteeName = menteeName;
    }
    
    public void setTitle (String title){
        this.title = title;
    }
    
    public void setMeetingDate (Date meetingDate){
        this.meetingDate = meetingDate;
    }
    
    public void setMeetingTime (String meetingTime){
        this.meetingTime = meetingTime;
    }
    
    public void setLink (String link){
        this.link = link;
    }
    
    public void setStatus (String status){
        this.status = status;
    }
}