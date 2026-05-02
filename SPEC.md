# OmniPath.edu.in - Complete Specification

## 1. Core Features

### 1.1 Student Onboarding
- Enter class/subject name (e.g., B.Sc Physics, B.Sc Computer Science)
- Select board/university (e.g., Kalyani University, WBUHS, etc.)
- Store student profile with login (localStorage for MVP)

### 1.2 Content per Subject
- **Syllabus Topics**: All topics from the subject curriculum
- **Previous Year Questions**: Important questions by topic
- **YouTube Videos**: Best videos in both Hindi & English for each topic

### 1.3 Video Player
- YouTube videos embedded and play directly on site
- Show important practice questions below each video

### 1.4 Roadmap System
- Career goals (e.g., Cybersecurity Expert, Data Scientist, etc.)
- Full roadmaps with sequential topics
- Each topic links to relevant YouTube videos

### 1.5 Progress Tracking
- Save all watched videos
- Track completed topics
- Resume from where left off

### 1.6 Q&A Section
- Ask questions about study problems
- Get answered bycommunity or AI

---

## 2. Page Structure

### Landing Page
- Hero: "Your path from Syllabus to Success"
- University/Board input
- Subject selection
- Career goal selection (for roadmaps)

### Dashboard (After Login)
- Continue where left off
- Subject quick access
- Progress overview
- Q&A section access

### Video Page
- Embedded YouTube player
- Topic description
- Practice questions panel
- Related videos (Hindi/English)

### Roadmap Page
- Goal visualization
- Topic sequence
- Video playlist per topic
- Progress indicators

---

## 3. Data Structure (MVP JSON)

```json
{
  "subjects": {
    "BSc_Physics": {
      "university": "Kalyani University",
      "topics": [
        {
          "name": "Mechanics",
          "videos": {
            "hindi": "YouTube_Link",
            "english": "YouTube_Link"
          },
          "questions": ["Question 1", "Question 2"]
        }
      ]
    }
  },
  "roadmaps": {
    "Cybersecurity_Expert": {
      "steps": [
        {"topic": "Networking Basics", "videos": [...]},
        {"topic": "Linux", "videos": [...]},
        {"topic": "Python for Security", "videos": [...]}
      ]
    }
  }
}
```

---

## 4. Tech Stack (MVP)

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla)
- **Storage**: localStorage (browser)
- **Videos**: YouTube Embed API
- **Style**: Apple-inspired minimal design

---

## 5. Features Priority

### Phase 1 (MVP)
- [x] Landing page with university input
- [x] Subject selection UI
- [x] Sample roadmap display
- [x] Video embedding

### Phase 2
- [ ] User login/authentication
- [ ] Progress saving
- [ ] Q&A section
- [ ] Previous year questions

### Phase 3
- [ ] Full subject database
- [ ] Admin panel
- [ ] Community answers
