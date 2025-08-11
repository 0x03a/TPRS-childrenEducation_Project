// mermaid code
sequenceDiagram
    participant User
    participant Author
    participant Reviewer
    participant Admin
    participant AI_System
    participant Platform

    User->>Platform: Register / Login (SSO or manual)
    Platform-->>User: Confirm Registration/Login Success
    Platform->>User: Provide Profile Setup & Progress Tracking

    %% User Roles and Access
    Author->>AI_System: Input Sentence to Generate Story
    AI_System-->>Author: Provide Generated Story Draft
    Author->>Platform: Choose Visual Style & Character Images
    Platform-->>Author: Confirm Style & Images Set
    Author->>Platform: Edit Storyboard (Pages, Text, Images)
    Platform-->>Author: Confirm Storyboard Updated
    Author->>Platform: Preview & Export Story or Video
    Platform-->>Author: Provide Preview & Export Options
    Author->>Platform: Choose Narration Voice or Upload Own Voice
    Platform-->>Author: Confirm Narration Set

    Author->>Platform: Submit Story for Review
    Platform-->>Author: Confirm Submission Received

    Reviewer->>Platform: Access Submitted Story for Review
    alt Story Approved
        Platform-->>Reviewer: Confirm Approval Sent
        Platform-->>Author: Notify Story Approved
    else Story Rejected / Requires Changes
        Platform-->>Reviewer: Confirm Rejection Sent
        Platform-->>Author: Notify Story Rejected or Edits Required
    end

    Admin->>Platform: Manage Content Approval Workflow
    Platform-->>Admin: Display Workflow Status
    Admin->>Platform: Manage Users and System Settings
    Platform-->>Admin: Confirm Changes Applied

    User->>Platform: Browse and Select Stories
    Platform-->>User: Display Available Stories
    User->>Platform: Assign Stories to Child
    Platform-->>User: Confirm Assignment Saved
    User->>Platform: Monitor Child Progress & Tests
    Platform-->>User: Provide Progress Reports & Test Results

    alt Parent Provides Child Test Progress to AI
        User->>AI_System: Send Child Responses & Test Results
        AI_System-->>User: Generate Personalized Learning Suggestions
        User->>AI_System: Review AI Suggestions & Approve/Opt-Out
        AI_System-->>User: Confirm User Preference Updated
    else No Test Progress Provided
        AI_System-->>User: No Suggestions Generated (Waiting for Data)
    end

    %% Offline Access
    User->>Platform: Download Content for Offline Use
    Platform-->>User: Provide Downloadable Content
    User->>Platform: Sync Progress When Online
    Platform-->>User: Confirm Progress Synced


