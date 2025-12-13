// Mail data for modal display
const mailData = {
  1: {
    subject: "Advanced JavaScript Class Rescheduled",
    sender: "Dr. Sarah Johnson",
    role: "Your Mentor",
    time: "Today, 10:30 AM",
    message: `Hi there!

I hope this message finds you well. I wanted to inform you about an important schedule change for our upcoming class.

Our class on "Advanced JavaScript Patterns" that was originally scheduled for Friday at 3 PM has been moved to Thursday at 2 PM due to a scheduling conflict with the department meeting.

I apologize for any inconvenience this may cause. Please let me know if this new time works for you, or if you need any adjustments.

Looking forward to our session!

Best regards,
Dr. Sarah Johnson`,
    hasMeeting: true,
    meetingDate: "Thursday, November 16, 2025",
    meetingTime: "2:00 PM - 3:30 PM",
    meetingPlatform: "Google Meet",
    hasAttachments: false
  },
  2: {
    subject: "Data Analytics Workshop - Materials Attached",
    sender: "Prof. Michael Chen",
    role: "Career Mentor",
    time: "Yesterday, 2:15 PM",
    message: `Hello!

As discussed in our last meeting, I'm sending you the preparation materials for our upcoming Data Analytics workshop.

Please review chapters 1-3 of the attached materials before our session. These chapters cover the fundamental concepts we'll be building upon during the workshop.

Additionally, I've included a sample dataset (Dataset_Example.xlsx) that we'll be working with. Please download it and try to familiarize yourself with the structure.

If you have any questions about the materials, feel free to reach out anytime.

Best,
Prof. Michael Chen`,
    hasMeeting: true,
    meetingDate: "Monday, November 20, 2025",
    meetingTime: "4:00 PM - 5:30 PM",
    meetingPlatform: "Zoom",
    hasAttachments: true,
    attachments: [
      { name: "Workshop_Materials.pdf", type: "pdf" },
      { name: "Dataset_Example.xlsx", type: "excel" }
    ]
  },
  3: {
    subject: "Weekly Code Review Session Reminder",
    sender: "David Wilson",
    role: "Programming Mentor",
    time: "Nov 12, 9:45 AM",
    message: `Hi!

Just a friendly reminder about our weekly code review session scheduled for tomorrow.

Please make sure to:
- Update your project repository with this week's work
- Commit and push all changes before our meeting
- Prepare any questions you might have about your implementation
- Review the feedback from last week's session

I'm excited to see your progress!

Looking forward to our session.

David Wilson`,
    hasMeeting: true,
    meetingDate: "Tuesday, November 14, 2025",
    meetingTime: "11:00 AM - 12:00 PM",
    meetingPlatform: "VS Code Live Share",
    hasAttachments: false
  },
  4: {
    subject: "Assignment Feedback & Next Class Agenda",
    sender: "Dr. Sarah Johnson",
    role: "Your Mentor",
    time: "Nov 10, 4:20 PM",
    message: `Great work on the last assignment!

I've thoroughly reviewed your code and I'm impressed with your progress. You've shown excellent understanding of the concepts we covered.

I've left detailed comments in the attached feedback document. Please review them carefully as they contain important suggestions for improvement.

For our next class, we'll be focusing on error handling best practices. This is a crucial topic that will help you write more robust and maintainable code.

Please come prepared with any questions you might have about the feedback or error handling in general.

Keep up the excellent work!

Best regards,
Dr. Sarah Johnson`,
    hasMeeting: true,
    meetingDate: "Friday, November 17, 2025",
    meetingTime: "1:00 PM - 2:30 PM",
    meetingPlatform: "Microsoft Teams",
    hasAttachments: true,
    attachments: [
      { name: "Assignment_Feedback.pdf", type: "pdf" }
    ]
  },
  5: {
    subject: "Special Session: Industry Trends Analysis",
    sender: "Prof. Michael Chen",
    role: "Career Mentor",
    time: "Nov 8, 11:10 AM",
    message: `Hello everyone!

I'm excited to announce a special extended session on current industry trends in data science.

This session will feature a guest speaker from TechCorp who will share insights on:
- Latest developments in AI/ML
- Industry best practices
- Career opportunities in data science
- Real-world case studies

The session will be available both in-person and via live stream, so everyone can participate regardless of location.

This is a great opportunity to learn from industry professionals and expand your network. Don't miss it!

Registration is not required, but please let me know if you plan to attend in person so we can arrange seating.

Looking forward to seeing you there!

Prof. Michael Chen`,
    hasMeeting: true,
    meetingDate: "Wednesday, November 22, 2025",
    meetingTime: "3:00 PM - 5:00 PM",
    meetingPlatform: "In-Person + Live Stream",
    hasAttachments: false
  }
};

