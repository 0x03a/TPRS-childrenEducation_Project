# Functional Requirements 

These requirements define the **specific capabilities and features** the platform must deliver to ensure it effectively meets the needs of learners, educators, and parents, while adhering to security, privacy, and accessibility standards.

---

## 1. User Registration and Profiles

- **Account Creation**:  
  Users must be able to create an account using a unique username and password, or via a **Single Sign-On (SSO)** method for convenience.  
  SSO should support popular identity providers (e.g., Google, Microsoft, Facebook), allowing users to log in with their existing accounts.

- **Profile Management**:  
  Users should be able to customize their profiles with details such as name, age, preferred learning language, and learning style preferences.

- **Progress Tracking**:  
  The platform must maintain a record of each learner’s completed lessons, quiz scores, vocabulary mastery, and engagement metrics.

---

## 2. User Roles and Access Control

The platform must support four types of logins with distinct access rights:

- **Author Login**:  
  Authors can create single stories or book series, submit content for review, edit their work, and manage their published stories.

- **Parent Login**:  
  Parents can browse and select stories, assign content to their children, and monitor their child's profile, test results, and progress.

- **Reviewer Login**:  
  Reviewers assess submitted stories and book series from authors, suggest edits or approve them for publication.

- **Admin Login**:  
  Administrators manage platform-wide content approval workflows, user management, system settings, and oversee security and compliance.

---

## 3. Quizzes and Stories (TPRS-Based)

- **Interactive Questioning (Circling Technique)**:  
  The platform must implement the *circling* method, where learners are repeatedly asked **Yes/No**, **Either/Or**, and **Wh-questions** related to the lesson content to reinforce comprehension.

- **Controlled Vocabulary (Staying in Bounds)**:  
  Lessons must introduce vocabulary gradually, ensuring new words are clearly defined and subsequent lessons use only previously introduced terms.

- **Adjustable Speech Speed**:  
  Learners should have control over narration playback speed (slow, normal, fast) to suit individual comprehension levels.

- **Comprehension Checks**:  
  After each lesson or story, the system should present short quizzes, true/false questions, or quick interactive indicators (e.g., thumbs up/down) to confirm understanding.

- **Pop-up Grammar Tips**:  
  When learners encounter complex grammatical structures, the system should display **brief, context-aware grammar tips** without disrupting lesson flow.

- **Personalization**:  
  Content should dynamically include learner-specific elements (e.g., their name, personal interests, culturally relevant references) to improve engagement.

- **Gamification**:  
  The system must incorporate badges, points, levels, and streak counters to reward consistency and achievements.

- **Parent or Teacher/Student Engagement Tracking**:  
  Parents or Teachers should have access to a detailed dashboard showing student progress, quiz results, activity history, and engagement statistics.

---

## 4. Offline Access

- **Content Download**:  
  Users must be able to download lessons (including audio, text, and images) for offline study.

- **Progress Synchronization**:  
  When offline, the system should store progress locally. Once the device reconnects to the internet, progress data should automatically sync with the central server without data loss.

---

## 5. Multilingual Support

- **Language Options**:  
  The interface and learning content must be available in multiple languages (e.g., Arabic, English, Spanish), with an easy toggle option.

- **Localized Content**:  
  Stories, examples, and cultural references should be adapted for relevance to different regions and dialects (e.g., Palestinian Arabic vs. Egyptian Arabic).

---

## 6. User Management

- **Parent/Teacher Dashboard**:  
  Provides insights into learner progress, lesson completion, quiz scores, and participation trends.  
  Allows educators and parents to set goals, send messages, and receive alerts when intervention is needed.

---

## 7. Data Security & COPPA Compliance

- **Parental Consent Management**:  
  Must provide tools for parents to review, approve, or revoke consent for their child’s data collection and processing.

- **Privacy Policy Transparency**:  
  Present an easy-to-read privacy policy detailing data collection, storage, usage, and user rights.

- **Data Protection**:  
  Implement strong encryption, secure authentication, and protection against unauthorized data access.

---

## 8. AI-Driven Learning Suggestions

- **AI Analysis**:  
  Use AI to review learner performance, recordings, and quiz results to generate targeted improvement suggestions.

- **Suggestions Include**:  
  - Recommendations for additional exercises in weak skill areas.  
  - Adjustments to lesson pacing and difficulty.  
  - Contextual vocabulary or grammar practice tips.

- **Parental Oversight**:  
  Parents can view AI-generated suggestions, approve them, or opt out of AI-assisted learning entirely.

---

## 9. Data Usage and AI Training

- **Anonymization**:  
  All AI training data must be stripped of personally identifiable information (PII) and aggregated to ensure privacy.

- **Restricted Use**:  
  AI insights are strictly for learning optimization and must not be shared with third parties.

- **Parental Control**:  
  Parents can disable AI-driven recommendations or limit the type of data processed by AI models.

---

## 10. AI Story Creation & Author Workflow

- **For Authors**:  
  Authors can create stories or book series themselves from scratch or by using AI tools. They can edit stories fully according to their vision.

- **Review Process**:  
  Once an author finishes a story, it goes to a team of reviewers who check it for quality, appropriateness, and correctness.

- **Publishing**:  
  After review approval, the story is published on the platform for all users to access and enjoy.

- **Video and Narration Options**:  
  Authors can create video versions of their stories. They can pick AI-generated voices for narration or record and use their own voices.