// Modal functionality
const modal = document.getElementById('mailModal');
const closeModal = document.getElementById('closeModal');
const modalOverlay = document.querySelector('.modal-overlay');

// Open modal when clicking "View Details" button
document.querySelectorAll('.btn-view').forEach(button => {
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    const mailItem = this.closest('.mail-item');
    const mailId = mailItem.getAttribute('data-id');
    openMailModal(mailId);
  });
});

// Open modal when clicking the mail item itself
document.querySelectorAll('.mail-item').forEach(item => {
  item.addEventListener('click', function(e) {
    // Don't open modal if clicking on action buttons
    if (e.target.closest('.mail-actions')) {
      return;
    }
    const mailId = this.getAttribute('data-id');
    openMailModal(mailId);
  });
});

function openMailModal(mailId) {
  const data = mailData[mailId];
  if (!data) return;

  // Populate modal with data
  document.getElementById('modalSubject').textContent = data.subject;
  document.getElementById('modalSender').textContent = `${data.sender} (${data.role})`;
  document.getElementById('modalTime').textContent = data.time;
  document.getElementById('modalFullMessage').textContent = data.message;

  // Show/hide meeting info
  const meetingInfo = document.getElementById('meetingInfo');
  if (data.hasMeeting) {
    meetingInfo.style.display = 'block';
    document.getElementById('meetingDate').textContent = data.meetingDate;
    document.getElementById('meetingTime').textContent = data.meetingTime;
    document.getElementById('meetingPlatform').textContent = data.meetingPlatform;
  } else {
    meetingInfo.style.display = 'none';
  }

  // Show/hide attachments
  const attachmentsBox = document.getElementById('attachmentsBox');
  if (data.hasAttachments && data.attachments) {
    attachmentsBox.style.display = 'block';
    const attachmentsList = document.getElementById('attachmentsList');
    attachmentsList.innerHTML = '';
    
    data.attachments.forEach(attachment => {
      const iconClass = attachment.type === 'pdf' ? 'fa-file-pdf' : 'fa-file-excel';
      const attachmentItem = document.createElement('div');
      attachmentItem.className = 'attachment-item';
      attachmentItem.innerHTML = `
        <i class="fas ${iconClass}"></i>
        <span>${attachment.name}</span>
      `;
      attachmentsList.appendChild(attachmentItem);
    });
  } else {
    attachmentsBox.style.display = 'none';
  }

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMailModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}

// Close modal events
closeModal.addEventListener('click', closeMailModal);
modalOverlay.addEventListener('click', closeMailModal);

// Close modal on Escape key
document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape' && modal.classList.contains('active')) {
    closeMailModal();
  }
});

// Mark as read/unread functionality
document.querySelectorAll('.btn-read').forEach(button => {
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    const messageItem = this.closest('.mail-item');
    const icon = this.querySelector('i');
    
    messageItem.classList.toggle('unread');
    
    if (icon.classList.contains('fa-envelope-open-text')) {
      icon.classList.replace('fa-envelope-open-text', 'fa-envelope');
      this.title = 'Mark as read';
    } else {
      icon.classList.replace('fa-envelope', 'fa-envelope-open-text');
      this.title = 'Mark as unread';
    }
    
    updateUnreadCount();
  });
});

// Star/Important functionality
document.querySelectorAll('.btn-icon').forEach(button => {
  button.addEventListener('click', function(e) {
    e.stopPropagation();
    const icon = this.querySelector('.fa-star');
    
    if (icon) {
      const messageItem = this.closest('.mail-item');
      
      if (icon.classList.contains('far')) {
        icon.classList.replace('far', 'fas');
        messageItem.classList.add('important');
        this.title = 'Remove importance';
      } else {
        icon.classList.replace('fas', 'far');
        messageItem.classList.remove('important');
        this.title = 'Mark as important';
      }
    }
  });
});

// Mark all as read functionality
document.querySelector('.btn-mark-read').addEventListener('click', function() {
  document.querySelectorAll('.message-item, .mail-item').forEach(item => {
    item.classList.remove('unread');
  });
  
  document.querySelectorAll('.fa-envelope').forEach(icon => {
    if (icon.parentElement.classList.contains('btn-read')) {
      icon.classList.replace('fa-envelope', 'fa-envelope-open-text');
      icon.parentElement.title = 'Mark as unread';
    }
  });
  
  updateUnreadCount();
});

// Filter buttons
document.querySelectorAll('.btn-filter').forEach(button => {
  button.addEventListener('click', function() {
    // Remove active class from all buttons
    document.querySelectorAll('.btn-filter').forEach(btn => {
      btn.classList.remove('active-filter');
    });
    
    // Add active class to clicked button
    this.classList.add('active-filter');
    
    // Get filter type
    const filter = this.getAttribute('data-filter');
    
    // Filter messages
    document.querySelectorAll('.mail-item').forEach(item => {
      if (filter === 'all') {
        item.style.display = 'flex';
      } else if (filter === 'unread') {
        item.style.display = item.classList.contains('unread') ? 'flex' : 'none';
      } else if (filter === 'important') {
        item.style.display = item.classList.contains('important') ? 'flex' : 'none';
      }
    });
  });
});

// Search functionality
document.getElementById('searchInput').addEventListener('input', function(e) {
  const searchTerm = e.target.value.toLowerCase();
  
  document.querySelectorAll('.mail-item').forEach(item => {
    const subject = item.querySelector('.mail-subject').textContent.toLowerCase();
    const sender = item.querySelector('.mail-sender').textContent.toLowerCase();
    const preview = item.querySelector('.mail-preview').textContent.toLowerCase();
    
    const matches = subject.includes(searchTerm) || 
                    sender.includes(searchTerm) || 
                    preview.includes(searchTerm);
    
    item.style.display = matches ? 'flex' : 'none';
  });
});

// Pagination
document.querySelectorAll('.page-number').forEach(page => {
  page.addEventListener('click', function() {
    if (this.textContent === '...') return;
    
    document.querySelectorAll('.page-number').forEach(p => {
      p.classList.remove('active');
    });
    
    this.classList.add('active');
  });
});

// Update unread count
function updateUnreadCount() {
  const unreadCount = document.querySelectorAll('.mail-item.unread').length;
  const countElement = document.getElementById('unreadCount');
  if (countElement) {
    countElement.textContent = unreadCount;
  }
}

// Mobile menu toggle
const menuToggle = document.querySelector('.menu-toggle');
if (menuToggle) {
  menuToggle.addEventListener('click', function() {
    const userNav = document.querySelector('.user-nav');
    const sidebar = document.querySelector('.sidebar');
    
    if (userNav) userNav.classList.toggle('mobile-visible');
    if (sidebar) sidebar.classList.toggle('mobile-visible');
  });
}

// Modal action buttons
document.querySelector('.btn-reply').addEventListener('click', function() {
  alert('Reply functionality would be implemented here');
});

document.querySelector('.btn-forward').addEventListener('click', function() {
  alert('Forward functionality would be implemented here');
});

document.querySelector('.btn-delete').addEventListener('click', function() {
  if (confirm('Are you sure you want to delete this message?')) {
    closeMailModal();
    alert('Message deleted successfully');
  }
});

// Initialize unread count on page load
updateUnreadCount();